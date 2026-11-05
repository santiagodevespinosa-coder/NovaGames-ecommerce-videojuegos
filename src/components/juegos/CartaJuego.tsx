// src/components/juegos/CartaJuego.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Juego } from '../../types';

interface CartaJuegoProps {
  juego: Juego;
}

export const CartaJuego: React.FC<CartaJuegoProps> = ({ juego }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/juego/${juego.id}`)}
      style={{
        backgroundColor: 'var(--bg-tarjeta, #151F33)',
        border: '1px solid var(--borde-color, #23324A)',
        borderRadius: '14px',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.5)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        height: '340px',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.borderColor = 'var(--color-primario, #38BDF8)';
        e.currentTarget.style.boxShadow = '0 20px 30px -10px rgba(56, 189, 248, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--borde-color, #23324A)';
        e.currentTarget.style.boxShadow = '0 10px 20px -5px rgba(0, 0, 0, 0.5)';
      }}
    >
      {/* 🖼️ Imagen / Póster principal */}
      <div style={{ 
        flex: 1, 
        backgroundColor: '#070B14', 
        position: 'relative', 
        overflow: 'hidden'
      }}>
        {juego.imagenUrl ? (
          <img 
            src={juego.imagenUrl} 
            alt={juego.titulo} 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B' }}>
            🎮 {juego.titulo}
          </div>
        )}

        {/* Badge de Stock flotante */}
        <span style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          backgroundColor: 'rgba(7, 11, 20, 0.85)',
          color: '#F8FAFC',
          padding: '4px 10px',
          borderRadius: '6px',
          fontSize: '11px',
          fontWeight: '700',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          zIndex: 2
        }}>
          Stock: {juego.stock}
        </span>
      </div>

      {/* 📝 Título limpio en la parte inferior */}
      <div style={{ padding: '16px 20px', backgroundColor: 'var(--bg-tarjeta, #151F33)' }}>
        <h3 style={{ 
          margin: 0, 
          fontSize: '16px', 
          fontWeight: '700', 
          color: '#F8FAFC',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
          {juego.titulo}
        </h3>
      </div>
    </div>
  );
};