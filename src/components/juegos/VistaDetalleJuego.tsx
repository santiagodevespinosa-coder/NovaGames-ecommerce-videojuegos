// src/components/juegos/VistaDetalleJuego.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { resenasService } from '../../services/resenasService';
import type { Juego, Resena, Usuario } from '../../types';
import { getGameTrailerUrl, getPortraitImageUrl } from '../../utils/gameImages';
import { playClick } from '../../utils/novaAudio';
import { CartaJuego } from './CartaJuego';
import { RequisitosSistema } from './RequisitosSistema';

interface VistaDetalleJuegoProps {
  juegos: Juego[];
  usuarioLogueado: Usuario | null;
  onAbrirLogin: () => void;
  onComprarJuego: (juegoComprado: Juego) => Promise<void>;
  juegosEnBiblioteca: number[];
}

export const VistaDetalleJuego: React.FC<VistaDetalleJuegoProps> = ({
  juegos,
  usuarioLogueado,
  onAbrirLogin,
  onComprarJuego,
  juegosEnBiblioteca,
}) => {
  const { id } = useParams<{ id: string }>();
  const [comprando, setComprando] = useState(false);
  const [lucesApagadas, setLucesApagadas] = useState(false);
  const [errorCompra, setErrorCompra] = useState<string | null>(null);
  const [mensajeCompra, setMensajeCompra] = useState<string | null>(null);

  const [resenas, setResenas] = useState<Resena[]>([]);
  const [cargandoResenas, setCargandoResenas] = useState(false);
  const [recomendado, setRecomendado] = useState(true);
  const [comentario, setComentario] = useState('');
  const [enviandoResena, setEnviandoResena] = useState(false);
  const [errorResena, setErrorResena] = useState<string | null>(null);
  const [filtroResena, setFiltroResena] = useState<'todas' | 'positivas' | 'negativas'>('todas');

  const juegoEncontrado = juegos.find((j) => j.id === Number(id));
  const idJuegoActual = juegoEncontrado?.id;

  useEffect(() => {
    if (idJuegoActual === undefined) return;
    let cancelled = false;

    resenasService
      .obtenerPorJuego(idJuegoActual)
      .then((data) => {
        if (!cancelled) {
          setResenas(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setResenas([]);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setCargandoResenas(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [idJuegoActual]);

  if (!juegoEncontrado) {
    return (
      <div className="text-center p-[60px] text-[#F87171]">
        <h2>Videojuego no encontrado</h2>
        <Link to="/" className="text-primario no-underline font-bold">
          ← Volver al catálogo
        </Link>
      </div>
    );
  }

  const yaEnBiblioteca = juegosEnBiblioteca.includes(juegoEncontrado.id);
  const trailerUrl =
    juegoEncontrado.trailerUrl || getGameTrailerUrl(juegoEncontrado.titulo);
  const portraitUrl = getPortraitImageUrl(juegoEncontrado.imagenUrl);

  const totalResenas = resenas.length;
  const positivas = resenas.filter((r) => r.recomendado).length;
  const porcentajePositivo =
    totalResenas > 0 ? Math.round((positivas / totalResenas) * 100) : null;

  const manejarCompra = async () => {
    setErrorCompra(null);
    setMensajeCompra(null);

    if (!usuarioLogueado) {
      onAbrirLogin();
      return;
    }
    if (yaEnBiblioteca || comprando) {
      return;
    }

    setComprando(true);
    try {
      await onComprarJuego(juegoEncontrado);
      setMensajeCompra(
        `¡Compra exitosa! ${juegoEncontrado.titulo} se ha añadido a tu Biblioteca.`
      );
    } catch (err) {
      setErrorCompra(
        err instanceof Error ? err.message : 'No se pudo completar la compra.'
      );
    } finally {
      setComprando(false);
    }
  };

  const manejarEnviarResena = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorResena(null);
    if (!usuarioLogueado) {
      onAbrirLogin();
      return;
    }

    setEnviandoResena(true);
    try {
      const nueva = await resenasService.crearResena({
        idUsuario: usuarioLogueado.idUsuario,
        idJuego: juegoEncontrado.id,
        recomendado,
        comentario: comentario.trim() || null,
      });
      setResenas((prev) => [nueva, ...prev]);
      setComentario('');
    } catch (err) {
      setErrorResena(
        err instanceof Error ? err.message : 'No se pudo publicar la reseña.'
      );
    } finally {
      setEnviandoResena(false);
    }
  };

  return (
    <>
      {lucesApagadas && (
        <div
          onClick={() => setLucesApagadas(false)}
          className="fixed inset-0 bg-black/85 backdrop-blur-[2px] z-30 transition-opacity duration-300"
        />
      )}

      {/* 🎬 Escenario Full-Bleed de Cine */}
      <section className="relative -mx-4 sm:-mx-6 lg:-mx-10 -mt-4 sm:-mt-6 lg:-mt-10 mb-10 pt-4 sm:pt-5 pb-8 overflow-visible">
        {juegoEncontrado.imagenUrl && (
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 blur-3xl bg-cover bg-center transition-all duration-700 ${
              lucesApagadas
                ? 'z-40 animate-nova-ambilight opacity-70'
                : 'opacity-30 scale-110'
            }`}
            style={{ backgroundImage: `url(${juegoEncontrado.imagenUrl})` }}
          />
        )}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-bg-principal/55 to-bg-principal"
        />

        {/* Barra superior del cine */}
        <div className="relative z-40 flex items-center justify-between px-4 sm:px-6 lg:px-10 mb-4">
          <Link
            to="/"
            className="text-primario no-underline text-sm font-semibold hover:underline"
          >
            ← Volver a la tienda
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setLucesApagadas((prev) => !prev)}
              className="nova-btn-outline nova-blade-chamfer text-xs font-bold text-texto-principal px-4 py-1.5 cursor-pointer"
            >
              {lucesApagadas ? 'Encender luces' : 'Apagar luces'}
            </button>
          </div>
        </div>

        {/* Pantalla de Cine Edge-to-Edge */}
        <div className="relative z-40 w-full aspect-video max-h-[75vh] bg-[#03060D] border-y border-primario/25 shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_50px_rgba(56,189,248,0.14)] overflow-hidden flex items-center justify-center">
          {trailerUrl ? (
            <iframe
              src={trailerUrl}
              title={`Tráiler oficial de ${juegoEncontrado.titulo}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : juegoEncontrado.imagenUrl ? (
            <img
              src={juegoEncontrado.imagenUrl}
              alt={juegoEncontrado.titulo}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-texto-secundario text-base font-semibold">
              Tráiler no disponible para {juegoEncontrado.titulo}
            </span>
          )}
        </div>
      </section>

      <div className="max-w-[1600px] mx-auto text-texto-principal pb-[60px] relative">
        {/* 📋 Información del Juego + Panel de Compra */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.65fr_1fr] gap-8 mb-10">
          <div className="nova-blade-chamfer bg-[#0B1220]/85 backdrop-blur-sm p-6 sm:p-8 border border-primario/20 shadow-[0_12px_30px_rgba(0,0,0,0.45)] flex flex-col sm:flex-row gap-6">
            {portraitUrl && (
              <img
                src={portraitUrl}
                alt={juegoEncontrado.titulo}
                style={{ viewTransitionName: `game-cover-${juegoEncontrado.id}` }}
                className="w-full sm:w-44 h-56 sm:h-auto rounded-lg object-cover border border-primario/25 shrink-0 shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
              />
            )}

            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                {juegoEncontrado.generos && juegoEncontrado.generos.length > 0 ? (
                  juegoEncontrado.generos.map((g) => (
                    <span
                      key={g.idGenero}
                      className="nova-blade-chamfer bg-[#070B14] text-primario py-1 px-3.5 text-[11px] font-bold uppercase tracking-wider border border-primario/30"
                    >
                      {g.nombre}
                    </span>
                  ))
                ) : (
                  <span className="nova-blade-chamfer bg-[#070B14] text-primario py-1 px-3.5 text-[11px] font-bold uppercase tracking-wider border border-primario/30">
                    Catálogo NovaGames
                  </span>
                )}
              </div>

              <h1 className="mt-1 mb-2.5 text-3xl font-extrabold tracking-tight">
                {juegoEncontrado.titulo}
              </h1>

              <div className="flex items-center gap-2 mb-4">
                {porcentajePositivo !== null ? (
                  <>
                    <span className="text-exito text-[15px] font-extrabold">
                      ★ {porcentajePositivo}%
                    </span>
                    <span className="text-texto-secundario text-[13px]">
                      ({totalResenas} {totalResenas === 1 ? 'reseña' : 'reseñas'} de la comunidad)
                    </span>
                  </>
                ) : (
                  <span className="text-texto-secundario text-[13px]">
                    Sin reseñas todavía
                  </span>
                )}
              </div>

              <p className="text-sm text-texto-secundario leading-relaxed m-0">
                {juegoEncontrado.descripcion}
              </p>

              {juegoEncontrado.fechaLanzamiento && (
                <div className="mt-4 pt-3 border-t border-primario/10 text-xs text-texto-secundario font-mono">
                  Lanzamiento:{' '}
                  <span className="text-texto-principal font-semibold">
                    {new Date(juegoEncontrado.fechaLanzamiento).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Panel de Compra */}
          <div className="nova-blade-chamfer bg-[#0B1220]/90 backdrop-blur-sm p-6 sm:p-8 border border-primario/25 flex flex-col justify-between shadow-[0_12px_30px_rgba(0,0,0,0.5)]">
            <div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-primario">
                Edición Digital • Entrega inmediata
              </span>
              <div className="flex justify-between items-baseline mt-3 mb-5 pb-4 border-b border-primario/15">
                <span className="text-[13px] text-texto-secundario uppercase">
                  Precio final
                </span>
                <div className="flex items-baseline gap-2.5">
                  {(juegoEncontrado.descuentoPorcentaje ?? 0) > 0 &&
                    juegoEncontrado.precioBase !== undefined && (
                      <>
                        <span className="bg-exito text-bg-principal px-2 py-0.5 rounded text-xs font-black">
                          -{juegoEncontrado.descuentoPorcentaje}%
                        </span>
                        <span className="text-sm text-texto-secundario line-through">
                          ${juegoEncontrado.precioBase.toFixed(2)}
                        </span>
                      </>
                    )}
                  <span className="text-3xl font-extrabold text-primario">
                    {juegoEncontrado.precio === 0
                      ? 'Gratis'
                      : `$${juegoEncontrado.precio.toFixed(2)}`}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={manejarCompra}
                disabled={yaEnBiblioteca || comprando}
                className={`nova-blade-chamfer w-full text-white p-3.5 font-extrabold text-[15px] transition-all duration-200 disabled:opacity-70 ${
                  yaEnBiblioteca
                    ? 'nova-btn-outline text-texto-secundario cursor-default'
                    : 'nova-btn-primary cursor-pointer'
                }`}
              >
                {comprando
                  ? 'Procesando compra...'
                  : yaEnBiblioteca
                    ? 'En tu Biblioteca'
                    : usuarioLogueado
                      ? 'Comprar y Añadir a Biblioteca'
                      : 'Inicia sesión para comprar'}
              </button>

              {errorCompra && (
                <p className="mt-3 mb-0 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-400">
                  {errorCompra}
                </p>
              )}
              {mensajeCompra && (
                <p className="mt-3 mb-0 rounded-lg border border-exito/40 bg-exito/10 px-3 py-2 text-xs text-exito">
                  {mensajeCompra}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* 💻 Requerimientos del Sistema */}
        <RequisitosSistema />

        {/* 💬 Reseñas de la Comunidad */}
        <section className="nova-blade-chamfer bg-[#0B1220]/85 backdrop-blur-sm p-6 sm:p-8 border border-primario/20 shadow-[0_12px_30px_rgba(0,0,0,0.45)] mb-12">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-primario/15 pb-3 mb-6">
            <div className="flex items-center gap-3">
              <h3 className="m-0 text-lg font-extrabold tracking-wide text-texto-principal uppercase">
                Reseñas de la Comunidad ({totalResenas})
              </h3>
              {porcentajePositivo !== null && (
                <span className="text-xs font-bold text-exito">
                  ★ {porcentajePositivo}% recomendadas
                </span>
              )}
            </div>

            {totalResenas > 0 && (
              <div className="flex items-center gap-1.5 bg-[#070B14] p-1 rounded-lg border border-primario/20">
                {(
                  [
                    { id: 'todas', label: 'Todas' },
                    { id: 'positivas', label: 'Recomendadas' },
                    { id: 'negativas', label: 'Negativas' },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      playClick();
                      setFiltroResena(item.id);
                    }}
                    className={`px-3 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                      filtroResena === item.id
                        ? 'bg-primario/20 text-primario border border-primario/40'
                        : 'text-texto-secundario hover:text-texto-principal border border-transparent'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {usuarioLogueado ? (
            <form
              onSubmit={manejarEnviarResena}
              noValidate
              className="mb-8 bg-[#070B14]/70 border border-borde rounded-lg p-5"
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-texto-secundario">
                  ¿Recomiendas este juego?
                </span>
                <button
                  type="button"
                  onClick={() => setRecomendado(true)}
                  className={`nova-blade-chamfer px-4 py-1.5 text-xs font-bold cursor-pointer transition-all ${
                    recomendado
                      ? 'bg-exito text-white shadow-[0_0_12px_rgba(16,185,129,0.4)]'
                      : 'nova-btn-outline text-texto-secundario'
                  }`}
                >
                  👍 Sí, lo recomiendo
                </button>
                <button
                  type="button"
                  onClick={() => setRecomendado(false)}
                  className={`nova-blade-chamfer px-4 py-1.5 text-xs font-bold cursor-pointer transition-all ${
                    !recomendado
                      ? 'bg-red-500 text-white shadow-[0_0_12px_rgba(239,68,68,0.4)]'
                      : 'nova-btn-outline text-texto-secundario'
                  }`}
                >
                  👎 No lo recomiendo
                </button>
              </div>

              <textarea
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Escribe tu opinión sobre el juego..."
                rows={3}
                className="w-full p-3 bg-bg-superficie/90 border border-borde rounded-lg text-texto-principal text-sm outline-none box-border resize-y focus:border-primario mb-3"
              />

              {errorResena && (
                <p className="mt-0 mb-3 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-400">
                  {errorResena}
                </p>
              )}

              <button
                type="submit"
                disabled={enviandoResena}
                className="nova-btn-primary nova-blade-chamfer text-white py-2.5 px-6 font-bold text-xs uppercase tracking-wider cursor-pointer disabled:opacity-60"
              >
                {enviandoResena ? 'Publicando...' : 'Publicar Reseña'}
              </button>
            </form>
          ) : (
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3 bg-[#070B14]/70 border border-borde rounded-lg p-4">
              <span className="text-sm text-texto-secundario">
                Inicia sesión para compartir tu reseña con la comunidad.
              </span>
              <button
                type="button"
                onClick={onAbrirLogin}
                className="nova-btn-outline nova-blade-chamfer text-primario px-4 py-2 text-xs font-bold cursor-pointer"
              >
                Iniciar Sesión
              </button>
            </div>
          )}

          {cargandoResenas ? (
            <p className="text-sm text-texto-secundario m-0">Cargando reseñas...</p>
          ) : resenas.length === 0 ? (
            <p className="text-sm text-texto-secundario m-0">
              Aún no hay reseñas para este título. ¡Sé el primero en opinar!
            </p>
          ) : (
            <div className="flex flex-col gap-3.5">
              {resenas
                .filter((r) =>
                  filtroResena === 'todas'
                    ? true
                    : filtroResena === 'positivas'
                      ? r.recomendado
                      : !r.recomendado
                )
                .map((r) => (
                <article
                  key={r.idResena}
                  className="bg-[#070B14]/70 border border-borde rounded-lg p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-500/30 to-purple-500/30 border border-primario/40 flex items-center justify-center font-mono text-[10px] font-bold text-primario">
                        U{r.idUsuario}
                      </div>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded ${
                          r.recomendado
                            ? 'bg-exito/15 text-exito border border-exito/30'
                            : 'bg-red-500/15 text-red-400 border border-red-500/30'
                        }`}
                      >
                        {r.recomendado ? '👍 Recomendado' : '👎 No recomendado'}
                      </span>
                      <span className="text-xs font-semibold text-texto-principal">
                        Usuario #{r.idUsuario}
                      </span>
                    </div>
                    <span className="text-[11px] text-texto-secundario">
                      {new Date(r.fechaPublicacion).toLocaleDateString()}
                    </span>
                  </div>
                  {r.comentario && (
                    <p className="m-0 text-sm text-texto-secundario leading-relaxed">
                      {r.comentario}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>

        {/* 🎮 Más Títulos Recomendados */}
        {juegos.filter((j) => j.id !== juegoEncontrado.id).length > 0 && (
          <section className="mb-10">
            <div className="flex items-center justify-between mb-5">
              <h3 className="m-0 text-xl font-extrabold tracking-wide text-texto-principal uppercase">
                Más en NovaGames
              </h3>
              <Link
                to="/"
                className="text-xs font-bold text-primario no-underline hover:underline uppercase tracking-wider"
              >
                Ver catálogo completo →
              </Link>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-7">
              {juegos
                .filter((j) => j.id !== juegoEncontrado.id)
                .slice(0, 4)
                .map((j) => (
                  <CartaJuego
                    key={j.id}
                    juego={j}
                    enBiblioteca={juegosEnBiblioteca.includes(j.id)}
                  />
                ))}
            </div>
          </section>
        )}

        {/* Barra flotante rápida de compra */}
        <div className="sticky bottom-4 z-20 nova-blade-chamfer bg-[#070B14]/90 backdrop-blur-xl border border-primario/35 px-5 py-3.5 shadow-[0_15px_40px_rgba(0,0,0,0.8)] flex flex-wrap items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-sm font-extrabold text-texto-principal truncate">
              {juegoEncontrado.titulo}
            </div>
            <div className="font-mono text-[11px] text-texto-secundario">
              Edición Digital • Entrega inmediata
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <span className="text-xl font-extrabold text-primario">
              {juegoEncontrado.precio === 0
                ? 'Gratis'
                : `$${juegoEncontrado.precio.toFixed(2)}`}
            </span>
            <button
              type="button"
              onClick={manejarCompra}
              disabled={yaEnBiblioteca || comprando}
              className={`nova-blade-chamfer px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white transition-all disabled:opacity-70 ${
                yaEnBiblioteca
                  ? 'nova-btn-outline text-texto-secundario cursor-default'
                  : 'nova-btn-primary cursor-pointer'
              }`}
            >
              {comprando
                ? 'Procesando...'
                : yaEnBiblioteca
                  ? 'En tu Biblioteca'
                  : usuarioLogueado
                    ? 'Comprar Ahora'
                    : 'Inicia sesión'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};