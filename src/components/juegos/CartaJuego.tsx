// src/components/juegos/CartaJuego.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Juego } from '../../types';

interface CartaJuegoProps {
  juego: Juego;
}

export const CartaJuego: React.FC<CartaJuegoProps> = ({ juego }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/juego/${juego.id}`)}
      className="bg-bg-tarjeta border border-borde rounded-[14px] overflow-hidden cursor-pointer shadow-[0_10px_20px_-5px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out flex flex-col h-[360px] relative hover:-translate-y-1.5 hover:border-primario hover:shadow-[0_20px_30px_-10px_rgba(56,189,248,0.3)]"
    >
      {/* 🖼️ Contenedor de la Imagen con posición absoluta para forzar el tamaño */}
      <div className="w-full h-[280px] bg-bg-principal relative overflow-hidden">
        {juego.imagenUrl ? (
          <img 
            src={juego.imagenUrl} 
            alt={juego.titulo} 
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#64748B] text-[13px]">
            Sin imagen
          </div>
        )}

        {/* Badge de Stock flotante */}
        <span className="absolute top-2.5 right-2.5 bg-[#070B14]/85 text-texto-principal py-1 px-2 rounded-md text-[11px] font-bold border border-white/10 z-[3]">
          Stock: {juego.stock}
        </span>
      </div>

      {/* 📝 Título limpio en la parte inferior */}
      <div className="py-3.5 px-4 bg-bg-tarjeta flex-1 flex items-center">
        <h3 className="m-0 text-[15px] font-bold text-texto-principal whitespace-nowrap overflow-hidden text-ellipsis w-full">
          {juego.titulo}
        </h3>
      </div>
    </div>
  );
};