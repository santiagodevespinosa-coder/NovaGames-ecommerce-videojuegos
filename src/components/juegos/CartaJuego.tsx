// src/components/juegos/CartaJuego.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import type { Juego } from '../../types';

interface CartaJuegoProps {
  juego: Juego;
}

export const CartaJuego: React.FC<CartaJuegoProps> = ({ juego }) => {
  return (
    <Link 
      to={`/juego/${juego.id}`}
      style={{ 
        backgroundColor: '#1E293B', 
        border: '1px solid #334155', 
        borderRadius: '12px', 
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)'
      }}
    >
      <div style={{ height: '150px', backgroundColor: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', fontSize: '14px', borderBottom: '1px solid #334155' }}>
        <span>🎮 [Imagen]</span>
      </div>

      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#F1F5F9', fontWeight: '600' }}>
          {juego.titulo}
        </h3>
        
        <p style={{ fontSize: '13px', color: '#94A3B8', margin: '0 0 16px 0', flex: 1, lineHeight: '1.4' }}>
          {juego.descripcion}
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid #334155' }}>
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#38BDF8' }}>
            ${juego.precio.toFixed(2)}
          </span>
          <span style={{ fontSize: '12px', color: juego.stock > 0 ? '#4ADE80' : '#F87171', fontWeight: '600' }}>
            {juego.stock > 0 ? `Stock: ${juego.stock}` : 'Sin stock'}
          </span>
        </div>
      </div>
    </Link>
  );
};