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
        backgroundColor: 'var(--bg-tarjeta)',
        border: '1px solid var(--borde-color)',
        borderRadius: 'var(--radio-lg)',
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: 'var(--sombra-card)',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.borderColor = 'var(--color-primario)';
        e.currentTarget.style.boxShadow = 'var(--sombra-card-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--borde-color)';
        e.currentTarget.style.boxShadow = 'var(--sombra-card)';
      }}
    >
      {/* Contenedor grande para la Imagen / Banner */}
      <div style={{ height: '200px', backgroundColor: 'var(--bg-superficie)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--texto-mutado)' }}>
        <span>🎮 [Imagen de {juego.titulo}]</span>
        {/* Badge de Stock */}
        <span style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          backgroundColor: 'rgba(15, 23, 42, 0.85)',
          color: 'var(--texto-principal)',
          padding: '4px 10px',
          borderRadius: 'var(--radio-sm)',
          fontSize: '11px',
          fontWeight: '700',
          border: '1px solid var(--borde-color)'
        }}>
          Stock: {juego.stock}
        </span>
      </div>

      {/* Contenido de la Tarjeta */}
      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
        <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: 'var(--texto-principal)' }}>
          {juego.titulo}
        </h3>
        
        <p style={{ 
          fontSize: '14px', 
          color: 'var(--texto-secundario)', 
          margin: 0, 
          lineHeight: '1.5',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {juego.descripcion}
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--borde-color)' }}>
          <span style={{ fontSize: '22px', fontWeight: '800', color: 'var(--color-primario)' }}>
            ${juego.precio.toFixed(2)}
          </span>
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--color-exito)' }}>
            Ver más →
          </span>
        </div>
      </div>
    </div>
  );
};