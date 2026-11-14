// src/components/admin/PanelAdmin.tsx
import React from 'react';
import type { Juego } from '../../types';
import { FormularioNuevoJuego } from './FormularioNuevoJuego';
import { ListaJuegosAdmin } from './ListaJuegosAdmin';

interface PanelAdminProps {
  juegos: Juego[];
  setJuegos: React.Dispatch<React.SetStateAction<Juego[]>>;
}

export const PanelAdmin: React.FC<PanelAdminProps> = ({ juegos, setJuegos }) => {
  const handleAgregarJuego = (nuevoJuego: Juego) => {
    setJuegos((prev) => [...prev, nuevoJuego]);
  };

  return (
    <div className="max-w-[900px] mx-auto text-texto-principal">
      <h1 className="text-[26px] font-extrabold mb-2">Panel de Administración</h1>
      <p className="text-texto-secundario mb-[30px]">
        Administra el catálogo de la tienda, rutas de imágenes, precios y stock.
      </p>

      <FormularioNuevoJuego onAgregarJuego={handleAgregarJuego} />
      <ListaJuegosAdmin juegos={juegos} />
    </div>
  );
};
