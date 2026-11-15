// src/components/juegos/CatalogoJuegos.tsx
import React, { useState } from 'react';
import { CartaJuego } from './CartaJuego';
import { CarruselDestacados } from './CarruselDestacados';
import storeIcon from '../../assets/store.webp';
import type { Genero, Juego } from '../../types';

interface CatalogoJuegosProps {
  juegos: Juego[];
  generos?: Genero[];
  filtroBusqueda: string;
  cargando?: boolean;
  juegosEnBiblioteca?: number[];
}

export const CatalogoJuegos: React.FC<CatalogoJuegosProps> = ({
  juegos,
  generos = [],
  filtroBusqueda,
  cargando = false,
  juegosEnBiblioteca = [],
}) => {
  const [generoSeleccionado, setGeneroSeleccionado] = useState<number | null>(null);

  const juegosFiltrados = juegos.filter((juego) => {
    const coincideTitulo = juego.titulo
      .toLowerCase()
      .includes(filtroBusqueda.toLowerCase());
    const coincideGenero =
      generoSeleccionado === null ||
      Boolean(juego.generos?.some((g) => g.idGenero === generoSeleccionado));
    return coincideTitulo && coincideGenero;
  });

  const generoActivo = generos.find((g) => g.idGenero === generoSeleccionado);

  return (
    <>
      {/* 🌟 Blade Pillars Full-Bleed Destacados (Se oculta si hay búsqueda o filtro activo) */}
      {!filtroBusqueda && generoSeleccionado === null && (
        <CarruselDestacados juegos={juegos} />
      )}

      <div className="max-w-[1200px] mx-auto">

      {/* 🎯 Filtro por Género */}
      {generos.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <button
            type="button"
            onClick={() => setGeneroSeleccionado(null)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold border cursor-pointer transition-colors ${
              generoSeleccionado === null
                ? 'bg-primario text-bg-principal border-primario'
                : 'bg-bg-tarjeta text-texto-secundario border-borde hover:text-texto-principal'
            }`}
          >
            Todos
          </button>
          {generos.map((genero) => {
            const activo = generoSeleccionado === genero.idGenero;
            return (
              <button
                key={genero.idGenero}
                type="button"
                onClick={() =>
                  setGeneroSeleccionado(activo ? null : genero.idGenero)
                }
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold border cursor-pointer transition-colors ${
                  activo
                    ? 'bg-primario text-bg-principal border-primario'
                    : 'bg-bg-tarjeta text-texto-secundario border-borde hover:text-texto-principal'
                }`}
              >
                {genero.nombre}
              </button>
            );
          })}
        </div>
      )}

      {/* 🏷️ Título de la Sección */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <img
            src={storeIcon}
            alt="Tienda"
            className="w-9 h-9 object-contain shrink-0 drop-shadow-[0_0_10px_rgba(56,189,248,0.35)]"
          />
          <h2 className="text-texto-principal m-0 text-[22px] font-bold">
            {filtroBusqueda
              ? `Resultados para "${filtroBusqueda}"`
              : generoActivo
                ? `Género: ${generoActivo.nombre}`
                : 'Catálogo Destacado'}
          </h2>
        </div>
        <span className="text-texto-secundario text-[13px] font-semibold">
          {juegosFiltrados.length}{' '}
          {juegosFiltrados.length === 1 ? 'juego encontrado' : 'juegos encontrados'}
        </span>
      </div>

      {/* 🎮 Grilla Fluida de Tarjetas tipo Póster */}
      {cargando ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-7 pb-10">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="h-[440px] rounded-[14px] bg-bg-tarjeta border border-borde overflow-hidden animate-pulse flex flex-col"
            >
              <div className="h-[335px] bg-bg-superficie" />
              <div className="p-4 flex-1 flex flex-col justify-center gap-2">
                <div className="h-4 w-3/4 rounded bg-bg-superficie" />
                <div className="h-3 w-1/3 rounded bg-bg-superficie" />
              </div>
            </div>
          ))}
        </div>
      ) : juegosFiltrados.length === 0 ? (
        <div className="text-center p-[60px] text-texto-secundario">
          <p className="text-base">
            No se encontraron videojuegos que coincidan con tu búsqueda.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-7 pb-10">
          {juegosFiltrados.map((juego) => (
            <CartaJuego
              key={juego.id}
              juego={juego}
              enBiblioteca={juegosEnBiblioteca.includes(juego.id)}
            />
          ))}
        </div>
      )}
      </div>
    </>
  );
};