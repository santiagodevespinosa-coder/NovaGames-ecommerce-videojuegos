// src/components/juegos/VistaDetalleJuego.tsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Juego, Usuario } from '../../types';
import { getGameTrailerUrl } from '../../utils/gameImages';
import { RequisitosSistema } from './RequisitosSistema';

interface VistaDetalleJuegoProps {
  juegos: Juego[];
  usuarioLogueado: Usuario | null;
  onAbrirLogin: () => void;
  onComprarJuego: (juegoComprado: Juego) => Promise<void>;
  juegosEnBiblioteca: number[];
}

export const VistaDetalleJuego: React.FC<VistaDetalleJuegoProps> = ({
  juegos,
  usuarioLogueado,
  onAbrirLogin,
  onComprarJuego,
  juegosEnBiblioteca
}) => {
  const { id } = useParams<{ id: string }>();
  const [comprando, setComprando] = useState(false);
  const [lucesApagadas, setLucesApagadas] = useState(false);
  const [errorCompra, setErrorCompra] = useState<string | null>(null);
  const [mensajeCompra, setMensajeCompra] = useState<string | null>(null);
  const juegoEncontrado = juegos.find(j => j.id === Number(id));

  if (!juegoEncontrado) {
    return (
      <div className="text-center p-[60px] text-[#F87171]">
        <h2>Videojuego no encontrado</h2>
        <Link to="/" className="text-primario no-underline font-bold">
          ← Volver al catálogo
        </Link>
      </div>
    );
  }

  const yaEnBiblioteca = juegosEnBiblioteca.includes(juegoEncontrado.id);
  const trailerUrl =
    juegoEncontrado.trailerUrl || getGameTrailerUrl(juegoEncontrado.titulo);

  const manejarCompra = async () => {
    setErrorCompra(null);
    setMensajeCompra(null);

    if (!usuarioLogueado) {
      onAbrirLogin();
      return;
    }
    if (yaEnBiblioteca || comprando) {
      return;
    }

    setComprando(true);
    try {
      await onComprarJuego(juegoEncontrado);
      setMensajeCompra(`¡Compra exitosa! ${juegoEncontrado.titulo} se ha añadido a tu Biblioteca.`);
    } catch (err) {
      setErrorCompra(
        err instanceof Error ? err.message : 'No se pudo completar la compra.'
      );
    } finally {
      setComprando(false);
    }
  };

  return (
    <div className="max-w-[1160px] mx-auto text-texto-principal pb-[60px] relative">
      {lucesApagadas && (
        <div
          onClick={() => setLucesApagadas(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-[2px] z-30 transition-opacity duration-300"
        />
      )}

      {/* Barra superior del cine */}
      <div className="flex items-center justify-between mb-4 relative z-40">
        <Link
          to="/"
          className="text-primario no-underline text-sm font-semibold hover:underline"
        >
          ← Volver a la tienda
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setLucesApagadas((prev) => !prev)}
            className="nova-btn-outline text-xs font-bold text-texto-principal px-3.5 py-1.5 rounded-full cursor-pointer"
          >
            {lucesApagadas ? 'Encender luces' : 'Apagar luces'}
          </button>
        </div>
      </div>

      {/* 🎬 Escenario Principal: Pantalla de Cine 16:9 */}
      <div className="relative mb-10 z-40">
        {juegoEncontrado.imagenUrl && (
          <div
            aria-hidden="true"
            className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl pointer-events-none bg-cover bg-center"
            style={{ backgroundImage: `url(${juegoEncontrado.imagenUrl})` }}
          />
        )}

        <div className="relative aspect-video w-full bg-[#03060D] rounded-2xl border border-primario/35 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_45px_rgba(56,189,248,0.16)] overflow-hidden flex items-center justify-center">
          {trailerUrl ? (
            <iframe
              src={trailerUrl}
              title={`Tráiler oficial de ${juegoEncontrado.titulo}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : juegoEncontrado.imagenUrl ? (
            <img
              src={juegoEncontrado.imagenUrl}
              alt={juegoEncontrado.titulo}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-texto-secundario text-base font-semibold">
              Tráiler no disponible para {juegoEncontrado.titulo}
            </span>
          )}
        </div>
      </div>

      {/* 📋 Información del Juego + Panel de Compra */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] gap-8 mb-10">
        <div className="bg-bg-tarjeta/90 p-7 rounded-2xl border border-borde shadow-[0_10px_25px_rgba(0,0,0,0.45)] flex flex-col sm:flex-row gap-6">
          {juegoEncontrado.imagenUrl && (
            <img
              src={juegoEncontrado.imagenUrl}
              alt={juegoEncontrado.titulo}
              className="w-full sm:w-44 h-48 sm:h-auto rounded-xl object-cover border border-borde shrink-0"
            />
          )}

          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-3">
              {juegoEncontrado.generos && juegoEncontrado.generos.length > 0 ? (
                juegoEncontrado.generos.map((g) => (
                  <span
                    key={g.idGenero}
                    className="bg-bg-principal text-primario py-1 px-2.5 rounded-md text-xs font-bold border border-borde"
                  >
                    {g.nombre}
                  </span>
                ))
              ) : (
                <span className="bg-bg-principal text-primario py-1 px-2.5 rounded-md text-xs font-bold border border-borde">
                  Catálogo NovaGames
                </span>
              )}
            </div>

            <h1 className="mt-1 mb-2.5 text-3xl font-extrabold tracking-tight">
              {juegoEncontrado.titulo}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-exito text-[15px] font-extrabold">★ 94%</span>
              <span className="text-texto-secundario text-[13px]">
                Muy positiva (Reseñas de la comunidad)
              </span>
            </div>

            <p className="text-sm text-texto-secundario leading-relaxed m-0">
              {juegoEncontrado.descripcion}
            </p>
          </div>
        </div>

        {/* Panel de Compra */}
        <div className="bg-bg-tarjeta p-7 rounded-2xl border border-borde flex flex-col justify-between shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-texto-secundario">
              Edición Digital • Entrega inmediata
            </span>
            <div className="flex justify-between items-baseline mt-3 mb-5 pb-4 border-b border-borde">
              <span className="text-[13px] text-texto-secundario uppercase">
                Precio final
              </span>
              <span className="text-3xl font-extrabold text-primario">
                {juegoEncontrado.precio === 0
                  ? 'Gratis'
                  : `$${juegoEncontrado.precio.toFixed(2)}`}
              </span>
            </div>
          </div>

          <div>
            <button
              onClick={manejarCompra}
              disabled={yaEnBiblioteca || comprando}
              className={`w-full text-white p-3.5 rounded-[30px] font-extrabold text-[15px] transition-all duration-200 disabled:opacity-70 ${yaEnBiblioteca
                  ? 'nova-btn-outline text-texto-secundario cursor-default'
                  : 'nova-btn-primary cursor-pointer'
                }`}
            >
              {comprando
                ? 'Procesando compra...'
                : yaEnBiblioteca
                  ? 'En tu Biblioteca'
                  : usuarioLogueado
                    ? 'Comprar y Añadir a Biblioteca'
                    : 'Inicia sesión para comprar'}
            </button>

            {errorCompra && (
              <p className="mt-3 mb-0 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-400">
                {errorCompra}
              </p>
            )}
            {mensajeCompra && (
              <p className="mt-3 mb-0 rounded-lg border border-exito/40 bg-exito/10 px-3 py-2 text-xs text-exito">
                {mensajeCompra}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 💻 Requerimientos del Sistema */}
      <RequisitosSistema />
    </div>
  );
};