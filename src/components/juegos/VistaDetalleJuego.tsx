// src/components/juegos/VistaDetalleJuego.tsx
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Juego, Usuario } from '../../types';
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
    <div className="max-w-[1000px] mx-auto text-texto-principal pb-[60px]">
      <Link to="/" className="text-primario no-underline text-sm font-semibold inline-block mb-5">
        ← Volver a la tienda
      </Link>

      {/* 🎬 Sección Superior: Tráiler / Media y Compra */}
      <div className="grid grid-cols-[1.6fr_1fr] gap-8 mb-10">
        
        {/* Reproductor de Tráiler / Banner Principal */}
        <div className="h-[360px] bg-[#0F172A] rounded-2xl border border-borde flex items-center justify-center text-texto-secundario text-base font-semibold shadow-[0_10px_25px_rgba(0,0,0,0.5)] relative overflow-hidden">
          ▶ [ Tráiler Oficial de {juegoEncontrado.titulo} ]
        </div>

        {/* Panel de Compra y Datos Clave */}
        <div className="bg-bg-tarjeta p-[30px] rounded-2xl border border-borde flex flex-col justify-between shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
          <div>
            <span className="bg-bg-principal text-primario py-1 px-2.5 rounded-md text-xs font-bold border border-borde">
              RPG / Acción
            </span>
            <h1 className="mt-4 mb-2.5 text-[28px] font-extrabold">{juegoEncontrado.titulo}</h1>
            
            {/* Puntuación de Satisfacción */}
            <div className="flex items-center gap-2 mb-5">
              <span className="text-exito text-[15px] font-extrabold">★ 94%</span>
              <span className="text-texto-secundario text-[13px]">Muy positiva (Reseñas de la comunidad)</span>
            </div>

            <p className="text-sm text-texto-secundario leading-relaxed m-0">
              {juegoEncontrado.descripcion}
            </p>
          </div>

          <div className="mt-6 border-t border-borde pt-5">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[13px] text-texto-secundario uppercase">Precio final</span>
              <span className="text-[26px] font-extrabold text-primario">${juegoEncontrado.precio.toFixed(2)}</span>
            </div>

            <button 
              onClick={manejarCompra}
              disabled={yaEnBiblioteca || comprando}
              className={`w-full text-white border-none p-3.5 rounded-[30px] font-extrabold text-[15px] shadow-[0_4px_15px_rgba(16,185,129,0.3)] transition-transform duration-200 disabled:opacity-70 ${
                yaEnBiblioteca ? 'bg-[#334155] cursor-default' : 'bg-exito cursor-pointer'
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