// src/components/concept/ConceptEnchantedPage.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Juego } from '../../types';

interface ConceptEnchantedPageProps {
  juegos: Juego[];
}

export function ConceptEnchantedPage({ juegos }: ConceptEnchantedPageProps) {
  const navigate = useNavigate();
  const [activeIdx, setActiveIdx] = useState(0);

  const featured = juegos[activeIdx % juegos.length] ?? juegos[0];

  return (
    <div className="relative min-h-full overflow-hidden rounded-3xl bg-[#071322] text-[#F0F9FF] shadow-2xl">
      {/* Bioluminescent Hero Stage (Inspired by 2D Art & Animation Portfolio) */}
      <section className="relative flex min-h-[460px] flex-col justify-between overflow-hidden px-8 pt-6 pb-12">
        {/* Background Artwork Blended into Midnight Forest Blues & Mossy Greens */}
        {featured?.imagenUrl && (
          <div
            style={{ backgroundImage: `url(${featured.imagenUrl})` }}
            className="absolute inset-0 bg-cover bg-center opacity-35 transition-all duration-700"
          />
        )}

        {/* Painterly Atmospheric Gradients + Volumetric Light Ray */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_28%,rgba(147,235,255,0.28)_0%,rgba(19,65,94,0.55)_32%,rgba(7,19,34,0.92)_78%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071322] via-transparent to-[#0B2239]/60" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 left-12 h-[420px] w-48 rotate-[28deg] bg-gradient-to-b from-[#B8F2FF]/20 via-[#38BDF8]/5 to-transparent blur-2xl"
        />

        {/* Floating Bioluminescent Spores */}
        <span className="pointer-events-none absolute top-28 left-24 h-2 w-2 rounded-full bg-[#B8F2FF] shadow-[0_0_16px_4px_#67E8F9]" />
        <span className="pointer-events-none absolute right-28 bottom-24 h-1.5 w-1.5 rounded-full bg-[#6EE7B7] shadow-[0_0_14px_3px_#34D399]" />
        <span className="pointer-events-none absolute right-48 bottom-16 h-1 w-1 rounded-full bg-[#93C5FD] shadow-[0_0_10px_2px_#60A5FA]" />

        {/* Subtle Top Bar */}
        <div className="relative z-10 flex items-center justify-between text-xs tracking-[0.2em] text-[#BAE6FD]/80 uppercase">
          <span className="font-medium">Enchanted Archive</span>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-[#BAE6FD]/80 no-underline transition hover:text-white">
              Tienda
            </Link>
            <Link
              to="/biblioteca"
              className="text-[#BAE6FD]/80 no-underline transition hover:text-white"
            >
              Biblioteca
            </Link>
          </div>
        </div>

        {/* Centered Cinematic Lockup (Direct homage to the reference composition) */}
        <div className="relative z-10 mx-auto my-auto w-full max-w-2xl py-10 text-center">
          <p className="m-0 mb-2 text-xs font-medium tracking-[0.38em] text-[#E0F2FE] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] sm:text-sm">
            2D WORLDS &amp; INTERACTIVE TALES
          </p>

          <h1 className="m-0 text-5xl font-black tracking-tight text-white uppercase drop-shadow-[0_8px_28px_rgba(103,232,249,0.35)] sm:text-7xl">
            NOVAGAMES
          </h1>

          <div className="mx-auto mt-3 flex max-w-lg items-center justify-between px-2 text-[11px] font-medium tracking-[0.28em] text-[#BAE6FD]/90 uppercase">
            <span>{featured ? featured.titulo : 'CURATED EDITION'}</span>
            <span>2026</span>
          </div>

          {/* Soft Luminous CTA & Orb Switcher */}
          {featured && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => navigate(`/juego/${featured.id}`)}
                className="cursor-pointer rounded-full border border-[#B8F2FF]/50 bg-[#B8F2FF]/15 px-7 py-2.5 text-xs font-semibold tracking-[0.18em] text-white uppercase backdrop-blur-md shadow-[0_0_25px_rgba(103,232,249,0.3)] transition hover:bg-[#B8F2FF]/25"
              >
                Enter {featured.titulo} · ${featured.precio.toFixed(2)}
              </button>

              <div className="flex items-center gap-2 rounded-full bg-[#0B1D33]/70 px-3 py-2 backdrop-blur-md">
                {juegos.map((g, idx) => (
                  <button
                    key={g.id}
                    onClick={() => setActiveIdx(idx)}
                    aria-label={`Preview ${g.titulo}`}
                    className={`h-2.5 cursor-pointer rounded-full border-none transition-all ${
                      idx === activeIdx
                        ? 'w-7 bg-[#B8F2FF] shadow-[0_0_12px_#67E8F9]'
                        : 'w-2.5 bg-[#2A4A68] hover:bg-[#67E8F9]/60'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Misty Forest Floor: Organic Game Showcase */}
      <main className="relative z-10 bg-gradient-to-b from-[#071322] via-[#0A1D2B] to-[#08191B] px-8 pt-4 pb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="m-0 text-xs font-semibold tracking-[0.3em] text-[#6EE7B7] uppercase">
            Sanctuary Collection ({juegos.length})
          </h2>
          <span className="text-xs text-[#94A3B8]">Select a realm to inspect</span>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {juegos.map((juego) => (
            <article
              key={juego.id}
              onClick={() => navigate(`/juego/${juego.id}`)}
              className="group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-[#24475B]/70 bg-[#0D2133]/75 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#67E8F9]/60 hover:shadow-[0_18px_40px_rgba(56,189,248,0.18)]"
            >
              <div className="relative h-56 overflow-hidden">
                {juego.imagenUrl ? (
                  <img
                    src={juego.imagenUrl}
                    alt={juego.titulo}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-[#0B1B2B]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D2133] via-transparent to-transparent" />

                <span className="absolute top-3.5 right-3.5 rounded-full border border-[#6EE7B7]/40 bg-[#081A24]/80 px-3 py-1 text-xs font-semibold text-[#6EE7B7] backdrop-blur-md">
                  ${juego.precio.toFixed(2)}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between p-5 pt-2">
                <div>
                  <h3 className="m-0 mb-2 text-lg font-bold tracking-tight text-white group-hover:text-[#B8F2FF]">
                    {juego.titulo}
                  </h3>
                  <p className="m-0 mb-4 line-clamp-2 text-xs leading-relaxed text-[#9EC1D6]">
                    {juego.descripcion}
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-[#1D3B4E] pt-3 text-[11px] text-[#7DD3FC]">
                  <span>{juego.stock} copies in sanctuary</span>
                  <span className="font-semibold tracking-wider uppercase">Explore →</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
