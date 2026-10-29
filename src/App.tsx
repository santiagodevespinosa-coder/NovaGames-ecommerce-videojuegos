// src/App.tsx
import { useState } from 'react';
import { CatalogoJuegos } from './components/juegos/CatalogoJuego';
import logoNova from './assets/logo_nova_games.webp';
import { BibliotecaJuegos } from './components/juegos/BibliotecaJuegos';

function App() {
  const [seccionActiva, setSeccionActiva] = useState<'store' | 'library' | 'community'>('store');
  const [terminoBusqueda, setTerminoBusqueda] = useState<string>('');

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: '#0F172A', 
      color: '#F8FAFC', 
      fontFamily: "'Nunito', system-ui, sans-serif" 
    }}>
      
      {/* 🧭 1. BARRA LATERAL */}
      <aside style={{ 
        width: '260px', 
        backgroundColor: '#0B101D', 
        borderRight: '1px solid #1E293B',
        display: 'flex',
        flexDirection: 'column',
        padding: '32px 20px',
        position: 'sticky',
        top: 0,
        height: '100vh',
        boxSizing: 'border-box'
      }}>
        {/* Logo */}
        <div style={{ marginBottom: '48px', display: 'flex', justifyContent: 'center' }}>
          <img 
            src={logoNova} 
            alt="Nova Games Logo" 
            style={{ 
              width: '100%', 
              maxWidth: '180px', 
              height: 'auto',
              objectFit: 'contain'
            }} 
          />
        </div>

        {/* Menú lateral en español */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div 
            onClick={() => setSeccionActiva('store')}
            style={{ 
              padding: '10px 16px', 
              backgroundColor: seccionActiva === 'store' ? '#1E293B' : 'transparent', 
              borderRadius: '8px', 
              color: seccionActiva === 'store' ? '#F8FAFC' : '#94A3B8', 
              fontWeight: seccionActiva === 'store' ? '700' : '600', 
              fontSize: '15px', 
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Tienda
          </div>
          
          <div 
            onClick={() => setSeccionActiva('library')}
            style={{ 
              padding: '10px 16px', 
              backgroundColor: seccionActiva === 'library' ? '#1E293B' : 'transparent', 
              borderRadius: '8px', 
              color: seccionActiva === 'library' ? '#F8FAFC' : '#94A3B8', 
              fontWeight: seccionActiva === 'library' ? '700' : '600', 
              fontSize: '15px', 
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Biblioteca
          </div>

          <div 
            onClick={() => setSeccionActiva('community')}
            style={{ 
              padding: '10px 16px', 
              backgroundColor: seccionActiva === 'community' ? '#1E293B' : 'transparent', 
              borderRadius: '8px', 
              color: seccionActiva === 'community' ? '#F8FAFC' : '#94A3B8', 
              fontWeight: seccionActiva === 'community' ? '700' : '600', 
              fontSize: '15px', 
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            Comunidad
          </div>
        </nav>
      </aside>

      {/* 🖥️ 2. CONTENIDO PRINCIPAL A LA DERECHA */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Navbar superior */}
        <header style={{ 
          height: '75px', 
          borderBottom: '1px solid #1E293B', 
          backgroundColor: '#0B101D',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 40px',
          position: 'sticky',
          top: 0,
          zIndex: 1000
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <div style={{ 
              backgroundColor: '#1E293B', 
              borderRadius: '20px', 
              padding: '8px 16px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              width: '260px',
              border: '1px solid #334155'
            }}>
              <span style={{ color: '#94A3B8', fontSize: '14px' }}>🔍</span>
              <input 
                type="text" 
                placeholder="Search store..." 
                value={terminoBusqueda}
                onChange={(e) => setTerminoBusqueda(e.target.value)}
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  color: '#F8FAFC', 
                  outline: 'none', 
                  fontSize: '14px',
                  width: '100%',
                  fontFamily: 'inherit'
                }} 
              />
            </div>

            <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#94A3B8', fontWeight: '600' }}>
              <span style={{ color: '#F8FAFC', cursor: 'pointer' }}>Discover</span>
              <span style={{ cursor: 'pointer' }}>Browse</span>
              <span style={{ cursor: 'pointer' }}>News</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '36px', height: '36px', backgroundColor: '#10B981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '14px', color: '#FFF' }}>
              S
            </div>
          </div>
        </header>

        {/* Cuerpo dinámico */}
        <main style={{ padding: '40px', maxWidth: '1200px', width: '100%', boxSizing: 'border-box' }}>
          {seccionActiva === 'store' && <CatalogoJuegos filtroBusqueda={terminoBusqueda} />}
          {seccionActiva === 'library' && <BibliotecaJuegos />} {/* 👈 Lo integramos aquí */}
          {seccionActiva === 'community' && (
            <div style={{ color: '#94A3B8', fontSize: '18px', textAlign: 'center', marginTop: '60px' }}>
              Sección de comunidad próximamente.
            </div>
          )}
        </main>

      </div>
    </div>
  );
}

export default App;