// src/App.tsx
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CatalogoJuegos } from './components/juegos/CatalogoJuego';
import { BibliotecaJuegos, type JuegoBiblioteca } from './components/juegos/BibliotecaJuegos';
import { VistaDetalleJuego } from './components/juegos/VistaDetalleJuego';
import { PanelLogin } from './components/auth/PanelLogin';
import logoNovaGames from './assets/logo_nova_games.webp';
import type { Juego } from './types';
import { PanelAdmin } from './components/admin/PanelAdmin';

export function App() {
  const [seccionActiva, setSeccionActiva] = useState<'store' | 'library'>('store');
  const [terminoBusqueda, setTerminoBusqueda] = useState<string>('');
  
  // 🔐 Estados de Autenticación con persistencia en localStorage
  const [usuarioLogueado, setUsuarioLogueado] = useState<string | null>(() => {
    return localStorage.getItem('nova_usuario_logueado');
  });
  const [mostrarModalLogin, setMostrarModalLogin] = useState<boolean>(false);

  const navigate = useNavigate();

  // Mock data de tienda con stock real y rutas de imágenes unificadas en imagenUrl
  const [juegos, setJuegos] = useState<Juego[]>([
    { id: 1, titulo: 'Cyberpunk 2077', descripcion: 'Un RPG de acción y aventura en mundo abierto ambientado en Night City.', precio: 59.99, stock: 15, categoriaId: 1, desarrolladorId: 1, imagenUrl: '/images/imagenes-juegos/imagen_cyberpunk_2077.webp' },
    { id: 2, titulo: 'Minecraft', descripcion: 'Explora mundos infinitos y construye de todo, desde la casa más simple hasta el castillo más grandioso.', precio: 29.99, stock: 30, categoriaId: 2, desarrolladorId: 2, imagenUrl: '/images/imagenes-juegos/imagen_minecraft.webp' },
    { id: 3, titulo: 'The Witcher 3: Wild Hunt', descripcion: 'Juego de rol de fantasía de mundo abierto basado en una historia y centrado en las opciones.', precio: 39.99, stock: 8, categoriaId: 1, desarrolladorId: 3, imagenUrl: '/images/imagenes-juegos/imagen_the_witcher_3_wild_hunt.webp' },
  ]);

  // 📚 Estado de la Biblioteca del usuario
  const [biblioteca, setBiblioteca] = useState<JuegoBiblioteca[]>([
    { id: 1, titulo: 'Cyberpunk 2077', horasJugadas: 12.5, instalado: true }
  ]);

  // 🛒 Función de compra: descuenta stock y añade a la biblioteca
  const handleComprarJuego = (juegoComprado: Juego) => {
    setJuegos(prev =>
      prev.map(j => j.id === juegoComprado.id ? { ...j, stock: j.stock - 1 } : j)
    );

    const yaExiste = biblioteca.some(j => j.id === juegoComprado.id);
    if (!yaExiste) {
      setBiblioteca(prev => [
        ...prev,
        { id: juegoComprado.id, titulo: juegoComprado.titulo, horasJugadas: 0, instalado: false }
      ]);
    }
  };

  // 🚪 Función de Cierre de Sesión (Logout)
  const handleCerrarSesion = () => {
    localStorage.removeItem('nova_usuario_logueado');
    setUsuarioLogueado(null);
    navigate('/');
  };

  return (
    <div className="flex min-h-screen bg-bg-principal text-texto-principal font-sans">
      
      {/* 🧭 Menú Lateral Izquierdo */}
      <aside className="w-[240px] bg-bg-superficie border-r border-borde flex flex-col py-6 px-4 box-border shrink-0">
        <div className="flex items-center gap-3 mb-8 pl-2">
          <img 
            src={logoNovaGames} 
            alt="Nova Games Logo" 
            className="w-[200px] h-[200px] object-contain" 
          />
        </div>

        <nav className="flex flex-col gap-2">
          <button 
            onClick={() => { setSeccionActiva('store'); navigate('/'); }}
            className={`flex items-center gap-3 w-full py-3 px-4 rounded-lg border-none font-semibold text-sm cursor-pointer text-left transition-all duration-200 ${
              seccionActiva === 'store'
                ? 'bg-bg-tarjeta text-primario'
                : 'bg-transparent text-texto-secundario hover:text-texto-principal'
            }`}
          >
            🏪 Tienda
          </button>

          <button 
            onClick={() => { setSeccionActiva('library'); navigate('/'); }}
            className={`flex items-center gap-3 w-full py-3 px-4 rounded-lg border-none font-semibold text-sm cursor-pointer text-left transition-all duration-200 ${
              seccionActiva === 'library'
                ? 'bg-bg-tarjeta text-primario'
                : 'bg-transparent text-texto-secundario hover:text-texto-principal'
            }`}
          >
            📚 Biblioteca
          </button>
        </nav>
      </aside>

      {/* 🚀 Contenido Principal */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header Superior con Buscador y Botones de Autenticación Separados */}
        <header className="flex justify-between items-center py-4 px-8 bg-bg-principal border-b border-borde">
          <div className="w-[300px]">
            <input 
              type="text" 
              placeholder="Search store..." 
              value={terminoBusqueda}
              onChange={(e) => setTerminoBusqueda(e.target.value)}
              className="w-full py-2.5 px-4 bg-bg-tarjeta border border-borde rounded-[30px] text-texto-principal text-[13px] outline-none box-border focus:border-primario"
            />
          </div>

          {/* 👤 Control de Autenticación con Botones Independientes */}
          <div className="flex items-center gap-3">
            {usuarioLogueado ? (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => navigate('/admin')}
                  className="bg-[#1E293B] text-primario border border-primario py-2 px-4 rounded-[20px] font-bold text-[13px] cursor-pointer"
                >
                  ⚙️ Panel Admin
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-texto-principal text-sm font-semibold">{usuarioLogueado}</span>
                  <div className="w-8 h-8 rounded-full bg-exito flex items-center justify-center text-bg-principal font-bold text-sm">
                    {usuarioLogueado.charAt(0).toUpperCase()}
                  </div>
                </div>
                <button 
                  onClick={handleCerrarSesion}
                  className="bg-transparent text-[#EF4444] border border-[#EF4444] py-1.5 px-3 rounded-[20px] font-semibold text-xs cursor-pointer"
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                {/* Botón de Iniciar Sesión (Secundario) */}
                <button 
                  onClick={() => setMostrarModalLogin(true)}
                  className="bg-transparent text-texto-principal border border-[#334155] py-[9px] px-[18px] rounded-[20px] font-bold text-[13px] cursor-pointer transition-all duration-200"
                >
                  Iniciar Sesión
                </button>

                {/* Botón de Registrarse (Primario destacado) */}
                <button 
                  onClick={() => setMostrarModalLogin(true)}
                  className="bg-exito text-white border-none py-[9px] px-[18px] rounded-[20px] font-bold text-[13px] cursor-pointer shadow-[0_4px_12px_rgba(16,185,129,0.3)] transition-transform duration-200"
                >
                  Registrarse
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Zona de Vistas / Enrutamiento */}
        <main className="p-10 flex-1 box-border overflow-y-auto">
          <Routes>
            <Route path="/" element={
              <>
                {seccionActiva === 'store' && <CatalogoJuegos juegos={juegos} filtroBusqueda={terminoBusqueda} />}
                {seccionActiva === 'library' && <BibliotecaJuegos juegosBiblioteca={biblioteca} setJuegosBiblioteca={setBiblioteca} />}
              </>
            } />
            <Route path="/juego/:id" element={
              <VistaDetalleJuego 
                juegos={juegos} 
                usuarioLogueado={usuarioLogueado}
                onAbrirLogin={() => setMostrarModalLogin(true)}
                onComprarJuego={handleComprarJuego}
                juegosEnBiblioteca={biblioteca.map(j => j.id)}
              />
            } />
            <Route path="/admin" element={
              <PanelAdmin juegos={juegos} setJuegos={setJuegos} />
            } />
          </Routes>
        </main>
      </div>

      {/* 🔑 Modal / Panel de Login condicional */}
      {mostrarModalLogin && (
        <PanelLogin 
          onLoginExitoso={(nombre) => {
            localStorage.setItem('nova_usuario_logueado', nombre);
            setUsuarioLogueado(nombre);
            setMostrarModalLogin(false);
          }}
          onCerrar={() => setMostrarModalLogin(false)}
        />
      )}
    </div>
  );
}