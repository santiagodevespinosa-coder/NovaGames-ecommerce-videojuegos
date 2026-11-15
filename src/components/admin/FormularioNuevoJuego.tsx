// src/components/admin/FormularioNuevoJuego.tsx
import React, { useState } from 'react';
import { juegosService } from '../../services/juegosService';
import type { Juego } from '../../types';

interface FormularioNuevoJuegoProps {
  onAgregarJuego: (nuevoJuego: Juego) => void;
}

const inputClass =
  'w-full p-2.5 bg-bg-principal border border-borde rounded-lg text-white box-border';
const labelClass = 'block text-[13px] text-texto-secundario mb-1.5';

function generarSlug(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function FormularioNuevoJuego({ onAgregarJuego }: FormularioNuevoJuegoProps) {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precioBase, setPrecioBase] = useState('');
  const [descuentoPorcentaje, setDescuentoPorcentaje] = useState('0');
  const [imagenUrl, setImagenUrl] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mensajeExito, setMensajeExito] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMensajeExito(null);
    setCargando(true);

    try {
      const nuevoJuego = await juegosService.crearJuego({
        titulo,
        slug: generarSlug(titulo),
        descripcion: descripcion || null,
        precioBase: parseFloat(precioBase) || 0,
        descuentoPorcentaje: parseInt(descuentoPorcentaje, 10) || 0,
        imagenUrl: imagenUrl || null,
        trailerUrl: trailerUrl || null,
      });

      onAgregarJuego(nuevoJuego);
      setTitulo('');
      setDescripcion('');
      setPrecioBase('');
      setDescuentoPorcentaje('0');
      setImagenUrl('');
      setTrailerUrl('');
      setMensajeExito('¡Videojuego agregado correctamente al catálogo!');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'No se pudo guardar el videojuego.'
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="bg-bg-tarjeta p-5 sm:p-7 rounded-2xl border border-borde mb-10">
      <h3 className="m-0 mb-5 text-lg text-primario font-bold">Añadir Nuevo Videojuego</h3>

      <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Título del Juego</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Ej. Grand Theft Auto VI"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Precio Base ($)</label>
          <input
            type="number"
            step="0.01"
            value={precioBase}
            onChange={(e) => setPrecioBase(e.target.value)}
            placeholder="59.99"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Descuento (%)</label>
          <input
            type="number"
            value={descuentoPorcentaje}
            onChange={(e) => setDescuentoPorcentaje(e.target.value)}
            placeholder="0"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Ruta de la Imagen (URL / Public)</label>
          <input
            type="text"
            value={imagenUrl}
            onChange={(e) => setImagenUrl(e.target.value)}
            placeholder="https://... o /images/imagenes-juegos/juego.jpg"
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass}>URL del Tráiler (YouTube Embed)</label>
          <input
            type="text"
            value={trailerUrl}
            onChange={(e) => setTrailerUrl(e.target.value)}
            placeholder="https://www.youtube.com/embed/VIDEO_ID"
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass}>Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Sinopsis del juego..."
            rows={3}
            className={`${inputClass} resize-y`}
          />
        </div>

        {error && (
          <div className="sm:col-span-2 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-400">
            {error}
          </div>
        )}

        {mensajeExito && (
          <div className="sm:col-span-2 rounded-lg border border-exito/40 bg-exito/10 px-3 py-2 text-xs text-exito">
            {mensajeExito}
          </div>
        )}

        <div className="sm:col-span-2 mt-2.5">
          <button
            type="submit"
            disabled={cargando}
            className="bg-exito text-white border-none py-3 px-6 rounded-[30px] font-extrabold text-sm cursor-pointer shadow-[0_4px_15px_rgba(16,185,129,0.3)] disabled:opacity-60"
          >
            {cargando ? 'Guardando...' : 'Guardar y Publicar en Tienda'}
          </button>
        </div>
      </form>
    </div>
  );
}
