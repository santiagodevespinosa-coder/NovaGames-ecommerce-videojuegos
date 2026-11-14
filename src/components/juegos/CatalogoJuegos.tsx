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
    <div className="max-w-[1200px] mx-auto">
      
      {/* 🌟 Carrusel Superior de Juegos Destacados (Se oculta si hay búsqueda activa) */}
      {!filtroBusqueda && <CarruselDestacados juegos={juegos} />}

      {/* 🏷️ Título de la Sección */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-texto-principal m-0 text-[22px] font-bold">
          {filtroBusqueda ? `Resultados para "${filtroBusqueda}"` : 'Catálogo Destacado'}
        </h2>
        <span className="text-texto-secundario text-[13px] font-semibold">
          {juegosFiltrados.length} {juegosFiltrados.length === 1 ? 'juego encontrado' : 'juegos encontrados'}
        </span>
      </div>

      {/* 🎮 Grilla Fluida de Tarjetas tipo Póster */}
      {juegosFiltrados.length === 0 ? (
        <div className="text-center p-[60px] text-texto-secundario">
          <p className="text-base">No se encontraron videojuegos que coincidan con tu búsqueda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-7 pb-10">
          {juegosFiltrados.map(juego => (
            <CartaJuego key={juego.id} juego={juego} />
          ))}
        </div>
      )}
    </div>
  );
};