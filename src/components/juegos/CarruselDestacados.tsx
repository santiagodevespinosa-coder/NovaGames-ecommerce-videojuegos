// src/components/juegos/CarruselDestacados.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPortraitImageUrl } from '../../utils/gameImages';
import { playClick } from '../../utils/novaAudio';
import { navigateWithTransition } from '../../utils/viewTransition';
import type { Juego } from '../../types';

interface CarruselProps {
  juegos: Juego[];
  onActiveGameChange?: (imagenUrl?: string) => void;
}

interface BladeStyle {
  heightClass: string;
  clipPath: string;
  glow: string;
}

const BLADE_STYLES: BladeStyle[] = [
  {
    heightClass: 'h-[230px] sm:h-[340px] lg:h-[380px]',
    clipPath: 'polygon(0 10%, 100% 0, 100% 100%, 0 100%)',
    glow: 'from-cyan-400/40',
  },
  {
    heightClass: 'h-[260px] sm:h-[375px] lg:h-[415px]',
    clipPath: 'polygon(0 0, 100% 8%, 100% 100%, 0 100%)',
    glow: 'from-blue-500/40',
  },
  {
    heightClass: 'h-[285px] sm:h-[405px] lg:h-[445px]',
    clipPath: 'polygon(0 7%, 100% 0, 100% 100%, 0 100%)',
    glow: 'from-purple-500/45',
  },
  {
    heightClass: 'h-[255px] sm:h-[365px] lg:h-[405px]',
    clipPath: 'polygon(0 0, 100% 9%, 100% 100%, 0 100%)',
    glow: 'from-sky-400/40',
  },
  {
    heightClass: 'h-[235px] sm:h-[345px] lg:h-[385px]',
    clipPath: 'polygon(0 9%, 100% 0, 100% 100%, 0 100%)',
    glow: 'from-fuchsia-500/40',
  },
];

export const CarruselDestacados: React.FC<CarruselProps> = ({
  juegos,
  onActiveGameChange,
}) => {
  const [indiceActual, setIndiceActual] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [spotlightPos, setSpotlightPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const navigate = useNavigate();

  const destacados = juegos.slice(0, 5);
  const indiceSeguro = destacados.length > 0 ? indiceActual % destacados.length : 0;
  const activeAuraUrl =
    hoveredIdx !== null
      ? destacados[hoveredIdx]?.imagenUrl
      : destacados[indiceSeguro]?.imagenUrl;

  useEffect(() => {
    onActiveGameChange?.(activeAuraUrl);
  }, [activeAuraUrl, onActiveGameChange]);

  useEffect(() => {
    return () => {
      onActiveGameChange?.(undefined);
    };
  }, [onActiveGameChange]);

  useEffect(() => {
    if (destacados.length <= 1 || hoveredIdx !== null) return;
    const intervalo = setInterval(() => {
      setIndiceActual((prev) => (prev + 1) % destacados.length);
    }, 6000);
    return () => clearInterval(intervalo);
  }, [destacados.length, hoveredIdx]);

  if (destacados.length === 0) return null;

  const juegoActual = destacados[indiceSeguro];

  const irAnterior = () => {
    playClick();
    setIndiceActual((prev) => (prev - 1 + destacados.length) % destacados.length);
  };

  const irSiguiente = () => {
    playClick();
    setIndiceActual((prev) => (prev + 1) % destacados.length);
  };

  return (
    <section className="relative -mx-4 sm:-mx-6 lg:-mx-10 -mt-4 sm:-mt-6 lg:-mt-10 mb-10 pt-6 sm:pt-8 pb-8 px-4 sm:px-6 lg:px-10 overflow-hidden">
      {/* Full-bleed ambient backdrop dissolving into page */}
      {juegoActual.imagenUrl && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-30 blur-3xl scale-110 bg-cover bg-center transition-all duration-700"
          style={{ backgroundImage: `url(${juegoActual.imagenUrl})` }}
        />
      )}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg-principal/20 via-bg-principal/45 to-bg-principal"
      />

      {/* Top Bar: Badge + Prev/Next */}
      <div className="relative z-10 flex items-center justify-between gap-3 mb-6">
        <div className="bg-primario text-bg-principal py-1.5 px-3.5 rounded-[30px] text-[11px] font-extrabold tracking-wider uppercase shadow-[0_0_20px_rgba(56,189,248,0.5)]">
          ★ Tendencia Global
        </div>

        {destacados.length > 1 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={irAnterior}
              aria-label="Juego destacado anterior"
              className="nova-btn-outline text-texto-principal w-9 h-9 rounded-full flex items-center justify-center text-lg cursor-pointer"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={irSiguiente}
              aria-label="Siguiente juego destacado"
              className="nova-btn-outline text-texto-principal w-9 h-9 rounded-full flex items-center justify-center text-lg cursor-pointer"
            >
              ›
            </button>
          </div>
        )}
      </div>

      {/* Edge-to-Edge Blade Pillars Stage */}
      <div className="relative z-10 flex items-end justify-center gap-2 sm:gap-3.5 lg:gap-4 pt-4 overflow-visible">
        {destacados.map((juego, idx) => {
          const style = BLADE_STYLES[idx % BLADE_STYLES.length];
          const isSelected = idx === indiceSeguro;
          const isHovered = idx === hoveredIdx;
          const isDimmed = hoveredIdx !== null && !isHovered;
          const portraitUrl = getPortraitImageUrl(juego.imagenUrl);

          return (
            <button
              key={juego.id}
              type="button"
              onClick={() => setIndiceActual(idx)}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setSpotlightPos({
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top,
                });
              }}
              className={`group relative text-left bg-transparent border-0 p-0 cursor-pointer transition-all duration-500 ${
                isHovered
                  ? 'flex-[2.6] z-30 -translate-y-4 drop-shadow-[0_26px_42px_rgba(56,189,248,0.45)]'
                  : isSelected
                    ? `flex-[2.6] z-20 -translate-y-3 sm:-translate-y-4 drop-shadow-[0_22px_35px_rgba(56,189,248,0.28)] ${
                        isDimmed ? 'opacity-45' : ''
                      }`
                    : `flex-1 ${
                        isDimmed
                          ? 'opacity-40 brightness-75'
                          : 'opacity-70 hover:opacity-100 hover:flex-[1.35] hover:-translate-y-1'
                      }`
              }`}
            >
              <div
                className={`relative w-full overflow-hidden bg-bg-tarjeta transition-all duration-500 ${style.heightClass}`}
                style={{ clipPath: style.clipPath }}
              >
                {portraitUrl ? (
                  <img
                    src={portraitUrl}
                    alt={juego.titulo}
                    className={`h-full w-full object-cover transition-transform duration-700 ${
                      isHovered
                        ? 'scale-110 brightness-125'
                        : isSelected
                          ? 'scale-105 brightness-110'
                          : 'brightness-75 group-hover:scale-105 group-hover:brightness-95'
                    }`}
                  />
                ) : (
                  <div className="h-full w-full bg-bg-superficie" />
                )}

                <div
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${style.glow} via-transparent to-black/90`}
                />

                {/* Overhead & cursor-following spotlight */}
                {isHovered && (
                  <>
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(186,230,253,0.45),rgba(56,189,248,0.12)_52%,transparent_80%)]"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background: `radial-gradient(240px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(56, 189, 248, 0.38), rgba(168, 85, 247, 0.14) 45%, transparent 75%)`,
                      }}
                    />
                  </>
                )}

                <div className="absolute inset-x-0 bottom-3 px-3">
                  <span
                    className={`block font-mono text-[10px] font-bold tracking-widest ${
                      isSelected ? 'text-primario' : 'text-white/60'
                    }`}
                  >
                    0{idx + 1}
                  </span>
                  <span className="hidden sm:block text-xs font-bold text-white truncate">
                    {juego.titulo}
                  </span>
                </div>
              </div>

              {/* Active bottom neon bar */}
              <div
                className={`mt-2 h-[3px] rounded-full transition-all duration-300 ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_12px_rgba(56,189,248,0.9)]'
                    : 'bg-white/10'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Floating Info & CTA Overlay */}
      <div className="relative z-20 mt-6 flex flex-col md:flex-row md:items-end justify-between gap-4 max-w-[1200px] mx-auto">
        <div className="max-w-[660px]">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-texto-principal m-0 mb-1.5 [text-shadow:0_4px_20px_rgba(0,0,0,0.8)]">
            {juegoActual.titulo}
          </h2>
          <p className="text-sm sm:text-[15px] text-[#CBD5E1] m-0 line-clamp-2 leading-relaxed">
            {juegoActual.descripcion}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 shrink-0">
          <span className="text-2xl sm:text-3xl font-extrabold text-primario">
            {juegoActual.precio === 0
              ? 'Gratis'
              : `$${juegoActual.precio.toFixed(2)}`}
          </span>
          <button
            type="button"
            onClick={() => {
              playClick();
              navigateWithTransition(navigate, `/juego/${juegoActual.id}`);
            }}
            className="nova-btn-primary text-white py-3 px-7 rounded-[30px] font-bold text-sm cursor-pointer"
          >
            Ver Detalles y Comprar
          </button>
        </div>
      </div>
    </section>
  );
};
