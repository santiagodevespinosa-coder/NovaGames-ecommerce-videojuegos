// src/components/juegos/BibliotecaJuegos.tsx
import React from 'react';
import libraryIcon from '../../assets/library.webp';

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
      <div className="mb-6 flex items-center gap-3.5">
        <img
          src={libraryIcon}
          alt="Biblioteca"
          className="w-11 h-11 object-contain shrink-0 drop-shadow-[0_0_10px_rgba(56,189,248,0.35)]"
        />
        <div>
          <h2 className="text-texto-principal m-0 mb-1 text-2xl font-semibold">Mi Biblioteca</h2>
          <p className="text-texto-secundario text-sm m-0">
            Gestiona tus juegos adquiridos, verifica horas de juego e instálalos en tu equipo.
          </p>
        </div>
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
              className="bg-bg-tarjeta border border-borde hover:border-primario/50 rounded-xl overflow-hidden flex flex-col justify-between shadow-md transition-colors"
            >
              {juego.imagenUrl && (
                <img
                  src={juego.imagenUrl}
                  alt={juego.titulo}
                  className="w-full h-36 object-cover border-b border-borde"
                />
              )}
              <div className="p-5 flex-1 flex flex-col justify-between">
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
                  className={`text-white py-2.5 px-4 rounded-lg font-bold text-xs uppercase tracking-wider cursor-pointer text-center ${
                    juego.instalado ? 'nova-btn-outline text-texto-principal' : 'nova-btn-primary'
                  }`}
                >
                  {juego.instalado ? 'Desinstalar' : 'Instalar'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};