// src/components/concept/ConceptArtGalleryPage.tsx
import { Link, useNavigate } from 'react-router-dom';
import type { Juego } from '../../types';

interface ConceptArtGalleryPageProps {
  juegos: Juego[];
}

export function ConceptArtGalleryPage({ juegos }: ConceptArtGalleryPageProps) {
  const navigate = useNavigate();

  const heroBannerImage = juegos[0]?.imagenUrl;
  const panels = juegos.slice(0, 4);

  return (
    <div className="min-h-full overflow-hidden rounded-2xl border border-[#38332E] bg-[#1F1E1C] text-[#FAF8F5] shadow-2xl">
      {/* Top Warm Canyon / Terracotta Atmospheric Banner */}
      <header className="relative flex min-h-[250px] flex-col justify-between overflow-hidden px-8 pt-6 pb-8">
        {heroBannerImage && (
          <div
            style={{ backgroundImage: `url(${heroBannerImage})` }}
            className="absolute inset-0 bg-cover bg-center opacity-50 sepia-[0.45] saturate-150"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[#7C3A1D]/55 via-[#3B2316]/75 to-[#1F1E1C]" />

        {/* Top Navigation Bar */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="m-0 text-xl font-black tracking-tight text-white uppercase">
              NOVA GAMES
            </h1>
            <p className="m-0 text-[10px] font-semibold tracking-[0.25em] text-[#E6C9B8] uppercase">
              Art Direction &amp; Curated Worlds
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-6 text-sm font-medium">
            <span className="border-b-2 border-[#E89D65] pb-1 text-white">
              Showcase
            </span>
            <Link
              to="/"
              className="text-[#E6DDD6] no-underline transition hover:text-[#E89D65]"
            >
              Tienda
            </Link>
            <Link
              to="/biblioteca"
              className="text-[#E6DDD6] no-underline transition hover:text-[#E89D65]"
            >
              Biblioteca
            </Link>
            <Link
              to="/admin"
              className="text-[#E6DDD6] no-underline transition hover:text-[#E89D65]"
            >
              Admin
            </Link>
          </nav>
        </div>

        {/* Centered Display Title */}
        <div className="relative z-10 mt-10 text-center">
          <h2 className="m-0 text-3xl font-light tracking-[0.3em] text-white uppercase sm:text-4xl">
            CATALOGUE
          </h2>
        </div>
      </header>

      {/* 4-Column Tall Vertical Showcase Panels */}
      <main className="px-6 pb-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {panels.map((juego) => (
            <div
              key={juego.id}
              onClick={() => navigate(`/juego/${juego.id}`)}
              className="group relative flex h-[430px] cursor-pointer items-center justify-center overflow-hidden bg-[#2B2927]"
            >
              {juego.imagenUrl ? (
                <img
                  src={juego.imagenUrl}
                  alt={juego.titulo}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-[#2B2927]" />
              )}

              {/* Warm Dark Vignette */}
              <div className="absolute inset-0 bg-[#141210]/35 transition-colors duration-300 group-hover:bg-[#141210]/15" />

              {/* Centered Bold Uppercase Title */}
              <div className="relative z-10 px-4 text-center">
                <h3 className="m-0 text-2xl font-black tracking-wide text-white uppercase drop-shadow-[0_3px_14px_rgba(0,0,0,0.95)]">
                  {juego.titulo}
                </h3>
                <span className="mt-2 inline-block translate-y-2 rounded-full bg-[#E89D65] px-3.5 py-1 text-xs font-bold text-[#1A1613] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  ${juego.precio.toFixed(2)} · Ver juego
                </span>
              </div>
            </div>
          ))}

          {/* 4th Panel linking to Library */}
          {panels.length < 4 && (
            <div
              onClick={() => navigate('/biblioteca')}
              className="group relative flex h-[430px] cursor-pointer items-center justify-center overflow-hidden bg-[#2B2927]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#3D2B22] via-[#262320] to-[#1A1918] transition-opacity duration-300 group-hover:opacity-90" />
              <div className="relative z-10 px-4 text-center">
                <h3 className="m-0 text-2xl font-black tracking-wide text-white uppercase drop-shadow-[0_3px_14px_rgba(0,0,0,0.95)]">
                  MI BIBLIOTECA
                </h3>
                <span className="mt-2 inline-block translate-y-2 rounded-full bg-[#84A98C] px-3.5 py-1 text-xs font-bold text-[#141614] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  Explorar colección
                </span>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Pure Black Minimalist Footer */}
      <footer className="bg-black px-8 py-9">
        <div className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-6 text-center text-xs sm:grid-cols-3">
          <div>
            <p className="m-0 text-sm font-bold text-white">Nova Games</p>
            <p className="m-0 mt-1 text-[#B8B2AC]">Art Direction &amp; Storefront</p>
          </div>

          <div>
            <span className="border-b border-[#7FA07A]/60 pb-0.5 text-[#7FA07A]">
              contact@novagames.store
            </span>
          </div>

          <div>
            <p className="m-0 mb-2 text-[#B8B2AC]">explore elsewhere:</p>
            <div className="flex justify-center gap-4 font-semibold text-white">
              <Link to="/" className="text-white no-underline hover:text-[#E89D65]">
                Tienda
              </Link>
              <Link
                to="/biblioteca"
                className="text-white no-underline hover:text-[#E89D65]"
              >
                Biblioteca
              </Link>
              <Link to="/admin" className="text-white no-underline hover:text-[#E89D65]">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
