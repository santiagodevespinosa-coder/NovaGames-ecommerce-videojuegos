// src/components/concept/Concept3DLauncherPage.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Juego } from '../../types';

interface Concept3DLauncherPageProps {
  juegos: Juego[];
}

export function Concept3DLauncherPage({ juegos }: Concept3DLauncherPageProps) {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

  const activeGame = juegos[activeIndex % juegos.length] ?? juegos[0];

  return (
    <div className="relative min-h-full overflow-hidden rounded-3xl bg-[#050814] p-7 text-white shadow-2xl">
      {/* 3D Perspective Floor Horizon Grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-72 overflow-hidden opacity-45"
        style={{ perspective: '500px' }}
      >
        <div
          className="h-full w-full origin-bottom"
          style={{
            transform: 'rotateX(68deg) scale(1.6)',
            backgroundImage:
              'linear-gradient(to right, rgba(56,189,248,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,189,248,0.35) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Volumetric Spatial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-96 w-[640px] -translate-x-1/2 rounded-full bg-sky-500/20 blur-[140px]"
      />

      {/* Top Spatial Console Header */}
      <header className="relative z-10 mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-sky-400/20 bg-slate-900/60 px-6 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 rounded-full bg-sky-400 shadow-[0_0_12px_#38BDF8]" />
          <span className="font-mono text-xs font-bold tracking-[0.25em] text-sky-300 uppercase">
            NOVA_SPATIAL_3D // LAUNCHER_OS
          </span>
        </div>

        <nav className="flex items-center gap-3 text-xs font-semibold">
          <Link
            to="/"
            className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-white/80 no-underline transition hover:border-sky-400 hover:text-white"
          >
            Tienda
          </Link>
          <Link
            to="/biblioteca"
            className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-white/80 no-underline transition hover:border-sky-400 hover:text-white"
          >
            Biblioteca
          </Link>
        </nav>
      </header>

      {/* 3D Tilted Hero Stage */}
      {activeGame && (
        <section
          className="relative z-10 mb-12 grid grid-cols-1 items-center gap-8 lg:grid-cols-12"
          style={{ perspective: '1200px' }}
        >
          {/* Left 3D Angled Media Deck */}
          <div
            className="relative transition-transform duration-500 hover:[transform:rotateY(0deg)_rotateX(0deg)] lg:col-span-7"
            style={{
              transform: 'rotateY(8deg) rotateX(3deg)',
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="relative overflow-hidden rounded-3xl border border-sky-400/35 bg-[#0B1224] p-2.5 shadow-[-20px_24px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(56,189,248,0.2)]">
              <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
                {activeGame.imagenUrl && (
                  <img
                    src={activeGame.imagenUrl}
                    alt={activeGame.titulo}
                    className="h-full w-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050814]/85 via-transparent to-transparent" />
                <div className="absolute right-5 bottom-4 left-5 flex items-end justify-between">
                  <div>
                    <span className="font-mono text-[10px] tracking-[0.25em] text-sky-300 uppercase">
                      DEPTH_LAYER // Z-AXIS
                    </span>
                    <h1 className="m-0 text-3xl font-black tracking-tight text-white uppercase">
                      {activeGame.titulo}
                    </h1>
                  </div>
                  <span className="rounded-xl border border-emerald-400/40 bg-emerald-500/20 px-3.5 py-1.5 font-mono text-sm font-black text-emerald-300 backdrop-blur-md">
                    ${activeGame.precio.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Floating 3D Control Panel */}
          <div
            className="flex flex-col justify-between rounded-3xl border border-white/15 bg-slate-900/70 p-7 backdrop-blur-xl shadow-[16px_20px_50px_rgba(0,0,0,0.7)] lg:col-span-5"
            style={{ transform: 'rotateY(-6deg) rotateX(2deg)' }}
          >
            <div>
              <span className="mb-3 inline-block rounded-full border border-sky-400/40 bg-sky-400/10 px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-sky-300 uppercase">
                SPATIAL_DECK_0{activeIndex + 1}
              </span>
              <p className="m-0 mb-6 text-sm leading-relaxed text-slate-300">
                {activeGame.descripcion}
              </p>

              <div className="mb-6 grid grid-cols-2 gap-3 font-mono text-xs">
                <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                  <span className="block text-[10px] text-slate-400">STOCK_UNITS</span>
                  <span className="text-lg font-black text-white">{activeGame.stock}</span>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                  <span className="block text-[10px] text-slate-400">RENDER_MODE</span>
                  <span className="text-lg font-black text-sky-400">3D_HUD</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate(`/juego/${activeGame.id}`)}
              className="w-full cursor-pointer rounded-2xl border-none bg-gradient-to-r from-sky-400 to-emerald-400 py-3.5 text-xs font-black tracking-widest text-slate-950 uppercase shadow-[0_10px_30px_rgba(56,189,248,0.4)] transition hover:scale-[1.02]"
            >
              Launch / Acquire License →
            </button>
          </div>
        </section>
      )}

      {/* 3D Perspective Card Shelf */}
      <section className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-3" style={{ perspective: '1200px' }}>
        {juegos.map((juego, idx) => {
          const isSelected = idx === activeIndex;
          const tilt = idx === 0 ? 'rotateY(7deg)' : idx === 2 ? 'rotateY(-7deg)' : 'rotateY(0deg)';

          return (
            <article
              key={juego.id}
              onClick={() => setActiveIndex(idx)}
              style={{ transform: isSelected ? 'translateZ(18px) scale(1.02)' : tilt }}
              className={`group flex h-[430px] cursor-pointer flex-col overflow-hidden rounded-3xl border bg-[#0B1224]/90 p-3.5 transition-all duration-500 hover:[transform:rotateY(0deg)_translateY(-8px)] ${
                isSelected
                  ? 'border-sky-400 shadow-[0_24px_55px_rgba(56,189,248,0.3)]'
                  : 'border-white/15 shadow-[0_20px_40px_rgba(0,0,0,0.75)] hover:border-sky-400/60'
              }`}
            >
              <div className="relative mb-4 h-[280px] overflow-hidden rounded-2xl">
                {juego.imagenUrl && (
                  <img
                    src={juego.imagenUrl}
                    alt={juego.titulo}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <span className="absolute top-3 right-3 rounded-xl bg-black/75 px-3 py-1 font-mono text-xs font-bold text-sky-300 backdrop-blur-md">
                  ${juego.precio.toFixed(2)}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between px-1">
                <div>
                  <h3 className="m-0 truncate text-lg font-black text-white uppercase">
                    {juego.titulo}
                  </h3>
                  <p className="m-0 mt-1 line-clamp-2 text-xs text-slate-400">
                    {juego.descripcion}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 text-xs">
                  <span className="font-mono text-emerald-400">STOCK: {juego.stock}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/juego/${juego.id}`);
                    }}
                    className="cursor-pointer rounded-full border border-sky-400/40 bg-sky-400/15 px-3.5 py-1 text-[11px] font-bold text-sky-300 transition hover:bg-sky-400 hover:text-slate-950"
                  >
                    Abrir
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
