// src/components/juegos/CarruselDestacados.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Juego } from '../../types';

interface CarruselProps {
  juegos: Juego[];
}

export const CarruselDestacados: React.FC<CarruselProps> = ({ juegos }) => {
  const [indiceActual, setIndiceActual] = useState(0);
  const navigate = useNavigate();

  // Tomamos los primeros 3 juegos para el carrusel principal
  const destacados = juegos.slice(0, 3);

  useEffect(() => {
    if (destacados.length === 0) return;
    const intervalo = setInterval(() => {
      setIndiceActual((prev) => (prev + 1) % destacados.length);
    }, 5000); // Cambia cada 5 segundos
    return () => clearInterval(intervalo);
  }, [destacados.length]);

  if (destacados.length === 0) return null;

  const juegoActual = destacados[indiceActual];

  return (
    <div style={{
      position: 'relative',
      height: '380px',
      backgroundColor: 'var(--bg-tarjeta)',
      borderRadius: 'var(--radio-lg)',
      border: '1px solid var(--borde-color)',
      overflow: 'hidden',
      marginBottom: '40px',
      boxShadow: 'var(--sombra-card)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end'
    }}>
      {/* Fondo / Banner simulado con degradado inmersivo */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, #070B14 0%, rgba(15, 23, 42, 0.8) 50%, transparent 100%), linear-gradient(0deg, #070B14 0%, transparent 60%)',
        zIndex: 1
      }} />

      {/* Indicador visual de destacado */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '24px',
        zIndex: 2,
        backgroundColor: 'var(--color-primario)',
        color: '#070B14',
        padding: '6px 14px',
        borderRadius: 'var(--radio-pill)',
        fontSize: '12px',
        fontWeight: '800',
        letterSpacing: '1px',
        textTransform: 'uppercase'
      }}>
        ★ Destacado y Tendencia
      </div>

      {/* Información del juego en el carrusel */}
      <div style={{ position: 'relative', zIndex: 2, padding: '32px', maxWidth: '600px' }}>
        <h2 style={{ fontSize: '36px', fontWeight: '800', color: 'var(--texto-principal)', margin: '0 0 12px 0' }}>
          {juegoActual.titulo}
        </h2>
        <p style={{ fontSize: '15px', color: 'var(--texto-secundario)', margin: '0 0 20px 0', lineHeight: '1.5' }}>
          {juegoActual.descripcion}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '24px', fontWeight: '800', color: 'var(--color-primario)' }}>
            ${juegoActual.precio.toFixed(2)}
          </span>
          <button 
            onClick={() => navigate(`/juego/${juegoActual.id}`)}
            style={{
              backgroundColor: 'var(--color-primario)',
              color: '#070B14',
              border: 'none',
              padding: '12px 28px',
              borderRadius: 'var(--radio-pill)',
              fontWeight: '700',
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px var(--color-primario-glow)',
              transition: 'transform 0.2s ease'
            }}
          >
            Ver Detalles y Comprar
          </button>
        </div>
      </div>

      {/* Botones de navegación manual por puntitos */}
      <div style={{ position: 'absolute', bottom: '20px', right: '24px', zIndex: 2, display: 'flex', gap: '8px' }}>
        {destacados.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setIndiceActual(idx)}
            style={{
              width: idx === indiceActual ? '28px' : '10px',
              height: '10px',
              borderRadius: '5px',
              backgroundColor: idx === indiceActual ? 'var(--color-primario)' : 'var(--borde-color)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          />
        ))}
      </div>
    </div>
  );
};