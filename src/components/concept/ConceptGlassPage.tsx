// src/components/concept/ConceptGlassPage.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Juego } from '../../types';

interface ConceptGlassPageProps {
  juegos: Juego[];
}

export function ConceptGlassPage({ juegos }: ConceptGlassPageProps) {
  const navigate = useNavigate();
  const [activeIdx, setActiveIdx] = useState(0);
  const featured = juegos[activeIdx % juegos.length] ?? juegos[0];

  return (
    <div className="relative min-h-full overflow-hidden rounded-[32px] bg-[#0B1026] p-7 text-white shadow-2xl">
      {/* Vibrant Gradient Mesh Blobs for True Frosted Refraction */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-20 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-cyan-400/55 to-blue-600/40 blur-[90px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -right-24 h-[460px] w-[460px] rounded-full bg-gradient-to-br from-fuchsia-500/45 to-violet-600/40 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/3 h-[380px] w-[380px] rounded-full bg-gradient-to-tr from-emerald-400/40 to-teal-500/30 blur-[100px]"
      />

      {/* Frosted Glass Navbar */}
      <header className="relative z-10 mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/25 bg-white/10 px-6 py-3.5 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.25)]">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
          <span className="text-sm font-semibold tracking-wider uppercase">
            NovaGlass Store
          </span>
        </div>

        <nav className="flex items-center gap-3 text-xs font-medium">
          <Link
            to="/"
            className="rounded-xl border border-white/20 bg-white/10 px-4 py-1.5 text-white no-underline backdrop-blur-md transition hover:bg-white/20"
          >
            Tienda
          </Link>
          <Link
            to="/biblioteca"
            className="rounded-xl border border-white/20 bg-white/10 px-4 py-1.5 text-white no-underline backdrop-blur-md transition hover:bg-white/20"
          >
            Biblioteca
          </Link>
        </nav>
      </header>

      {/* Frosted Glass Hero Stage */}
      {featured && (
        <section className="relative z-10 mb-10 grid grid-cols-1 items-center gap-8 rounded-[28px] border border-white/25 bg-white/10 p-7 backdrop-blur-2xl shadow-[0_16px_48px_rgba(0,0,0,0.3)] lg:grid-cols-12">
          <div className="lg:col-span-6">
            <span className="mb-4 inline-block rounded-full border border-white/30 bg-white/15 px-3.5 py-1 text-[11px] font-semibold tracking-widest uppercase backdrop-blur-md">
              Frosted Showcase
            </span>
            <h1 className="m-0 mb-3 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {featured.titulo}
            </h1>
            <p className="m-0 mb-6 max-w-lg text-sm leading-relaxed text-white/80">
              {featured.descripcion}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate(`/juego/${featured.id}`)}
                className="cursor-pointer rounded-2xl border border-white/40 bg-white/25 px-7 py-3 text-sm font-bold text-white backdrop-blur-xl shadow-[0_8px_24px_rgba(0,0,0,0.2)] transition hover:bg-white/35"
              >
                Comprar · ${featured.precio.toFixed(2)}
              </button>
              <div className="rounded-2xl border border-white/20 bg-black/20 px-4 py-2.5 text-xs text-white/80 backdrop-blur-md">
                Stock: <strong className="text-white">{featured.stock}</strong>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-3xl border border-white/30 bg-white/10 p-2 backdrop-blur-xl">
              <div className="aspect-[16/10] overflow-hidden rounded-2xl">
                {featured.imagenUrl && (
                  <img
                    src={featured.imagenUrl}
                    alt={featured.titulo}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </div>
            <div className="mt-4 flex justify-center gap-2">
              {juegos.map((g, idx) => (
                <button
                  key={g.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`h-2 cursor-pointer rounded-full border-none transition-all ${
                    idx === activeIdx ? 'w-8 bg-white' : 'w-2.5 bg-white/35 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Large Frosted Glass Game Cards */}
      <section className="relative z-10 grid grid-cols-1 gap-7 md:grid-cols-3">
        {juegos.map((juego) => (
          <article
            key={juego.id}
            onClick={() => navigate(`/juego/${juego.id}`)}
            className="group flex h-[440px] cursor-pointer flex-col overflow-hidden rounded-[26px] border border-white/25 bg-white/10 p-3 backdrop-blur-2xl shadow-[0_12px_36px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-1.5 hover:border-white/45 hover:bg-white/15"
          >
            <div className="relative h-[300px] overflow-hidden rounded-2xl">
              {juego.imagenUrl && (
                <img
                  src={juego.imagenUrl}
                  alt={juego.titulo}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <span className="absolute top-3 right-3 rounded-full border border-white/30 bg-black/35 px-3 py-1 text-xs font-bold text-white backdrop-blur-xl">
                ${juego.precio.toFixed(2)}
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-between p-3 pt-4">
              <div>
                <h3 className="m-0 truncate text-lg font-bold text-white">{juego.titulo}</h3>
                <p className="m-0 mt-1 line-clamp-2 text-xs text-white/75">{juego.descripcion}</p>
              </div>
              <div className="flex items-center justify-between text-xs text-white/80">
                <span>Stock: {juego.stock}</span>
                <span className="font-semibold text-white">Ver detalles →</span>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
