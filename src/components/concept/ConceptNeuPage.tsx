// src/components/concept/ConceptNeuPage.tsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import type { Juego } from '../../types';

interface ConceptNeuPageProps {
  juegos: Juego[];
}

export function ConceptNeuPage({ juegos }: ConceptNeuPageProps) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<number>(juegos[0]?.id ?? 1);

  const filtered = juegos.filter((j) =>
    j.titulo.toLowerCase().includes(search.toLowerCase())
  );
  const activeGame = juegos.find((j) => j.id === selectedId) ?? juegos[0];

  return (
    <div className="min-h-full rounded-[32px] bg-[#E4EBF5] p-7 text-[#2D3748]">
      {/* Neumorphic Top Bar */}
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-[24px] bg-[#E4EBF5] px-6 py-4 shadow-[8px_8px_16px_#c3ccd9,-8px_-8px_16px_#ffffff]">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#E4EBF5] font-black text-[#4A6CF7] shadow-[inset_4px_4px_8px_#c3ccd9,inset_-4px_-4px_8px_#ffffff]">
            N
          </div>
          <div>
            <h1 className="m-0 text-base font-extrabold tracking-tight text-[#1E293B]">
              NovaSoft UI
            </h1>
            <p className="m-0 text-[11px] font-medium text-[#64748B]">
              Neumorphic Storefront
            </p>
          </div>
        </div>

        {/* Inset Neumorphic Search */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar en catálogo..."
          className="w-64 rounded-full border-none bg-[#E4EBF5] px-5 py-2.5 text-xs font-medium text-[#1E293B] placeholder:text-[#64748B] shadow-[inset_5px_5px_10px_#c3ccd9,inset_-5px_-5px_10px_#ffffff] focus:outline-none"
        />

        <div className="flex items-center gap-3 text-xs font-bold">
          <Link
            to="/"
            className="rounded-full bg-[#E4EBF5] px-4 py-2 text-[#475569] no-underline shadow-[5px_5px_10px_#c3ccd9,-5px_-5px_10px_#ffffff] transition hover:text-[#4A6CF7]"
          >
            Tienda
          </Link>
          <Link
            to="/biblioteca"
            className="rounded-full bg-[#E4EBF5] px-4 py-2 text-[#475569] no-underline shadow-[5px_5px_10px_#c3ccd9,-5px_-5px_10px_#ffffff] transition hover:text-[#4A6CF7]"
          >
            Biblioteca
          </Link>
        </div>
      </header>

      {/* Extruded Soft-UI Hero */}
      {activeGame && (
        <section className="mb-10 grid grid-cols-1 items-center gap-8 rounded-[30px] bg-[#E4EBF5] p-7 shadow-[12px_12px_24px_#c3ccd9,-12px_-12px_24px_#ffffff] lg:grid-cols-12">
          <div className="lg:col-span-6">
            <span className="mb-4 inline-block rounded-full bg-[#E4EBF5] px-4 py-1.5 text-[11px] font-bold tracking-wider text-[#4A6CF7] uppercase shadow-[inset_3px_3px_6px_#c3ccd9,inset_-3px_-3px_6px_#ffffff]">
              Destacado Tactile
            </span>
            <h2 className="m-0 mb-3 text-3xl font-black tracking-tight text-[#1E293B] sm:text-4xl">
              {activeGame.titulo}
            </h2>
            <p className="m-0 mb-6 text-sm leading-relaxed text-[#475569]">
              {activeGame.descripcion}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate(`/juego/${activeGame.id}`)}
                className="cursor-pointer rounded-full border-none bg-[#4A6CF7] px-7 py-3 text-xs font-extrabold tracking-wide text-white uppercase shadow-[6px_6px_14px_#b5c2d9,-4px_-4px_12px_#ffffff] transition hover:bg-[#3B5BDB]"
              >
                Comprar · ${activeGame.precio.toFixed(2)}
              </button>
              <span className="rounded-full bg-[#E4EBF5] px-5 py-2.5 text-xs font-bold text-[#475569] shadow-[inset_4px_4px_8px_#c3ccd9,inset_-4px_-4px_8px_#ffffff]">
                Stock: {activeGame.stock}
              </span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-[24px] bg-[#E4EBF5] p-3 shadow-[inset_6px_6px_12px_#c3ccd9,inset_-6px_-6px_12px_#ffffff]">
              <div className="aspect-[16/10] overflow-hidden rounded-[18px]">
                {activeGame.imagenUrl && (
                  <img
                    src={activeGame.imagenUrl}
                    alt={activeGame.titulo}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Large Neumorphic Game Cards */}
      <section className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {filtered.map((juego) => {
          const isSelected = activeGame?.id === juego.id;
          return (
            <article
              key={juego.id}
              onClick={() => setSelectedId(juego.id)}
              className={`flex h-[440px] cursor-pointer flex-col rounded-[28px] bg-[#E4EBF5] p-4 transition-all duration-300 ${
                isSelected
                  ? 'shadow-[inset_8px_8px_16px_#c3ccd9,inset_-8px_-8px_16px_#ffffff]'
                  : 'shadow-[10px_10px_20px_#c3ccd9,-10px_-10px_20px_#ffffff] hover:-translate-y-1'
              }`}
            >
              <div className="mb-4 h-[270px] overflow-hidden rounded-[20px] p-1.5 shadow-[inset_4px_4px_8px_#c3ccd9,inset_-4px_-4px_8px_#ffffff]">
                {juego.imagenUrl && (
                  <img
                    src={juego.imagenUrl}
                    alt={juego.titulo}
                    className="h-full w-full rounded-[15px] object-cover"
                  />
                )}
              </div>

              <div className="flex flex-1 flex-col justify-between px-1">
                <div>
                  <h3 className="m-0 truncate text-lg font-extrabold text-[#1E293B]">
                    {juego.titulo}
                  </h3>
                  <p className="m-0 mt-1 line-clamp-2 text-xs text-[#64748B]">
                    {juego.descripcion}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-base font-black text-[#4A6CF7]">
                    ${juego.precio.toFixed(2)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/juego/${juego.id}`);
                    }}
                    className="cursor-pointer rounded-full border-none bg-[#E4EBF5] px-4 py-2 text-xs font-bold text-[#1E293B] shadow-[4px_4px_8px_#c3ccd9,-4px_-4px_8px_#ffffff] transition hover:text-[#4A6CF7]"
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
