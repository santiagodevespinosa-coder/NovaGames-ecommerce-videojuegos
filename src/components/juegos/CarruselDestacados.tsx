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
    <div className="relative h-[400px] bg-bg-tarjeta rounded-2xl border border-borde overflow-hidden mb-10 shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex flex-col justify-end">
      {/* 🖼️ Imagen de portada de fondo con degradado cinematográfico */}
      {juegoActual.imagenUrl && (
        <div
          style={{ backgroundImage: `url(${juegoActual.imagenUrl})` }}
          className="absolute inset-0 w-full h-full bg-cover bg-center brightness-100 z-[1] transition-all duration-500 ease-in-out"
        />
      )}

      {/* Capa de sombreado lateral para legibilidad del texto */}
      <div className="absolute inset-0 w-full h-full z-[2] bg-[linear-gradient(90deg,#0d121f_0%,rgba(7,11,20,0.8)_50%,transparent_100%),linear-gradient(0deg,#070B14_0%,transparent_50%)]" />

      {/* Badge Destacado */}
      <div className="absolute top-5 left-6 z-[3] bg-primario text-bg-principal py-1.5 px-3.5 rounded-[30px] text-[11px] font-extrabold tracking-wider uppercase">
        ★ Tendencia Global
      </div>

      {/* Información del juego */}
      <div className="relative z-[3] p-9 max-w-[600px]">
        <h2 className="text-[38px] font-extrabold text-texto-principal m-0 mb-3 [text-shadow:0_2px_10px_rgba(0,0,0,0.8)]">
          {juegoActual.titulo}
        </h2>
        <p className="text-[15px] text-[#CBD5E1] m-0 mb-5 leading-normal [text-shadow:0_1px_5px_rgba(0,0,0,0.8)]">
          {juegoActual.descripcion}
        </p>
        <div className="flex items-center gap-5">
          <span className="text-[26px] font-extrabold text-primario [text-shadow:0_2px_8px_rgba(0,0,0,0.8)]">
            ${juegoActual.precio.toFixed(2)}
          </span>
          <button 
            onClick={() => navigate(`/juego/${juegoActual.id}`)}
            className="bg-primario text-bg-principal border-none py-3 px-7 rounded-[30px] font-bold text-sm cursor-pointer shadow-[0_4px_15px_rgba(56,189,248,0.4)] transition-transform duration-200 hover:scale-[1.02]"
          >
            Ver Detalles y Comprar
          </button>
        </div>
      </div>

      {/* Indicadores de páginas del carrusel */}
      <div className="absolute bottom-5 right-6 z-[3] flex gap-2">
        {destacados.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setIndiceActual(idx)}
            className={`h-2.5 rounded-[5px] border-none cursor-pointer transition-all duration-300 ${
              idx === indiceActual ? 'w-7 bg-primario' : 'w-2.5 bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};