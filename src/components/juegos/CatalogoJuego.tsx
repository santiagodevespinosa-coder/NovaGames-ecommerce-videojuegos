// src/components/juegos/CatalogoJuegos.tsx
import React from 'react';
import { CartaJuego } from './CartaJuego';
import { CarruselDestacados } from './CarruselDestacados';
import type { Juego } from '../../types';

interface CatalogoJuegosProps {
  juegos: Juego[];      
  filtroBusqueda: string;
}

export const CatalogoJuegos: React.FC<CatalogoJuegosProps> = ({ juegos, filtroBusqueda }) => {
  // Filtrar juegos según el término de búsqueda ingresado
  const juegosFiltrados = juegos.filter(juego =>
    juego.titulo.toLowerCase().includes(filtroBusqueda.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* 🌟 Carrusel Superior de Juegos Destacados (Se oculta si hay búsqueda activa) */}
      {!filtroBusqueda && <CarruselDestacados juegos={juegos} />}

      {/* 🏷️ Título de la Sección */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ color: 'var(--texto-principal, #F8FAFC)', margin: 0, fontSize: '22px', fontWeight: '700' }}>
          {filtroBusqueda ? `Resultados para "${filtroBusqueda}"` : 'Catálogo Destacado'}
        </h2>
        <span style={{ color: 'var(--texto-secundario, #94A3B8)', fontSize: '13px', fontWeight: '600' }}>
          {juegosFiltrados.length} {juegosFiltrados.length === 1 ? 'juego encontrado' : 'juegos encontrados'}
        </span>
      </div>

      {/* 🎮 Grilla Fluida de Tarjetas tipo Póster */}
      {juegosFiltrados.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--texto-secundario, #94A3B8)' }}>
          <p style={{ fontSize: '16px' }}>No se encontraron videojuegos que coincidan con tu búsqueda.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '24px',
          paddingBottom: '40px'
        }}>
          {juegosFiltrados.map(juego => (
            <CartaJuego key={juego.id} juego={juego} />
          ))}
        </div>
      )}
    </div>
  );
};