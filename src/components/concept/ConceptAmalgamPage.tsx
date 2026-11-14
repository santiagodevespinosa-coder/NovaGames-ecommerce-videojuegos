// src/components/concept/ConceptAmalgamPage.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Juego } from '../../types';

interface ConceptAmalgamPageProps {
  juegos: Juego[];
}

type AmalgamMode = 'RISO_ZINE' | 'BLUEPRINT_DADA' | 'ACID_BRUTAL';

export function ConceptAmalgamPage({ juegos }: ConceptAmalgamPageProps) {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [mode, setMode] = useState<AmalgamMode>('RISO_ZINE');

  const featured = juegos[activeIndex % juegos.length] ?? juegos[0];

  const theme = {
    RISO_ZINE: {
      canvas: 'bg-[#F4EFE6] text-[#0A0A0C]',
      accentBg: 'bg-[#FF2E7E] text-white',
      secondaryBg: 'bg-[#D9FF00] text-[#0A0A0C]',
      border: 'border-[#0A0A0C]',
      cardBg: 'bg-white',
      pattern: 'radial-gradient(#0A0A0C 1px, transparent 1px)',
    },
    BLUEPRINT_DADA: {
      canvas: 'bg-[#0C1B4D] text-[#F4EFE6]',
      accentBg: 'bg-[#D9FF00] text-[#0A0A0C]',
      secondaryBg: 'bg-[#FF2E7E] text-white',
      border: 'border-[#7AA2FF]',
      cardBg: 'bg-[#12266B]',
      pattern:
        'linear-gradient(to right, rgba(122,162,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(122,162,255,0.2) 1px, transparent 1px)',
    },
    ACID_BRUTAL: {
      canvas: 'bg-[#0A0A0C] text-[#D9FF00]',
      accentBg: 'bg-[#D9FF00] text-[#0A0A0C]',
      secondaryBg: 'bg-[#1E3BFF] text-white',
      border: 'border-[#D9FF00]',
      cardBg: 'bg-[#16161B]',
      pattern:
        'repeating-linear-gradient(45deg, rgba(217,255,0,0.06) 0px, rgba(217,255,0,0.06) 2px, transparent 2px, transparent 14px)',
    },
  }[mode];

  return (
    <div
      className={`relative min-h-full overflow-hidden border-4 ${theme.border} ${theme.canvas} transition-colors duration-300`}
    >
      {/* Underlying Art-Movement Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage: theme.pattern,
          backgroundSize: mode === 'RISO_ZINE' ? '14px 14px' : '28px 28px',
        }}
      />

      <div className="relative z-10 flex min-h-full">
        {/* Vertical Zine Spine (Left Margin) */}
        <aside
          className={`hidden w-14 shrink-0 flex-col items-center justify-between border-r-4 ${theme.border} py-6 sm:flex`}
        >
          <span className="font-mono text-xs font-black tracking-widest uppercase [writing-mode:vertical-rl] rotate-180">
            NOVA_LAUNCHER // AMALGAM_VOL.99
          </span>
          <div className="flex flex-col items-center gap-2 font-mono text-[10px] font-black">
            <span className={`px-1.5 py-0.5 ${theme.accentBg}`}>ODD</span>
            <span>0{activeIndex + 1}</span>
          </div>
        </aside>

        {/* Main Collage Workspace */}
        <div className="flex-1 p-6 sm:p-8">
          {/* Top Amalgamation Control Strip */}
          <header
            className={`mb-8 flex flex-wrap items-center justify-between gap-4 border-b-4 ${theme.border} pb-4`}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 font-mono text-xs font-black uppercase ${theme.accentBg}`}>
                WEIRD_LAUNCHER_CONCEPT
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(['RISO_ZINE', 'BLUEPRINT_DADA', 'ACID_BRUTAL'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={`cursor-pointer border-2 ${theme.border} px-2.5 py-1 font-mono text-[11px] font-black uppercase transition ${
                      mode === m ? theme.secondaryBg : 'bg-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs font-black">
              <Link to="/" className="underline">
                [STORE]
              </Link>
              <Link to="/biblioteca" className="underline">
                [LIBRARY]
              </Link>
            </div>
          </header>

          {/* Clipped-Polygon Surrealist Hero Stage */}
          {featured && (
            <section className="mb-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12">
              {/* Left 7 Cols: Angled Cutout Collage Frame */}
              <div
                className={`relative min-h-[380px] border-4 ${theme.border} ${theme.cardBg} p-6 lg:col-span-7`}
              >
                {/* Giant Overlapping Watermark Number */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-6 -right-3 z-20 font-mono text-8xl font-black opacity-20 select-none"
                >
                  0{activeIndex + 1}
                </span>

                {/* Clipped Diagonal Artwork */}
                <div
                  className="relative mb-5 h-60 w-full overflow-hidden border-2 border-current"
                  style={{ clipPath: 'polygon(0 0, 100% 4%, 97% 100%, 2% 95%)' }}
                >
                  {featured.imagenUrl && (
                    <img
                      src={featured.imagenUrl}
                      alt={featured.titulo}
                      className="h-full w-full object-cover contrast-125 saturate-150"
                    />
                  )}
                  {/* Floating Sticker Tag */}
                  <div
                    className={`absolute top-4 left-4 -rotate-3 border-2 ${theme.border} ${theme.secondaryBg} px-3 py-1 font-mono text-xs font-black uppercase`}
                  >
                    ★ ARTIFACT_READY
                  </div>
                </div>

                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <h1 className="m-0 text-3xl font-black tracking-tight uppercase sm:text-4xl">
                      {featured.titulo}
                    </h1>
                    <p className="m-0 mt-1 max-w-md text-xs font-medium opacity-80">
                      {featured.descripcion}
                    </p>
                  </div>

                  <button
                    onClick={() => navigate(`/juego/${featured.id}`)}
                    className={`cursor-pointer border-2 ${theme.border} ${theme.accentBg} px-6 py-3 font-mono text-xs font-black uppercase tracking-wider shadow-[5px_5px_0px_currentColor] transition hover:-translate-x-0.5 hover:-translate-y-0.5`}
                  >
                    LAUNCH // ${featured.precio.toFixed(2)}
                  </button>
                </div>
              </div>

              {/* Right 5 Cols: Stacked Dadaist Cassette Queue + Surreal Stamp */}
              <div className="flex flex-col justify-between gap-4 lg:col-span-5">
                <div className={`border-4 ${theme.border} ${theme.cardBg} p-5`}>
                  <div className="mb-3 flex items-center justify-between font-mono text-xs font-black uppercase">
                    <span>TAPE_DECK // SELECTOR</span>
                    <span className={`px-2 py-0.5 ${theme.secondaryBg}`}>
                      {juegos.length} TAPES
                    </span>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    {juegos.map((juego, idx) => {
                      const isActive = idx === activeIndex;
                      return (
                        <div
                          key={juego.id}
                          onClick={() => setActiveIndex(idx)}
                          className={`flex cursor-pointer items-center justify-between border-2 ${theme.border} p-3 transition ${
                            isActive
                              ? `${theme.accentBg} -translate-x-1`
                              : 'hover:translate-x-1'
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className="font-mono text-xs font-black">0{idx + 1}</span>
                            <span className="truncate text-sm font-black uppercase">
                              {juego.titulo}
                            </span>
                          </div>
                          <span className="font-mono text-xs font-black">
                            ${juego.precio.toFixed(2)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Surreal Launcher Disk / Defrag Block */}
                <div className={`border-4 ${theme.border} ${theme.cardBg} p-5 font-mono`}>
                  <div className="mb-2 flex justify-between text-[11px] font-black uppercase">
                    <span>SECTOR_DEFRAG_VISUALIZER</span>
                    <span>99.1% WEIRD</span>
                  </div>
                  <div className="grid grid-cols-10 gap-1">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <span
                        key={i}
                        className={`h-3 border ${theme.border} ${
                          i < 13 ? theme.accentBg : i < 17 ? theme.secondaryBg : 'opacity-25'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Bottom Asymmetric Collage Cards */}
          <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {juegos.map((juego, idx) => (
              <article
                key={juego.id}
                onClick={() => navigate(`/juego/${juego.id}`)}
                className={`group relative cursor-pointer border-4 ${theme.border} ${theme.cardBg} p-4 shadow-[6px_6px_0px_currentColor] transition hover:-translate-y-1`}
              >
                <div className="mb-3 flex items-center justify-between font-mono text-[11px] font-black uppercase">
                  <span>SPECIMEN_0{idx + 1}</span>
                  <span className={`px-2 py-0.5 ${theme.secondaryBg}`}>
                    STOCK:{juego.stock}
                  </span>
                </div>

                <div className="relative mb-3 h-40 overflow-hidden border-2 border-current">
                  {juego.imagenUrl && (
                    <img
                      src={juego.imagenUrl}
                      alt={juego.titulo}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="m-0 truncate text-base font-black uppercase">{juego.titulo}</h3>
                  <span className="font-mono text-sm font-black">${juego.precio.toFixed(2)}</span>
                </div>
              </article>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
