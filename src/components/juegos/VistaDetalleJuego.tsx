// src/components/juegos/VistaDetalleJuego.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Juego } from '../../types';

interface VistaDetalleJuegoProps {
  juegos: Juego[];
}

export const VistaDetalleJuego: React.FC<VistaDetalleJuegoProps> = ({ juegos }) => {
  const { id } = useParams<{ id: string }>();
  
  // Buscamos el juego que coincida con el ID de la URL
  const juegoEncontrado = juegos.find(j => j.id === Number(id));

  if (!juegoEncontrado) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#F87171' }}>
        <h2>Videojuego no encontrado</h2>
        <p style={{ color: '#94A3B8', marginBottom: '20px' }}>El juego que buscas no existe o fue eliminado.</p>
        <Link to="/" style={{ color: '#38BDF8', textDecoration: 'none', fontWeight: '700' }}>
          ← Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', color: '#F8FAFC' }}>
      <Link to="/" style={{ color: '#38BDF8', textDecoration: 'none', fontSize: '14px', fontWeight: '600', display: 'inline-block', marginBottom: '24px' }}>
        ← Volver a la tienda
      </Link>

      <div style={{ 
        backgroundColor: '#1E293B', 
        border: '1px solid #334155', 
        borderRadius: '16px', 
        overflow: 'hidden',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
      }}>
        {/* Banner o Imagen */}
        <div style={{ height: '280px', backgroundColor: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748B', fontSize: '18px', borderBottom: '1px solid #334155' }}>
          <span>🎮 [Banner de {juegoEncontrado.titulo}]</span>
        </div>

        {/* Información Detallada */}
        <div style={{ padding: '32px' }}>
          <h1 style={{ margin: '0 0 16px 0', fontSize: '32px', fontWeight: '700', color: '#F8FAFC' }}>
            {juegoEncontrado.titulo}
          </h1>

          <p style={{ fontSize: '16px', color: '#94A3B8', lineHeight: '1.6', margin: '0 0 32px 0' }}>
            {juegoEncontrado.descripcion}
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #334155', paddingTop: '24px' }}>
            <div>
              <span style={{ display: 'block', fontSize: '12px', color: '#94A3B8', textTransform: 'uppercase', marginBottom: '4px' }}>Precio</span>
              <span style={{ fontSize: '28px', fontWeight: '800', color: '#38BDF8' }}>
                ${juegoEncontrado.precio.toFixed(2)}
              </span>
            </div>

            <button 
              onClick={() => alert(`¡Has comprado ${juegoEncontrado.titulo} con éxito!`)}
              style={{
                backgroundColor: '#10B981',
                color: '#FFF',
                border: 'none',
                padding: '12px 28px',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }}
            >
              Comprar Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};