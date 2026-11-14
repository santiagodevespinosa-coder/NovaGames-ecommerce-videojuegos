// src/components/concept/ConceptBladesPage.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Juego } from '../../types';

interface ConceptBladesPageProps {
  juegos: Juego[];
}

interface BladeConfig {
  heightClass: string;
  clipPath: string;
  glow: string;
}

const BLADE_LAYOUTS: BladeConfig[] = [
  {
    heightClass: 'h-[390px]',
    clipPath: 'polygon(0 10%, 100% 0, 100% 100%, 0 100%)',
    glow: 'from-amber-400/30',
  },
  {
    heightClass: 'h-[450px]',
    clipPath: 'polygon(0 0, 100% 8%, 100% 100%, 0 100%)',
    glow: 'from-sky-400/30',
  },
  {
    heightClass: 'h-[410px]',
    clipPath: 'polygon(0 9%, 100% 0, 100% 100%, 0 100%)',
    glow: 'from-fuchsia-500/30',
  },
  {
    heightClass: 'h-[490px]',
    clipPath: 'polygon(0 0, 100% 7%, 100% 100%, 0 100%)',
    glow: 'from-emerald-400/30',
  },
  {
    heightClass: 'h-[520px]',
    clipPath: 'polygon(0 8%, 100% 0, 100% 100%, 0 100%)',
    glow: 'from-amber-300/35',
  },
  {
    heightClass: 'h-[440px]',
    clipPath: 'polygon(0 0, 100% 10%, 100% 100%, 0 100%)',
    glow: 'from-cyan-400/30',
  },
  {
    heightClass: 'h-[470px]',
    clipPath: 'polygon(0 9%, 100% 0, 100% 100%, 0 100%)',
    glow: 'from-rose-500/30',
  },
];

export function ConceptBladesPage({ juegos }: ConceptBladesPageProps) {
  const navigate = useNavigate();
  const [selectedSlot, setSelectedSlot] = useState(3);

  // Build 7 dramatic pillars by cycling through the catalog
  const pillars = BLADE_LAYOUTS.map((layout, idx) => ({
    slot: idx,
    layout,
    juego: juegos[idx % juegos.length],
  }));

  const activePillar = pillars[selectedSlot] ?? pillars[0];
  const activeGame = activePillar?.juego;

  return (
    <div className="relative flex min-h-full flex-col justify-between overflow-hidden rounded-2xl bg-[#09090C] p-6 text-white shadow-2xl">
      {/* Smoky Top Mist */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_at_top,rgba(148,163,184,0.16),transparent_70%)]"
      />

      {/* Minimal Top Bar */}
      <header className="relative z-10 mb-6 flex items-center justify-between">
        <div>
          <span className="font-mono text-[11px] tracking-[0.3em] text-amber-300/90 uppercase">
            NOVA // MONOLITH_GALLERY
          </span>
          <h1 className="m-0 text-xl font-black tracking-tight text-white uppercase">
            Blade Showcase
          </h1>
        </div>

        <div className="flex items-center gap-3 text-xs font-semibold">
          <Link
            to="/"
            className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-white/80 no-underline transition hover:border-amber-300/60 hover:text-white"
          >
            Tienda
          </Link>
          <Link
            to="/biblioteca"
            className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-white/80 no-underline transition hover:border-amber-300/60 hover:text-white"
          >
            Biblioteca
          </Link>
        </div>
      </header>

      {/* Main Angled-Top Blade Pillars Stage */}
      <section className="relative z-10 mx-auto w-full pt-4">
        <div className="flex items-end justify-center gap-3 sm:gap-4">
          {pillars.map(({ slot, layout, juego }) => {
            if (!juego) return null;
            const isSelected = slot === selectedSlot;

            return (
              <div
                key={slot}
                onClick={() => setSelectedSlot(slot)}
                className={`group relative cursor-pointer transition-all duration-500 ${
                  isSelected ? 'flex-[2] z-20' : 'flex-1 opacity-85 hover:opacity-100 hover:flex-[1.35]'
                }`}
              >
                {/* Blade Pillar */}
                <div
                  className={`relative w-full overflow-hidden bg-[#141418] transition-all duration-500 ${layout.heightClass}`}
                  style={{ clipPath: layout.clipPath }}
                >
                  {juego.imagenUrl && (
                    <img
                      src={juego.imagenUrl}
                      alt={juego.titulo}
                      className={`h-full w-full object-cover transition-transform duration-700 ${
                        isSelected ? 'scale-105 brightness-110' : 'brightness-90 group-hover:scale-105'
                      }`}
                    />
                  )}

                  {/* Top Edge Highlight */}
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${layout.glow} via-transparent to-black/80`}
                  />

                  {/* Index & Title Overlay */}
                  <div className="absolute inset-x-0 bottom-3 px-2.5 text-left">
                    <span className="block font-mono text-[10px] font-bold tracking-widest text-amber-300">
                      000{slot + 1}
                    </span>
                    <p
                      className={`m-0 truncate text-xs font-black tracking-wide text-white uppercase transition-opacity duration-300 ${
                        isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      {juego.titulo}
                    </p>
                  </div>
                </div>

                {/* Glossy Floor Reflection */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none relative mt-1 h-16 w-full overflow-hidden opacity-25 blur-[1px]"
                >
                  {juego.imagenUrl && (
                    <img
                      src={juego.imagenUrl}
                      alt=""
                      className="h-full w-full -scale-y-100 object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#09090C]" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Selected Blade Inspector Bar */}
      {activeGame && (
        <footer className="relative z-10 mt-2 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#121216]/90 px-6 py-4 backdrop-blur-md">
          <div className="max-w-xl">
            <div className="mb-1 flex items-center gap-2 font-mono text-[11px] text-amber-300">
              <span>PILLAR_000{selectedSlot + 1}</span>
              <span>//</span>
              <span>STOCK: {activeGame.stock}</span>
            </div>
            <h2 className="m-0 text-xl font-black tracking-tight text-white uppercase">
              {activeGame.titulo}
            </h2>
            <p className="m-0 mt-1 line-clamp-1 text-xs text-white/65">
              {activeGame.descripcion}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-2xl font-black text-amber-300">
              ${activeGame.precio.toFixed(2)}
            </span>
            <button
              onClick={() => navigate(`/juego/${activeGame.id}`)}
              className="cursor-pointer rounded-full border-none bg-amber-300 px-6 py-2.5 text-xs font-black tracking-wider text-black uppercase transition hover:bg-amber-200"
            >
              Inspect &amp; Buy →
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}
