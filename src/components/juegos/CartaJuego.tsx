// src/components/juegos/CartaJuego.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Juego } from '../../types';

interface CartaJuegoProps {
  juego: Juego;
  enBiblioteca?: boolean;
}

export const CartaJuego: React.FC<CartaJuegoProps> = ({
  juego,
  enBiblioteca = false,
}) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/juego/${juego.id}`)}
      className="group bg-bg-tarjeta border border-borde rounded-[14px] overflow-hidden cursor-pointer shadow-[0_10px_20px_-5px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out flex flex-col h-[440px] relative hover:-translate-y-1.5 hover:border-primario hover:shadow-[0_20px_30px_-10px_rgba(56,189,248,0.3)]"
    >
      {/* 🖼️ Contenedor de la Imagen */}
      <div className="w-full h-[335px] bg-bg-principal relative overflow-hidden">
        {juego.imagenUrl ? (
          <img 
            src={juego.imagenUrl} 
            alt={juego.titulo} 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#64748B] text-[13px]">
            Sin imagen
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-bg-tarjeta via-transparent to-transparent opacity-80 pointer-events-none z-[2]" />

        {enBiblioteca && (
          <span className="absolute top-2.5 left-2.5 bg-exito/90 text-white py-1 px-2.5 rounded-md text-[11px] font-bold shadow-[0_0_10px_rgba(16,185,129,0.45)] z-[3]">
            ✓ En Biblioteca
          </span>
        )}

        {/* Badge de Precio */}
        <span className="absolute top-2.5 right-2.5 bg-[#070B14]/85 text-primario py-1 px-2.5 rounded-md text-xs font-extrabold border border-primario/35 z-[3]">
          {juego.precio === 0 ? 'Gratis' : `$${juego.precio.toFixed(2)}`}
        </span>
      </div>

      {/* 📝 Título y géneros en la parte inferior */}
      <div className="py-3 px-4 bg-bg-tarjeta flex-1 flex flex-col justify-center gap-1.5">
        <h3 className="m-0 text-[15px] font-bold text-texto-principal whitespace-nowrap overflow-hidden text-ellipsis w-full group-hover:text-primario transition-colors">
          {juego.titulo}
        </h3>
        {juego.generos && juego.generos.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {juego.generos.slice(0, 2).map((g) => (
              <span
                key={g.idGenero}
                className="text-[10px] font-semibold uppercase tracking-wider text-texto-secundario bg-bg-principal/80 border border-borde px-2 py-0.5 rounded"
              >
                {g.nombre}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};