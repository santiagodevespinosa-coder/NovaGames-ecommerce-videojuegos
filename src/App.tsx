// src/App.tsx
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CatalogoJuegos } from './components/juegos/CatalogoJuegos';
import { BibliotecaJuegos, type JuegoBiblioteca } from './components/juegos/BibliotecaJuegos';
import { VistaDetalleJuego } from './components/juegos/VistaDetalleJuego';
import { PanelLogin } from './components/auth/PanelLogin';
import { PanelAdmin } from './components/admin/PanelAdmin';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { NovaJumpPalette } from './components/layout/NovaJumpPalette';
import { KeycardMintModal } from './components/juegos/KeycardMintModal';
import { getSfxEnabled, playClick, setSfxEnabled } from './utils/novaAudio';
import { juegosService } from './services/juegosService';
import { generosService } from './services/generosService';
import { authService } from './services/authService';
import { bibliotecaService } from './services/bibliotecaService';
import { ordenesService } from './services/ordenesService';
import { TOKEN_STORAGE_KEY } from './services/apiClient';
import type { BibliotecaItem, Genero, Juego, OrdenResponse, Usuario } from './types';

const FALLBACK_JUEGOS: Juego[] = [
  { id: 1, titulo: 'Cyberpunk 2077', descripcion: 'Un RPG de acción y aventura en mundo abierto ambientado en Night City.', precio: 59.99, stock: 15, categoriaId: 1, desarrolladorId: 1, imagenUrl: '/images/imagenes-juegos/imagen_cyberpunk_2077.webp' },
  { id: 2, titulo: 'Minecraft', descripcion: 'Explora mundos infinitos y construye de todo, desde la casa más simple hasta el castillo más grandioso.', precio: 29.99, stock: 30, categoriaId: 2, desarrolladorId: 2, imagenUrl: '/images/imagenes-juegos/imagen_minecraft.webp' },
  { id: 3, titulo: 'The Witcher 3: Wild Hunt', descripcion: 'Juego de rol de fantasía de mundo abierto basado en una historia y centrado en las opciones.', precio: 39.99, stock: 8, categoriaId: 1, desarrolladorId: 3, imagenUrl: '/images/imagenes-juegos/imagen_the_witcher_3_wild_hunt.webp' },
];

export function App() {
  const [terminoBusqueda, setTerminoBusqueda] = useState<string>('');

  // 🔐 Estados de Autenticación con persistencia en localStorage
  const [usuarioLogueado, setUsuarioLogueado] = useState<Usuario | null>(() => {
    return authService.getStoredUser();
  });
  const [mostrarModalLogin, setMostrarModalLogin] = useState<boolean>(false);
  const [modoAuthModal, setModoAuthModal] = useState<'login' | 'register'>('login');
  const [sidebarAbierto, setSidebarAbierto] = useState<boolean>(false);
  const [auraImageUrl, setAuraImageUrl] = useState<string | undefined>(undefined);
  const [paletteOpen, setPaletteOpen] = useState<boolean>(false);
  const [sfxEnabled, setSfxState] = useState<boolean>(() => getSfxEnabled());
  const [mintedGame, setMintedGame] = useState<Juego | null>(null);

  const handleToggleSfx = () => {
    setSfxState((prev) => {
      const next = !prev;
      setSfxEnabled(next);
      if (next) playClick();
      return next;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigate = useNavigate();

  const [juegos, setJuegos] = useState<Juego[]>(FALLBACK_JUEGOS);
  const [cargandoJuegos, setCargandoJuegos] = useState<boolean>(true);
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [avisoJuegos, setAvisoJuegos] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      juegosService.obtenerJuegos(),
      generosService.obtenerGeneros().catch(() => [] as Genero[]),
    ])
      .then(async ([data, listaGeneros]) => {
        if (cancelled) return;
        setGeneros(listaGeneros);

        if (data.length > 0) {
          const juegosConGeneros = await Promise.all(
            data.map(async (juego) => {
              const juegoGeneros = await generosService
                .obtenerGenerosPorJuego(juego.id)
                .catch(() => [] as Genero[]);
              return { ...juego, generos: juegoGeneros };
            })
          );
          if (!cancelled) {
            setJuegos(juegosConGeneros);
            setAvisoJuegos(null);
          }
        } else {
          setJuegos(FALLBACK_JUEGOS);
          setAvisoJuegos('Backend conectado, pero la tabla juegos está vacía en MySQL. Mostrando catálogo de ejemplo.');
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'No se pudo conectar con la API.';
          setJuegos(FALLBACK_JUEGOS);
          setAvisoJuegos(`No se pudo cargar desde el backend (${message}). Mostrando catálogo de ejemplo.`);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setCargandoJuegos(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // 📚 Estado de la Biblioteca del usuario y órdenes
  const [bibliotecaItems, setBibliotecaItems] = useState<BibliotecaItem[]>([]);
  const [ordenesUsuario, setOrdenesUsuario] = useState<OrdenResponse[]>([]);
  const [juegosInstalados, setJuegosInstalados] = useState<Record<number, boolean>>({});

  // 🔄 Revalidar sesión contra /api/auth/me al cargar si existe JWT
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!token) return;

    let cancelled = false;
    authService
      .getMe()
      .then((usuario) => {
        if (!cancelled) {
          setUsuarioLogueado(usuario);
        }
      })
      .catch(() => {
        if (!cancelled) {
          authService.logout();
          setUsuarioLogueado(null);
          setBibliotecaItems([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // 📚 Cargar biblioteca y órdenes reales del usuario cuando inicia sesión
  const idUsuarioLogueado = usuarioLogueado?.idUsuario;
  useEffect(() => {
    if (idUsuarioLogueado === undefined) return;

    let cancelled = false;
    Promise.all([
      bibliotecaService.obtenerPorUsuario(idUsuarioLogueado),
      ordenesService.obtenerPorUsuario(idUsuarioLogueado).catch(() => []),
    ])
      .then(([items, ordenes]) => {
        if (!cancelled) {
          setBibliotecaItems(items);
          setOrdenesUsuario(ordenes);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setBibliotecaItems([]);
          setOrdenesUsuario([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [idUsuarioLogueado]);

  const biblioteca: JuegoBiblioteca[] = usuarioLogueado
    ? bibliotecaItems.map((item) => {
        const juego = juegos.find((j) => j.id === item.idJuego);
        return {
          id: item.idJuego,
          titulo: juego?.titulo ?? `Juego #${item.idJuego}`,
          imagenUrl: juego?.imagenUrl,
          horasJugadas: item.horasJugadas,
          fechaAdquisicion: item.fechaAdquisicion,
          instalado: Boolean(juegosInstalados[item.idJuego]),
        };
      })
    : [];

  const handleToggleInstalacion = (idJuego: number) => {
    setJuegosInstalados((prev) => ({
      ...prev,
      [idJuego]: !prev[idJuego],
    }));
  };

  const handleRegistrarHoras = async (idJuego: number, nuevasHoras: number) => {
    if (!usuarioLogueado) return;
    await bibliotecaService.actualizarHoras(
      usuarioLogueado.idUsuario,
      idJuego,
      nuevasHoras
    );
    setBibliotecaItems((prev) =>
      prev.map((item) =>
        item.idJuego === idJuego ? { ...item, horasJugadas: nuevasHoras } : item
      )
    );
  };

  // 🛒 Función de compra: crea orden en el backend y actualiza la biblioteca
  const handleComprarJuego = async (juegoComprado: Juego) => {
    if (!usuarioLogueado) return;

    await ordenesService.crearOrden({
      idUsuario: usuarioLogueado.idUsuario,
      metodoPago: 'Tarjeta',
      detalles: [
        {
          idJuego: juegoComprado.id,
          precioComprado: juegoComprado.precio,
        },
      ],
    });

    setJuegos((prev) =>
      prev.map((j) =>
        j.id === juegoComprado.id ? { ...j, stock: Math.max(0, j.stock - 1) } : j
      )
    );

    const [itemsActualizados, ordenesActualizadas] = await Promise.all([
      bibliotecaService.obtenerPorUsuario(usuarioLogueado.idUsuario),
      ordenesService.obtenerPorUsuario(usuarioLogueado.idUsuario).catch(() => ordenesUsuario),
    ]);
    setBibliotecaItems(itemsActualizados);
    setOrdenesUsuario(ordenesActualizadas);
    setMintedGame(juegoComprado);
  };

  // 🚪 Función de Cierre de Sesión (Logout)
  const handleCerrarSesion = () => {
    authService.logout();
    setUsuarioLogueado(null);
    setBibliotecaItems([]);
    setOrdenesUsuario([]);
    navigate('/');
  };

  const abrirModalAuth = (modo: 'login' | 'register' = 'login') => {
    setModoAuthModal(modo);
    setMostrarModalLogin(true);
  };

  const appRoutes = (
    <Routes>
      <Route
        path="/"
        element={
          <CatalogoJuegos
            juegos={juegos}
            generos={generos}
            filtroBusqueda={terminoBusqueda}
            cargando={cargandoJuegos}
            juegosEnBiblioteca={biblioteca.map((j) => j.id)}
            onActiveGameChange={setAuraImageUrl}
          />
        }
      />
      <Route
        path="/biblioteca"
        element={
          <BibliotecaJuegos
            juegosBiblioteca={biblioteca}
            onToggleInstalacion={handleToggleInstalacion}
            onRegistrarHoras={handleRegistrarHoras}
            ordenes={ordenesUsuario}
            juegosCatalogo={juegos}
          />
        }
      />
      <Route
        path="/juego/:id"
        element={
          <VistaDetalleJuego
            juegos={juegos}
            usuarioLogueado={usuarioLogueado}
            onAbrirLogin={() => setMostrarModalLogin(true)}
            onComprarJuego={handleComprarJuego}
            juegosEnBiblioteca={biblioteca.map(j => j.id)}
          />
        }
      />
      <Route
        path="/admin"
        element={
          usuarioLogueado?.tipoUsuario === 'Admin' ||
          usuarioLogueado?.tipoUsuario === 'Desarrollador' ? (
            <PanelAdmin juegos={juegos} setJuegos={setJuegos} />
          ) : (
            <div className="max-w-[600px] mx-auto rounded-2xl border border-borde bg-bg-tarjeta p-8 text-center">
              <h2 className="mt-0 text-xl font-bold text-texto-principal">Acceso restringido</h2>
              <p className="mb-0 text-sm text-texto-secundario">
                Inicia sesión con una cuenta de Administrador o Desarrollador para gestionar el catálogo.
              </p>
            </div>
          )
        }
      />
    </Routes>
  );

  return (
    <div className="relative flex min-h-screen nova-grid-bg text-texto-principal font-sans">
      {auraImageUrl && (
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none z-0 opacity-[0.14] blur-[110px] bg-cover bg-center transition-all duration-1000 scale-110"
          style={{ backgroundImage: `url(${auraImageUrl})` }}
        />
      )}

      <Sidebar
        isOpen={sidebarAbierto}
        onClose={() => setSidebarAbierto(false)}
        juegosBiblioteca={biblioteca}
      />

      <div className="relative z-10 flex-1 flex flex-col min-w-0">
        <Header
          terminoBusqueda={terminoBusqueda}
          onBusquedaChange={setTerminoBusqueda}
          usuarioLogueado={usuarioLogueado}
          onAbrirLogin={abrirModalAuth}
          onCerrarSesion={handleCerrarSesion}
          onAbrirMenu={() => setSidebarAbierto(true)}
          onAbrirPalette={() => {
            playClick();
            setPaletteOpen(true);
          }}
          sfxEnabled={sfxEnabled}
          onToggleSfx={handleToggleSfx}
        />

        <main className="p-4 sm:p-6 lg:p-10 flex-1 box-border overflow-y-auto">
          {avisoJuegos && (
            <div className="mb-6 rounded-xl border border-primario/40 bg-primario/10 px-4 py-3 text-sm text-primario">
              {avisoJuegos}
            </div>
          )}
          {appRoutes}
        </main>

        <footer className="border-t border-borde bg-bg-superficie/70 backdrop-blur-sm px-4 sm:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-texto-secundario">
          <div className="flex items-center gap-2">
            <span className="font-extrabold tracking-wider text-primario uppercase">
              NovaGames
            </span>
            <span>•</span>
            <span>Catálogo Digital</span>
          </div>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="bg-transparent border-none p-0 text-texto-secundario hover:text-primario cursor-pointer text-xs"
            >
              Tienda
            </button>
            <button
              type="button"
              onClick={() => navigate('/biblioteca')}
              className="bg-transparent border-none p-0 text-texto-secundario hover:text-primario cursor-pointer text-xs"
            >
              Mi Biblioteca
            </button>
          </div>
        </footer>
      </div>

      {mostrarModalLogin && (
        <PanelLogin
          initialMode={modoAuthModal}
          onLoginExitoso={(usuario) => {
            setUsuarioLogueado(usuario);
            setMostrarModalLogin(false);
          }}
          onCerrar={() => setMostrarModalLogin(false)}
        />
      )}

      <NovaJumpPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        juegos={juegos}
        usuarioLogueado={usuarioLogueado}
        sfxEnabled={sfxEnabled}
        onToggleSfx={handleToggleSfx}
      />

      {mintedGame && (
        <KeycardMintModal
          key={mintedGame.id}
          juego={mintedGame}
          onClose={() => setMintedGame(null)}
        />
      )}
    </div>
  );
}
