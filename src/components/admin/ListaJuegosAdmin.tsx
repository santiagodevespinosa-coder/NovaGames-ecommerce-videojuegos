// src/components/admin/ListaJuegosAdmin.tsx
import type { Juego } from '../../types';

interface ListaJuegosAdminProps {
  juegos: Juego[];
}

export function ListaJuegosAdmin({ juegos }: ListaJuegosAdminProps) {
  return (
    <div className="bg-bg-tarjeta p-6 rounded-2xl border border-borde">
      <h3 className="m-0 mb-4 text-lg text-texto-principal font-bold">
        Juegos Registrados en el Sistema ({juegos.length})
      </h3>
      <div className="flex flex-col gap-2.5">
        {juegos.map((j) => (
          <div
            key={j.id}
            className="flex justify-between items-center py-3 px-4 bg-bg-principal rounded-lg border border-borde"
          >
            <div>
              <strong className="text-texto-principal">{j.titulo}</strong>
              <span className="text-texto-secundario text-[13px] ml-3">
                Stock: {j.stock} | ${j.precio}
              </span>
            </div>
            <span className="text-xs text-primario">ID: {j.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
