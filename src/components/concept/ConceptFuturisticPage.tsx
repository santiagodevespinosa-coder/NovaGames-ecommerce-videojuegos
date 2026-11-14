// src/components/concept/ConceptFuturisticPage.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Juego } from '../../types';

interface ConceptFuturisticPageProps {
  juegos: Juego[];
}

export function ConceptFuturisticPage({ juegos }: ConceptFuturisticPageProps) {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGames = juegos.filter((j) =>
    j.titulo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeGame = juegos[selectedIndex % juegos.length] ?? juegos[0];

  return (
    <div className="relative min-h-full overflow-hidden rounded-[28px] border border-primario/20 bg-bg-principal p-8 text-texto-principal shadow-[0_30px_80px_rgba(0,0,0,0.7)]">
      {/* Ambient Volumetric Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[620px] -translate-x-1/2 rounded-full bg-primario/15 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 rounded-full bg-exito/10 blur-[130px]"
      />

      {/* Floating Glass Top Capsule */}
      <header className="relative z-10 mb-10 flex flex-wrap items-center justify-between gap-4 rounded-full border border-white/10 bg-bg-superficie/60 px-6 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primario opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primario" />
          </span>
          <span className="text-xs font-medium tracking-[0.2em] text-texto-principal uppercase">
            Nova<span className="text-primario">OS</span> // Spatial Store
          </span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter neural catalog..."
            className="w-48 rounded-full border border-white/10 bg-bg-principal/70 px-4 py-1.5 text-xs text-texto-principal placeholder:text-texto-secundario/70 focus:border-primario/60 focus:outline-none sm:w-60"
          />
          <Link
            to="/concept"
            className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-texto-secundario no-underline transition hover:border-primario/40 hover:text-primario"
          >
            Maximalist
          </Link>
          <Link
            to="/"
            className="rounded-full border border-primario/30 bg-primario/10 px-4 py-1.5 text-xs font-medium text-primario no-underline transition hover:bg-primario/20"
          >
            Classic
          </Link>
        </div>
      </header>

      {/* Holographic Split-Stage Spotlight */}
      {activeGame && (
        <section className="relative z-10 mb-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Left: Clean Editorial Info */}
          <div className="lg:col-span-6">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-exito/30 bg-exito/10 px-3.5 py-1 text-[11px] font-medium tracking-wider text-exito uppercase">
              <span className="h-1.5 w-1.5 rounded-full bg-exito" />
              Ready for Instant Deployment
            </div>

            <h1 className="m-0 mb-4 bg-gradient-to-r from-texto-principal via-texto-principal to-primario bg-clip-text text-4xl font-light tracking-tight text-transparent sm:text-5xl">
              {activeGame.titulo}
            </h1>

            <p className="m-0 mb-8 max-w-lg text-sm leading-relaxed text-texto-secundario">
              {activeGame.descripcion}
            </p>

            {/* Glass Action Bar */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate(`/juego/${activeGame.id}`)}
                className="cursor-pointer rounded-full border-none bg-gradient-to-r from-primario to-exito px-7 py-3 text-sm font-semibold text-bg-principal shadow-[0_0_30px_rgba(56,189,248,0.35)] transition hover:scale-[1.02]"
              >
                Acquire License · ${activeGame.precio.toFixed(2)}
              </button>

              <div className="flex items-center gap-4 rounded-full border border-white/10 bg-bg-tarjeta/50 px-5 py-2.5 text-xs text-texto-secundario backdrop-blur-md">
                <span>
                  Stock <strong className="text-texto-principal">{activeGame.stock}</strong>
                </span>
                <span className="h-3 w-px bg-borde" />
                <span>
                  Build <strong className="text-primario">v2.6</strong>
                </span>
              </div>
            </div>
          </div>

          {/* Right: Orbital Holographic Frame */}
          <div className="relative flex items-center justify-center lg:col-span-6">
            {/* Concentric Orbital Rings */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute h-[340px] w-[340px] rounded-full border border-primario/15"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute h-[400px] w-[400px] rounded-full border border-exito/10"
            />

            <div className="relative w-full max-w-[460px] overflow-hidden rounded-[24px] border border-white/15 bg-bg-tarjeta/40 p-2 backdrop-blur-xl shadow-[0_20px_60px_rgba(56,189,248,0.18)]">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[18px] bg-bg-principal">
                {activeGame.imagenUrl ? (
                  <img
                    src={activeGame.imagenUrl}
                    alt={activeGame.titulo}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-texto-secundario">
                    No Visual Feed
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-principal/80 via-transparent to-transparent" />
                <div className="absolute right-4 bottom-3 left-4 flex items-center justify-between text-[11px] text-texto-secundario">
                  <span>NODE // 0{selectedIndex + 1}</span>
                  <span className="text-primario">4K HDR · CLOUD SYNC</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Spatial Glass Catalog Strip */}
      <section className="relative z-10">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="m-0 text-xs font-medium tracking-[0.25em] text-texto-secundario uppercase">
            Neural Library ({filteredGames.length})
          </h2>
          <div className="flex gap-1.5">
            {juegos.map((g, idx) => (
              <button
                key={g.id}
                onClick={() => setSelectedIndex(idx)}
                aria-label={`Select ${g.titulo}`}
                className={`h-1.5 cursor-pointer rounded-full border-none transition-all ${
                  idx === selectedIndex ? 'w-8 bg-primario' : 'w-2 bg-borde hover:bg-texto-secundario'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredGames.map((juego) => {
            const isSelected = activeGame?.id === juego.id;
            return (
              <div
                key={juego.id}
                onClick={() => {
                  const idx = juegos.findIndex((item) => item.id === juego.id);
                  if (idx !== -1) setSelectedIndex(idx);
                }}
                className={`group cursor-pointer overflow-hidden rounded-2xl border p-3 backdrop-blur-md transition-all duration-300 ${
                  isSelected
                    ? 'border-primario/60 bg-bg-tarjeta/80 shadow-[0_0_35px_rgba(56,189,248,0.18)]'
                    : 'border-white/10 bg-bg-superficie/50 hover:-translate-y-1 hover:border-primario/30'
                }`}
              >
                <div className="relative mb-3 aspect-[16/9] overflow-hidden rounded-xl bg-bg-principal">
                  {juego.imagenUrl && (
                    <img
                      src={juego.imagenUrl}
                      alt={juego.titulo}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <span className="absolute top-2.5 right-2.5 rounded-full border border-white/15 bg-bg-principal/75 px-2.5 py-0.5 text-[11px] font-medium text-texto-principal backdrop-blur-md">
                    ${juego.precio.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between px-1">
                  <div className="min-w-0">
                    <h3 className="m-0 truncate text-sm font-medium text-texto-principal">
                      {juego.titulo}
                    </h3>
                    <p className="m-0 mt-0.5 text-[11px] text-texto-secundario">
                      {juego.stock} licenses available
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/juego/${juego.id}`);
                    }}
                    className="shrink-0 cursor-pointer rounded-full border border-primario/30 bg-primario/10 px-3 py-1 text-[11px] font-medium text-primario transition hover:bg-primario hover:text-bg-principal"
                  >
                    Inspect
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
