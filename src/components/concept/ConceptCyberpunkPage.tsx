// src/components/concept/ConceptCyberpunkPage.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Juego } from '../../types';

interface ConceptCyberpunkPageProps {
  juegos: Juego[];
}

const CHAMFER_CLIP =
  'polygon(0 0, calc(100% - 22px) 0, 100% 22px, 100% 100%, 22px 100%, 0 calc(100% - 22px))';

export function ConceptCyberpunkPage({ juegos }: ConceptCyberpunkPageProps) {
  const navigate = useNavigate();
  const [selectedIdx, setSelectedIdx] = useState(0);
  const featured = juegos[selectedIdx % juegos.length] ?? juegos[0];

  return (
    <div className="relative min-h-full overflow-hidden bg-[#120524] p-7 font-mono text-[#E879F9] shadow-[inset_0_0_120px_rgba(168,85,247,0.25)]">
      {/* Neon Purple Ambient Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/3 h-96 w-96 rounded-full bg-[#A855F7]/25 blur-[130px]"
      />

      {/* Hazard Top Caution Stripe */}
      <div
        aria-hidden="true"
        className="relative z-10 mb-6 h-2.5 w-full"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-45deg, #D946EF 0px, #D946EF 12px, #120524 12px, #120524 24px)',
        }}
      />

      {/* Netrunner HUD Header */}
      <header className="relative z-10 mb-8 flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#A855F7] pb-4">
        <div className="flex items-center gap-3">
          <span className="bg-[#D946EF] px-3 py-1 text-xs font-black tracking-widest text-[#120524] uppercase">
            NC_NET // 2077
          </span>
          <h1 className="m-0 text-2xl font-black tracking-tight text-[#F3E8FF] uppercase">
            CYBER_MARKET.SYS
          </h1>
        </div>

        <nav className="flex items-center gap-3 text-xs font-black uppercase">
          <Link
            to="/"
            className="border border-[#22D3EE] px-3.5 py-1.5 text-[#22D3EE] no-underline transition hover:bg-[#22D3EE] hover:text-[#120524]"
          >
            [TIENDA]
          </Link>
          <Link
            to="/biblioteca"
            className="border border-[#E879F9] px-3.5 py-1.5 text-[#E879F9] no-underline transition hover:bg-[#E879F9] hover:text-[#120524]"
          >
            [BIBLIOTECA]
          </Link>
        </nav>
      </header>

      {/* Chamfered Neon-Purple Hero */}
      {featured && (
        <section
          className="relative z-10 mb-10 grid grid-cols-1 gap-8 border-2 border-[#C084FC] bg-[#1E0B3B]/90 p-7 shadow-[0_0_40px_rgba(168,85,247,0.2)] lg:grid-cols-12"
          style={{ clipPath: CHAMFER_CLIP }}
        >
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <div className="mb-3 flex items-center gap-2 text-[11px] font-black">
                <span className="bg-[#22D3EE] px-2 py-0.5 text-[#120524]">PRIORITY_BD</span>
                <span className="text-[#F472B6]">ICE_LEVEL: MAX</span>
              </div>
              <h2 className="m-0 mb-3 text-4xl font-black tracking-tight text-white uppercase sm:text-5xl">
                {featured.titulo}
              </h2>
              <p className="m-0 mb-6 text-xs leading-relaxed text-[#E9D5FF]/85">
                {featured.descripcion}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate(`/juego/${featured.id}`)}
                className="cursor-pointer border-none bg-[#D946EF] px-7 py-3 text-xs font-black tracking-widest text-white uppercase shadow-[5px_5px_0px_#22D3EE] transition hover:bg-[#22D3EE] hover:text-[#120524]"
              >
                JACK_IN // €$ {featured.precio.toFixed(2)}
              </button>
              <span className="border border-[#C084FC] px-3 py-2 text-xs font-bold text-[#E9D5FF]">
                STOCK: {featured.stock}
              </span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div
              className="relative h-72 overflow-hidden border-2 border-[#22D3EE] bg-[#0B0317]"
              style={{ clipPath: CHAMFER_CLIP }}
            >
              {featured.imagenUrl && (
                <img
                  src={featured.imagenUrl}
                  alt={featured.titulo}
                  className="h-full w-full object-cover contrast-125 saturate-150"
                />
              )}
              <span className="absolute right-4 bottom-3 bg-[#120524]/90 px-2.5 py-1 text-xs font-black text-[#E879F9]">
                SHARD_0{selectedIdx + 1}
              </span>
            </div>
          </div>
        </section>
      )}

      {/* Large Chamfered Neon-Purple Game Cards */}
      <section className="relative z-10 grid grid-cols-1 gap-7 md:grid-cols-3">
        {juegos.map((juego, idx) => (
          <article
            key={juego.id}
            onClick={() => {
              setSelectedIdx(idx);
              navigate(`/juego/${juego.id}`);
            }}
            className="group relative flex h-[440px] cursor-pointer flex-col border-2 border-[#A855F7] bg-[#1E0B3B]/90 p-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-[#22D3EE] hover:shadow-[8px_8px_0px_#D946EF]"
            style={{ clipPath: CHAMFER_CLIP }}
          >
            <div className="mb-2 flex items-center justify-between text-[11px] font-black">
              <span className="text-[#F472B6]">NET_SHARD_0{idx + 1}</span>
              <span className="text-[#22D3EE]">QTY:{juego.stock}</span>
            </div>

            <div className="relative mb-4 h-[270px] overflow-hidden border border-[#C084FC]/60 bg-[#0B0317]">
              {juego.imagenUrl && (
                <img
                  src={juego.imagenUrl}
                  alt={juego.titulo}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <span className="absolute right-2 bottom-2 bg-[#D946EF] px-2.5 py-0.5 text-sm font-black text-white">
                €${juego.precio.toFixed(2)}
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h3 className="m-0 truncate text-lg font-black text-white uppercase group-hover:text-[#E879F9]">
                  {juego.titulo}
                </h3>
                <p className="m-0 mt-1 line-clamp-2 text-[11px] text-[#E9D5FF]/75">
                  {juego.descripcion}
                </p>
              </div>
              <span className="text-xs font-black tracking-wider text-[#22D3EE] uppercase">
                ACQUIRE_SHARD →
              </span>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
