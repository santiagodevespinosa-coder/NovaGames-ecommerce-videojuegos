// src/components/juegos/CartaJuego.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPortraitImageUrl } from '../../utils/gameImages';
import { playClick, playHoverTick } from '../../utils/novaAudio';
import { navigateWithTransition } from '../../utils/viewTransition';
import type { Juego } from '../../types';

interface CartaJuegoProps {
  juego: Juego;
  enBiblioteca?: boolean;
}

export const CartaJuego: React.FC<CartaJuegoProps> = ({
  juego,
  enBiblioteca = false,
}) => {
  const navigate = useNavigate();
  const portraitUrl = getPortraitImageUrl(juego.imagenUrl);
  const [tilt, setTilt] = useState({
    rx: 0,
    ry: 0,
    gx: 50,
    gy: 50,
    active: false,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: (0.5 - py) * 14,
      ry: (px - 0.5) * 14,
      gx: px * 100,
      gy: py * 100,
      active: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 50, active: false });
  };

  return (
    <div
      onClick={() => {
        playClick();
        navigateWithTransition(navigate, `/juego/${juego.id}`);
      }}
      onMouseEnter={() => playHoverTick()}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: tilt.active
          ? `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateY(-8px)`
          : 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px)',
        transformStyle: 'preserve-3d',
      }}
      className="group relative h-[440px] cursor-pointer transition-transform duration-200 ease-out will-change-transform"
    >
      {/* External Ambient Aura Bleed (unclipped) */}
      {portraitUrl && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-3 -z-10 rounded-2xl bg-cover bg-center blur-2xl opacity-0 group-hover:opacity-65 transition-opacity duration-500 scale-105"
          style={{ backgroundImage: `url(${portraitUrl})` }}
        />
      )}

      {/* Full-Bleed Chamfered Poster */}
      <div className="nova-blade-chamfer relative w-full h-full overflow-hidden bg-bg-tarjeta border border-primario/20 group-hover:border-primario/70 shadow-[0_14px_30px_rgba(0,0,0,0.65)] group-hover:shadow-[0_24px_45px_rgba(56,189,248,0.3)] transition-all duration-300">
        {portraitUrl ? (
          <img
            src={portraitUrl}
            alt={juego.titulo}
            style={{ viewTransitionName: `game-cover-${juego.id}` }}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#64748B] text-[13px]">
            Sin imagen
          </div>
        )}

        {/* Holographic prismatic foil + scanlines */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 mix-blend-color-dodge transition-opacity duration-300 z-[2]"
          style={{
            opacity: tilt.active ? 0.58 : 0,
            background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(56, 189, 248, 0.78), rgba(168, 85, 247, 0.45) 35%, rgba(16, 185, 129, 0.25) 60%, transparent 80%)`,
          }}
        />
        <div
          aria-hidden="true"
          className="nova-holo-scanlines pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-55 transition-opacity duration-300 z-[2]"
        />

        {/* Deep scrim fading artwork smoothly into floating title */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/35 to-transparent opacity-95 z-[2]" />

        {/* Top Badges */}
        {enBiblioteca && (
          <span
            style={{ transform: tilt.active ? 'translateZ(24px)' : 'translateZ(0px)' }}
            className="absolute top-3 left-3 bg-exito/90 backdrop-blur-sm text-white py-1 px-2.5 rounded-md text-[11px] font-bold shadow-[0_0_12px_rgba(16,185,129,0.5)] z-[3] transition-transform duration-200"
          >
            ✓ En Biblioteca
          </span>
        )}

        <div
          style={{ transform: tilt.active ? 'translateZ(24px)' : 'translateZ(0px)' }}
          className="absolute top-3 right-3 flex items-center gap-1.5 z-[3] transition-transform duration-200"
        >
          {(juego.descuentoPorcentaje ?? 0) > 0 && (
            <span className="bg-exito text-bg-principal py-1 px-2 rounded-md text-[11px] font-black shadow-[0_0_12px_rgba(16,185,129,0.5)]">
              -{juego.descuentoPorcentaje}%
            </span>
          )}
          <span className="bg-[#070B14]/85 backdrop-blur-sm text-primario py-1 px-2.5 rounded-md text-xs font-extrabold border border-primario/40 flex items-center gap-1.5">
            {(juego.descuentoPorcentaje ?? 0) > 0 && juego.precioBase !== undefined && (
              <span className="text-[10px] text-texto-secundario line-through font-normal">
                ${juego.precioBase.toFixed(2)}
              </span>
            )}
            <span>
              {juego.precio === 0 ? 'Gratis' : `$${juego.precio.toFixed(2)}`}
            </span>
          </span>
        </div>

        {/* Floating Bottom Title & Genres */}
        <div
          style={{ transform: tilt.active ? 'translateZ(28px)' : 'translateZ(0px)' }}
          className="absolute inset-x-0 bottom-0 p-4 flex flex-col gap-2 z-[3] transition-transform duration-200"
        >
          <h3 className="m-0 text-base font-extrabold text-white leading-snug line-clamp-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] group-hover:text-primario transition-colors">
            {juego.titulo}
          </h3>
          {juego.generos && juego.generos.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {juego.generos.slice(0, 2).map((g) => (
                <span
                  key={g.idGenero}
                  className="text-[10px] font-bold uppercase tracking-wider text-primario/90 bg-[#070B14]/75 backdrop-blur-sm border border-primario/30 px-2 py-0.5 rounded"
                >
                  {g.nombre}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
