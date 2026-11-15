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
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1.5 py-3 px-4 bg-bg-principal rounded-lg border border-borde"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <strong className="text-texto-principal">{j.titulo}</strong>
              <span className="text-texto-secundario text-[13px]">
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
