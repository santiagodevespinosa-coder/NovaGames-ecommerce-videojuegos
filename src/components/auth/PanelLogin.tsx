// src/components/auth/PanelLogin.tsx
import React, { useState } from 'react';

interface PanelLoginProps {
  onLoginExitoso: (nombreUsuario: string) => void;
  onCerrar: () => void;
}

export const PanelLogin: React.FC<PanelLoginProps> = ({ onLoginExitoso, onCerrar }) => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (usuario.trim()) {
      onLoginExitoso(usuario);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        backgroundColor: 'var(--bg-tarjeta)',
        border: '1px solid var(--borde-color)',
        borderRadius: 'var(--radio-lg)',
        padding: '32px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: 'var(--sombra-modal)',
        color: 'var(--texto-principal)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>Iniciar Sesión</h2>
          <button 
            onClick={onCerrar}
            style={{ background: 'none', border: 'none', color: 'var(--texto-secundario)', fontSize: '18px', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--texto-secundario)', marginBottom: '6px' }}>
              Nombre de Usuario
            </label>
            <input 
              type="text" 
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Ej. Santiago"
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                backgroundColor: 'var(--bg-superficie)',
                border: '1px solid var(--borde-color)',
                borderRadius: 'var(--radio-sm)',
                color: 'var(--texto-principal)',
                fontSize: '14px',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--texto-secundario)', marginBottom: '6px' }}>
              Contraseña
            </label>
            <input 
              type="password" 
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              placeholder="••••••••"
              required
              style={{
                width: '100%',
                padding: '12px 14px',
                backgroundColor: 'var(--bg-superficie)',
                border: '1px solid var(--borde-color)',
                borderRadius: 'var(--radio-sm)',
                color: 'var(--texto-principal)',
                fontSize: '14px',
                boxSizing: 'border-box',
                outline: 'none'
              }}
            />
          </div>

          <button 
            type="submit"
            style={{
              marginTop: '8px',
              backgroundColor: 'var(--color-exito)',
              color: '#FFF',
              border: 'none',
              padding: '12px',
              borderRadius: 'var(--radio-sm)',
              fontWeight: '700',
              fontSize: '15px',
              cursor: 'pointer',
              transition: 'opacity 0.2s ease'
            }}
          >
            Entrar a Nova Games
          </button>
        </form>
      </div>
    </div>
  );
};