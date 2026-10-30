// src/App.tsx
import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CatalogoJuegos } from './components/juegos/CatalogoJuego';
import { BibliotecaJuegos, type JuegoBiblioteca } from './components/juegos/BibliotecaJuegos';
import { VistaDetalleJuego } from './components/juegos/VistaDetalleJuego';
import { PanelLogin } from './components/auth/PanelLogin';
import logoNovaGames from './assets/logo_nova_games.webp';
import type { Juego } from './types';

export function App() {
  const [seccionActiva, setSeccionActiva] = useState<'store' | 'library'>('store');
  const [terminoBusqueda, setTerminoBusqueda] = useState<string>('');
  
  // 🔐 Estados de Autenticación con persistencia en localStorage
  const [usuarioLogueado, setUsuarioLogueado] = useState<string | null>(() => {
    return localStorage.getItem('nova_usuario_logueado');
  });
  const [mostrarModalLogin, setMostrarModalLogin] = useState<boolean>(false);

  const navigate = useNavigate();

  // Mock data de tienda con stock real
  const [juegos, setJuegos] = useState<Juego[]>([
    { id: 1, titulo: 'Cyberpunk 2077', descripcion: 'Un RPG de acción y aventura en mundo abierto ambientado en Night City.', precio: 59.99, stock: 15, categoriaId: 1, desarrolladorId: 1 },
    { id: 2, titulo: 'Minecraft', descripcion: 'Explora mundos infinitos y construye de todo, desde la casa más simple hasta el castillo más grandioso.', precio: 29.99, stock: 30, categoriaId: 2, desarrolladorId: 2 },
    { id: 3, titulo: 'The Witcher 3: Wild Hunt', descripcion: 'Juego de rol de fantasía de mundo abierto basado en una historia y centrado en las opciones.', precio: 39.99, stock: 8, categoriaId: 1, desarrolladorId: 3 },
  ]);

  // 📚 Estado de la Biblioteca del usuario
  const [biblioteca, setBiblioteca] = useState<JuegoBiblioteca[]>([
    { id: 1, titulo: 'Cyberpunk 2077', horasJugadas: 12.5, instalado: true }
  ]);

  // 🛒 Función de compra: descuenta stock y añade a la biblioteca
  const handleComprarJuego = (juegoComprado: Juego) => {
    // 1. Descontar stock en la tienda
    setJuegos(prev =>
      prev.map(j => j.id === juegoComprado.id ? { ...j, stock: j.stock - 1 } : j)
    );

    // 2. Agregar a la biblioteca si no lo tiene
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
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0B101D', color: '#F8FAFC', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* 🧭 Menú Lateral Izquierdo */}
      <aside style={{ width: '240px', backgroundColor: '#0F172A', borderRight: '1px solid #334155', display: 'flex', flexDirection: 'column', padding: '24px 16px', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', paddingLeft: '8px' }}>
          <img 
            src={logoNovaGames} 
            alt="Nova Games Logo" 
            style={{ width: '200px', height: '200px', objectFit: 'contain' }} 
          />
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            onClick={() => { setSeccionActiva('store'); navigate('/'); }}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '12px 16px', borderRadius: '8px', border: 'none',
              backgroundColor: seccionActiva === 'store' ? '#1E293B' : 'transparent',
              color: seccionActiva === 'store' ? '#38BDF8' : '#94A3B8',
              fontWeight: '600', fontSize: '14px', cursor: 'pointer', textAlign: 'left'
            }}
          >
            🏪 Tienda
          </button>

          <button 
            onClick={() => { setSeccionActiva('library'); navigate('/'); }}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '12px 16px', borderRadius: '8px', border: 'none',
              backgroundColor: seccionActiva === 'library' ? '#1E293B' : 'transparent',
              color: seccionActiva === 'library' ? '#38BDF8' : '#94A3B8',
              fontWeight: '600', fontSize: '14px', cursor: 'pointer', textAlign: 'left'
            }}
          >
            📚 Biblioteca
          </button>
        </nav>
      </aside>

      {/* 🚀 Contenido Principal */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Header Superior con Buscador y Usuario + Botón Logout */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', backgroundColor: '#0B101D', borderBottom: '1px solid #334155' }}>
          <div style={{ width: '300px' }}>
            <input 
              type="text" 
              placeholder="Search store..." 
              value={terminoBusqueda}
              onChange={(e) => setTerminoBusqueda(e.target.value)}
              style={{
                width: '100%', padding: '10px 16px', backgroundColor: '#1E293B', border: '1px solid #334155',
                borderRadius: '20px', color: '#F8FAFC', fontSize: '13px', outline: 'none', boxSizing: 'border-box'
              }}
            />
          </div>

          {/* 👤 Control de Autenticación y Logout */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {usuarioLogueado ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#F8FAFC', fontSize: '14px', fontWeight: '600' }}>{usuarioLogueado}</span>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#10B981',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0F172A', fontWeight: '700', fontSize: '14px'
                  }}>
                    {usuarioLogueado.charAt(0).toUpperCase()}
                  </div>
                </div>
                <button 
                  onClick={handleCerrarSesion}
                  style={{
                    backgroundColor: 'transparent', color: '#EF4444', border: '1px solid #EF4444', padding: '6px 12px',
                    borderRadius: '16px', fontWeight: '600', fontSize: '12px', cursor: 'pointer', transition: 'all 0.2s ease'
                  }}
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setMostrarModalLogin(true)}
                style={{
                  backgroundColor: '#10B981', color: '#FFF', border: 'none', padding: '8px 16px',
                  borderRadius: '20px', fontWeight: '700', fontSize: '13px', cursor: 'pointer'
                }}
              >
                Registrarse / Iniciar Sesión
              </button>
            )}
          </div>
        </header>

        {/* Zona de Vistas / Enrutamiento */}
        <main style={{ padding: '40px', flex: 1, boxSizing: 'border-box', overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={
              <>
                {seccionActiva === 'store' && <CatalogoJuegos filtroBusqueda={terminoBusqueda} />}
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