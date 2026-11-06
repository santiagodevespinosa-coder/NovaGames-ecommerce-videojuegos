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

  const destacados = juegos.slice(0, 3);

  useEffect(() => {
    if (destacados.length === 0) return;
    const intervalo = setInterval(() => {
      setIndiceActual((prev) => (prev + 1) % destacados.length);
    }, 6000);
    return () => clearInterval(intervalo);
  }, [destacados.length]);

  if (destacados.length === 0) return null;

  const juegoActual = destacados[indiceActual];

  return (
    <div style={{
      position: 'relative',
      height: '400px',
      backgroundColor: 'var(--bg-tarjeta, #151F33)',
      borderRadius: '16px',
      border: '1px solid var(--borde-color, #23324A)',
      overflow: 'hidden',
      marginBottom: '40px',
      boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end'
    }}>
      {/* 🖼️ Imagen de portada de fondo con degradado cinematográfico */}
      {juegoActual.imagenUrl && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${juegoActual.imagenUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(1)',
          zIndex: 1,
          transition: 'background-image 0.5s ease-in-out'
        }} />
      )}

      {/* Capa de sombreado lateral para legibilidad del texto */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, #0d121f 0%, rgba(7, 11, 20, 0.8) 50%, transparent 100%), linear-gradient(0deg, #070B14 0%, transparent 50%)',
        zIndex: 2
      }} />

      {/* Badge Destacado */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '24px',
        zIndex: 3,
        backgroundColor: 'var(--color-primario, #38BDF8)',
        color: '#070B14',
        padding: '6px 14px',
        borderRadius: '30px',
        fontSize: '11px',
        fontWeight: '800',
        letterSpacing: '1px',
        textTransform: 'uppercase'
      }}>
        ★ Tendencia Global
      </div>

      {/* Información del juego */}
      <div style={{ position: 'relative', zIndex: 3, padding: '36px', maxWidth: '600px' }}>
        <h2 style={{ fontSize: '38px', fontWeight: '800', color: '#F8FAFC', margin: '0 0 12px 0', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
          {juegoActual.titulo}
        </h2>
        <p style={{ fontSize: '15px', color: '#CBD5E1', margin: '0 0 20px 0', lineHeight: '1.5', textShadow: '0 1px 5px rgba(0,0,0,0.8)' }}>
          {juegoActual.descripcion}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span style={{ fontSize: '26px', fontWeight: '800', color: '#38BDF8', textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
            ${juegoActual.precio.toFixed(2)}
          </span>
          <button 
            onClick={() => navigate(`/juego/${juegoActual.id}`)}
            style={{
              backgroundColor: '#38BDF8',
              color: '#070B14',
              border: 'none',
              padding: '12px 28px',
              borderRadius: '30px',
              fontWeight: '700',
              fontSize: '14px',
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(56, 189, 248, 0.4)',
              transition: 'transform 0.2s ease'
            }}
          >
            Ver Detalles y Comprar
          </button>
        </div>
      </div>

      {/* Indicadores de páginas del carrusel */}
      <div style={{ position: 'absolute', bottom: '20px', right: '24px', zIndex: 3, display: 'flex', gap: '8px' }}>
        {destacados.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setIndiceActual(idx)}
            style={{
              width: idx === indiceActual ? '28px' : '10px',
              height: '10px',
              borderRadius: '5px',
              backgroundColor: idx === indiceActual ? '#38BDF8' : 'rgba(255,255,255,0.3)',
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