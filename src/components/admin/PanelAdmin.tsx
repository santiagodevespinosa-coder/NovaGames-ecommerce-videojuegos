// src/components/admin/PanelAdmin.tsx
import React, { useState } from 'react';
import type { Juego } from '../../types';

interface PanelAdminProps {
  juegos: Juego[];
  setJuegos: React.Dispatch<React.SetStateAction<Juego[]>>;
}

export const PanelAdmin: React.FC<PanelAdminProps> = ({ juegos, setJuegos }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');

  const handleAgregarJuego = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo || !precio) return;

    const nuevoJuego: Juego = {
      id: Date.now(),
      titulo,
      descripcion,
      precio: parseFloat(precio),
      stock: parseInt(stock) || 10,
      categoriaId: 1,
      desarrolladorId: 1,
      imagenUrl: imagenUrl || '/images/imagenes-juegos/imagen_cyberpunk_2077.webp'
    };

    setJuegos([...juegos, nuevoJuego]);
    setTitulo('');
    setDescripcion('');
    setPrecio('');
    setStock('');
    setImagenUrl('');
    alert('¡Videojuego agregado correctamente al catálogo!');
  };

  return (
    <div className="max-w-[900px] mx-auto text-texto-principal">
      <h1 className="text-[26px] font-extrabold mb-2">Panel de Administración</h1>
      <p className="text-texto-secundario mb-[30px]">Administra el catálogo de la tienda, rutas de imágenes, precios y stock.</p>

      {/* Formulario para añadir juegos */}
      <div className="bg-bg-tarjeta p-7 rounded-2xl border border-borde mb-10">
        <h3 className="m-0 mb-5 text-lg text-primario font-bold">Añadir Nuevo Videojuego</h3>
        
        <form onSubmit={handleAgregarJuego} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[13px] text-texto-secundario mb-1.5">Título del Juego</label>
            <input 
              type="text" value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Ej. Grand Theft Auto VI" required
              className="w-full p-2.5 bg-bg-principal border border-borde rounded-lg text-white box-border"
            />
          </div>

          <div>
            <label className="block text-[13px] text-texto-secundario mb-1.5">Precio ($)</label>
            <input 
              type="number" step="0.01" value={precio} onChange={e => setPrecio(e.target.value)} placeholder="59.99" required
              className="w-full p-2.5 bg-bg-principal border border-borde rounded-lg text-white box-border"
            />
          </div>

          <div>
            <label className="block text-[13px] text-texto-secundario mb-1.5">Stock Inicial</label>
            <input 
              type="number" value={stock} onChange={e => setStock(e.target.value)} placeholder="20" required
              className="w-full p-2.5 bg-bg-principal border border-borde rounded-lg text-white box-border"
            />
          </div>

          <div>
            <label className="block text-[13px] text-texto-secundario mb-1.5">Ruta de la Imagen (URL / Public)</label>
            <input 
              type="text" value={imagenUrl} onChange={e => setImagenUrl(e.target.value)} placeholder="/images/imagenes-juegos/juego.jpg"
              className="w-full p-2.5 bg-bg-principal border border-borde rounded-lg text-white box-border"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-[13px] text-texto-secundario mb-1.5">Descripción</label>
            <textarea 
              value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder="Sinopsis del juego..." rows={3}
              className="w-full p-2.5 bg-bg-principal border border-borde rounded-lg text-white box-border resize-y"
            />
          </div>

          <div className="col-span-2 mt-2.5">
            <button 
              type="submit"
              className="bg-exito text-white border-none py-3 px-6 rounded-[30px] font-extrabold text-sm cursor-pointer shadow-[0_4px_15px_rgba(16,185,129,0.3)]"
            >
              Guardar y Publicar en Tienda
            </button>
          </div>
        </form>
      </div>

      {/* Listado rápido de administración */}
      <div className="bg-bg-tarjeta p-6 rounded-2xl border border-borde">
        <h3 className="m-0 mb-4 text-lg text-texto-principal font-bold">Juegos Registrados en el Sistema ({juegos.length})</h3>
        <div className="flex flex-col gap-2.5">
          {juegos.map(j => (
            <div key={j.id} className="flex justify-between items-center py-3 px-4 bg-bg-principal rounded-lg border border-borde">
              <div>
                <strong className="text-texto-principal">{j.titulo}</strong>
                <span className="text-texto-secundario text-[13px] ml-3">Stock: {j.stock} | ${j.precio}</span>
              </div>
              <span className="text-xs text-primario">ID: {j.id}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};