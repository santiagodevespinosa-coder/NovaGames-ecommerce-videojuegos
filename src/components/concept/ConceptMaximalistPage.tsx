// src/components/concept/ConceptMaximalistPage.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Juego } from '../../types';

interface ConceptMaximalistPageProps {
  juegos: Juego[];
}

const TICKER_ITEMS = [
  '⚡ NOVA_ARCADE_OS v4.2',
  '★ CYBERPUNK 2077 // NIGHT CITY EDITION',
  '🔥 FLASH DROP: MINECRAFT INFINITE WORLDS',
  '⚔️ THE WITCHER 3: WILD HUNT — 98% POSITIVE',
  '🎮 ZERO DRM // INSTANT LIBRARY SYNC',
  '✦ COLLECTOR VAULT UNLOCKED',
];

const VIBE_TAGS = ['ALL_SYSTEMS', 'RPG_HEAVY', 'OPEN_WORLD', 'SANDBOX', 'TOP_RATED'] as const;

export function ConceptMaximalistPage({ juegos }: ConceptMaximalistPageProps) {
  const navigate = useNavigate();
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [activeVibe, setActiveVibe] = useState<(typeof VIBE_TAGS)[number]>('ALL_SYSTEMS');

  const featuredGame = juegos[featuredIndex % juegos.length] ?? juegos[0];

  const filteredGames = juegos.filter((juego) => {
    if (activeVibe === 'ALL_SYSTEMS') return true;
    if (activeVibe === 'SANDBOX') return juego.titulo.toLowerCase().includes('minecraft');
    if (activeVibe === 'RPG_HEAVY') return juego.categoriaId === 1;
    if (activeVibe === 'OPEN_WORLD') return juego.descripcion.toLowerCase().includes('mundo abierto');
    if (activeVibe === 'TOP_RATED') return juego.precio >= 35;
    return true;
  });

  return (
    <div className="relative min-h-full overflow-hidden rounded-3xl border-2 border-primario/40 bg-bg-principal p-6 text-texto-principal shadow-[0_0_60px_rgba(56,189,248,0.15)]">
      {/* Layered Maximalist Background: Cyber Grid + Glowing Aura Orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            'linear-gradient(to right, #23324A 1px, transparent 1px), linear-gradient(to bottom, #23324A 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primario/20 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-exito/20 blur-[110px]"
      />

      {/* Top Concept Banner & Ticker */}
      <div className="relative z-10 mb-6 flex flex-wrap items-center justify-between gap-4 border-b-2 border-borde pb-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-none border-2 border-primario bg-primario px-3 py-1 font-mono text-xs font-black uppercase tracking-widest text-bg-principal shadow-[4px_4px_0px_#10B981]">
            CONCEPT_LAB // MAXIMALISM
          </span>
          <span className="font-mono text-xs text-texto-secundario">
            PALETTE_LOCK: <strong className="text-primario">#070B14</strong> /{' '}
            <strong className="text-primario">#38BDF8</strong> /{' '}
            <strong className="text-exito">#10B981</strong>
          </span>
        </div>

        <Link
          to="/"
          className="border border-borde bg-bg-tarjeta px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-texto-principal no-underline transition hover:border-primario hover:text-primario"
        >
          ← Exit to Original Store
        </Link>
      </div>

      {/* Infinite Scrolling Marquee */}
      <div className="relative z-10 mb-8 overflow-hidden border-y-2 border-primario/50 bg-bg-superficie py-2.5">
        <div className="animate-nova-marquee gap-10 font-mono text-xs font-black uppercase tracking-[0.2em] text-primario">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="flex items-center gap-3 whitespace-nowrap">
              <span className="inline-block h-2 w-2 rotate-45 bg-exito" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Hero Bento Grid: Oversized Showcase + Stacked Telemetry Widgets */}
      {featuredGame && (
        <section className="relative z-10 mb-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left 8 Columns: Maximalist Hero Stage */}
          <div className="group relative flex min-h-[430px] flex-col justify-between overflow-hidden rounded-2xl border-2 border-primario bg-bg-tarjeta p-8 shadow-[8px_8px_0px_#23324A] lg:col-span-8">
            {featuredGame.imagenUrl && (
              <div
                style={{ backgroundImage: `url(${featuredGame.imagenUrl})` }}
                className="absolute inset-0 bg-cover bg-center opacity-55 transition-transform duration-700 group-hover:scale-105"
              />
            )}
            <div className="absolute inset-0 bg-[linear-gradient(115deg,#070B14_15%,rgba(7,11,20,0.82)_55%,rgba(16,185,129,0.18)_100%)]" />

            {/* HUD Corner Brackets */}
            <span className="pointer-events-none absolute top-3 left-3 h-5 w-5 border-t-2 border-l-2 border-primario" />
            <span className="pointer-events-none absolute top-3 right-3 h-5 w-5 border-t-2 border-r-2 border-exito" />
            <span className="pointer-events-none absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-exito" />
            <span className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-primario" />

            {/* Top HUD Row */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="bg-exito px-3 py-1 font-mono text-[11px] font-black uppercase tracking-widest text-bg-principal">
                  ★ FEATURED_DROP_0{featuredIndex + 1}
                </span>
                <span className="border border-primario/60 bg-bg-principal/80 px-2.5 py-1 font-mono text-[11px] text-primario">
                  STOCK: {featuredGame.stock} UNITS
                </span>
              </div>

              <div className="flex gap-1.5">
                {juegos.map((g, idx) => (
                  <button
                    key={g.id}
                    onClick={() => setFeaturedIndex(idx)}
                    className={`cursor-pointer border px-2.5 py-1 font-mono text-[11px] font-bold transition ${
                      idx === featuredIndex
                        ? 'border-primario bg-primario text-bg-principal'
                        : 'border-borde bg-bg-principal/70 text-texto-secundario hover:border-primario'
                    }`}
                  >
                    0{idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Hero Typography */}
            <div className="relative z-10 mt-12 max-w-2xl">
              <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[0.25em] text-exito">
                // HYPER-CURATED DIGITAL EDITION
              </p>
              <h1 className="m-0 mb-3 text-4xl font-black uppercase leading-[0.95] tracking-tight text-texto-principal drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] sm:text-5xl">
                {featuredGame.titulo}
              </h1>
              <p className="m-0 mb-6 max-w-xl text-sm leading-relaxed text-texto-secundario">
                {featuredGame.descripcion}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <div className="border-2 border-primario bg-bg-principal/90 px-4 py-2 font-mono">
                  <span className="block text-[10px] uppercase text-texto-secundario">
                    CREDITS_REQ
                  </span>
                  <span className="text-2xl font-black text-primario">
                    ${featuredGame.precio.toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => navigate(`/juego/${featuredGame.id}`)}
                  className="cursor-pointer border-2 border-exito bg-exito px-7 py-3.5 font-mono text-sm font-black uppercase tracking-wider text-bg-principal shadow-[5px_5px_0px_#38BDF8] transition hover:-translate-x-0.5 hover:-translate-y-0.5"
                >
                  JACK IN &amp; BUY →
                </button>
              </div>
            </div>
          </div>

          {/* Right 4 Columns: Stacked Maximalist Bento Widgets */}
          <div className="flex flex-col gap-5 lg:col-span-4">
            {/* Widget 1: Arcade Telemetry */}
            <div className="relative overflow-hidden rounded-2xl border-2 border-borde bg-bg-superficie p-5 shadow-[6px_6px_0px_#151F33]">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-xs font-black uppercase tracking-widest text-primario">
                  SYS_TELEMETRY
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] text-exito">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-exito" />
                  LIVE
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 font-mono">
                <div className="border border-borde bg-bg-principal p-3">
                  <span className="block text-[10px] text-texto-secundario">CATALOG_SIZE</span>
                  <span className="text-2xl font-black text-texto-principal">{juegos.length}</span>
                </div>
                <div className="border border-borde bg-bg-principal p-3">
                  <span className="block text-[10px] text-texto-secundario">TOTAL_STOCK</span>
                  <span className="text-2xl font-black text-exito">
                    {juegos.reduce((acc, j) => acc + j.stock, 0)}
                  </span>
                </div>
              </div>
            </div>

            {/* Widget 2: Collector's Vault Highlight */}
            <div className="relative flex-1 overflow-hidden rounded-2xl border-2 border-exito/60 bg-bg-tarjeta p-5 shadow-[6px_6px_0px_#10B981]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 -bottom-6 font-mono text-7xl font-black text-exito/10 select-none"
              >
                NOVA
              </div>
              <span className="mb-2 inline-block bg-primario/15 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-widest text-primario">
                COLLECTOR_PERK
              </span>
              <h2 className="m-0 mb-2 text-xl font-black uppercase tracking-tight text-texto-principal">
                MAXIMALIST HUD MODE
              </h2>
              <p className="m-0 mb-4 text-xs leading-relaxed text-texto-secundario">
                High-density bento layout, neon brutalist shadows, and live telemetry badges —
                built strictly on your existing NovaGames color tokens.
              </p>
              <div className="flex flex-wrap gap-2 font-mono text-[10px] font-bold">
                <span className="border border-primario/40 bg-bg-principal px-2 py-1 text-primario">
                  #HARD_SHADOWS
                </span>
                <span className="border border-exito/40 bg-bg-principal px-2 py-1 text-exito">
                  #CYBER_GRID
                </span>
                <span className="border border-borde bg-bg-principal px-2 py-1 text-texto-principal">
                  #ZERO_DRIFT
                </span>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Interactive Vibe Filter Bar */}
      <section className="relative z-10 mb-8 flex flex-wrap items-center justify-between gap-4 border-y-2 border-borde bg-bg-superficie/80 px-5 py-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 font-mono text-xs font-black uppercase tracking-widest text-texto-secundario">
            FILTER_MATRIX:
          </span>
          {VIBE_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveVibe(tag)}
              className={`cursor-pointer border px-3.5 py-1.5 font-mono text-xs font-bold uppercase transition ${
                activeVibe === tag
                  ? 'border-primario bg-primario text-bg-principal shadow-[3px_3px_0px_#10B981]'
                  : 'border-borde bg-bg-tarjeta text-texto-secundario hover:border-primario hover:text-texto-principal'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <span className="font-mono text-xs font-bold text-exito">
          [{filteredGames.length}_MATCHES_FOUND]
        </span>
      </section>

      {/* Maximalist Game Cards Grid */}
      <section className="relative z-10 grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
        {filteredGames.map((juego, idx) => (
          <article
            key={juego.id}
            onClick={() => navigate(`/juego/${juego.id}`)}
            className="group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border-2 border-borde bg-bg-tarjeta shadow-[7px_7px_0px_#0E1626] transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:border-primario hover:shadow-[9px_9px_0px_#38BDF8]"
          >
            {/* Card Header Strip */}
            <div className="flex items-center justify-between border-b border-borde bg-bg-superficie px-4 py-2 font-mono text-[11px]">
              <span className="font-black text-primario">ID_00{juego.id}</span>
              <span className="text-texto-secundario">CAT // 0{juego.categoriaId}</span>
              <span className="font-bold text-exito">● IN_STOCK ({juego.stock})</span>
            </div>

            {/* Artwork + Overlapping Price Tag */}
            <div className="relative h-56 w-full overflow-hidden bg-bg-principal">
              {juego.imagenUrl ? (
                <img
                  src={juego.imagenUrl}
                  alt={juego.titulo}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="flex h-full items-center justify-center font-mono text-xs text-texto-secundario">
                  NO_SIGNAL
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-bg-tarjeta via-transparent to-transparent" />

              {/* Tilted Price Stamp */}
              <div className="absolute right-3 bottom-3 -rotate-2 border-2 border-bg-principal bg-exito px-3.5 py-1 font-mono text-lg font-black text-bg-principal shadow-[4px_4px_0px_#070B14]">
                ${juego.precio.toFixed(2)}
              </div>

              <span className="absolute top-3 left-3 border border-primario/60 bg-bg-principal/85 px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-primario">
                DROP #{idx + 1}
              </span>
            </div>

            {/* Card Body */}
            <div className="flex flex-1 flex-col justify-between p-5">
              <div>
                <h3 className="m-0 mb-2 text-xl font-black uppercase tracking-tight text-texto-principal group-hover:text-primario">
                  {juego.titulo}
                </h3>
                <p className="m-0 mb-4 line-clamp-2 text-xs leading-relaxed text-texto-secundario">
                  {juego.descripcion}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-borde pt-3 font-mono text-xs">
                <span className="text-texto-secundario">DEV_ID: #{juego.desarrolladorId}</span>
                <span className="font-black text-primario group-hover:underline">
                  OPEN_DOSSIER →
                </span>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
