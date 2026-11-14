// src/components/juegos/VistaDetalleJuego.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Juego } from '../../types';

interface VistaDetalleJuegoProps {
  juegos: Juego[];
  usuarioLogueado: string | null;
  onAbrirLogin: () => void;
  onComprarJuego: (juegoComprado: Juego) => void;
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

  const manejarCompra = () => {
    if (!usuarioLogueado) {
      onAbrirLogin();
      return;
    }
    if (yaEnBiblioteca) {
      alert(`Ya tienes el juego ${juegoEncontrado.titulo} en tu biblioteca.`);
      return;
    }
    onComprarJuego(juegoEncontrado);
    alert(`¡Compra exitosa! ${juegoEncontrado.titulo} se ha añadido a tu Biblioteca.`);
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
              className={`w-full text-white border-none p-3.5 rounded-[30px] font-extrabold text-[15px] shadow-[0_4px_15px_rgba(16,185,129,0.3)] transition-transform duration-200 ${
                yaEnBiblioteca ? 'bg-[#334155] cursor-default' : 'bg-exito cursor-pointer'
              }`}
            >
              {yaEnBiblioteca ? 'En tu Biblioteca' : usuarioLogueado ? 'Comprar y Añadir a Biblioteca' : 'Inicia sesión para comprar'}
            </button>
          </div>
        </div>
      </div>

      {/* 💻 Requerimientos del Sistema */}
      <div className="bg-bg-tarjeta p-[30px] rounded-2xl border border-borde">
        <h3 className="m-0 mb-4 text-lg text-texto-principal border-b border-borde pb-2.5">
          Requerimientos del Sistema (PC)
        </h3>
        <div className="grid grid-cols-2 gap-5 text-[13px] text-texto-secundario leading-relaxed">
          <div>
            <strong className="text-texto-principal block mb-1.5">Mínimos:</strong>
            • SO: Windows 10 de 64 bits<br />
            • Procesador: Core i5-3570K o FX-8310<br />
            • Memoria RAM: 8 GB<br />
            • Gráficos: GTX 780 o RX 470<br />
            • Almacenamiento: 70 GB disponibles
          </div>
          <div>
            <strong className="text-texto-principal block mb-1.5">Recomendados:</strong>
            • SO: Windows 10/11 de 64 bits<br />
            • Procesador: Core i7-4790 o Ryzen 3 3200G<br />
            • Memoria RAM: 12 GB<br />
            • Gráficos: GTX 1060 o R9 Fury<br />
            • Almacenamiento: 70 GB SSD
          </div>
        </div>
      </div>
    </div>
  );
};