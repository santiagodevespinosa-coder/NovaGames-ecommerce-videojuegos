// src/components/juegos/BibliotecaJuegos.tsx
import React from 'react';

export interface JuegoBiblioteca {
  id: number;
  titulo: string;
  imagenUrl?: string;
  horasJugadas: number;
  instalado: boolean;
}

interface BibliotecaJuegosProps {
  juegosBiblioteca: JuegoBiblioteca[];
  onToggleInstalacion: (id: number) => void;
}

export const BibliotecaJuegos: React.FC<BibliotecaJuegosProps> = ({
  juegosBiblioteca,
  onToggleInstalacion,
}) => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-texto-principal m-0 mb-2 text-2xl font-semibold">Mi Biblioteca</h2>
        <p className="text-texto-secundario text-sm m-0">
          Gestiona tus juegos adquiridos, verifica horas de juego e instálalos en tu equipo.
        </p>
      </div>

      {juegosBiblioteca.length === 0 ? (
        <p className="text-texto-secundario text-center p-10">
          No tienes juegos en tu biblioteca todavía. ¡Visita la tienda para comprar algunos!
        </p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
          {juegosBiblioteca.map(juego => (
            <div
              key={juego.id}
              className="bg-[#1E293B] border border-[#334155] rounded-xl p-5 flex flex-col justify-between shadow-md"
            >
              <div>
                <h3 className="m-0 mb-2 text-lg text-texto-principal font-semibold">
                  {juego.titulo}
                </h3>
                <p className="text-[13px] text-texto-secundario m-0 mb-4">
                  Tiempo de juego: <strong className="text-primario">{juego.horasJugadas} hrs</strong>
                </p>
              </div>

              <button
                onClick={() => onToggleInstalacion(juego.id)}
                className={`text-white border-none py-2.5 px-4 rounded-lg font-bold text-sm cursor-pointer transition-colors duration-200 text-center ${juego.instalado ? 'bg-[#334155]' : 'bg-exito'
                  }`}
              >
                {juego.instalado ? 'Desinstalar' : 'Instalar'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};