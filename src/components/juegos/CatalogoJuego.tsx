// src/components/juegos/CatalogoJuegos.tsx
import React, { useState } from 'react';
import { CartaJuego } from './CartaJuego';
import { CarruselDestacados } from './CarruselDestacados';
import type { Juego } from '../../types';

interface CatalogoJuegosProps {
  filtroBusqueda: string;
}

export const CatalogoJuegos: React.FC<CatalogoJuegosProps> = ({ filtroBusqueda }) => {
  const [juegos] = useState<Juego[]>([
    { 
      id: 1, 
      titulo: 'Cyberpunk 2077', 
      descripcion: 'Un RPG de acción y aventura en mundo abierto ambientado en Night City.', 
      precio: 59.99, 
      stock: 15, 
      categoriaId: 1, 
      desarrolladorId: 1,
      imagenUrl: '/images/imagenes-juegos/imagen_cyberpunk_2077.webp' 
    },
    { 
      id: 2, 
      titulo: 'Minecraft', 
      descripcion: 'Explora mundos infinitos y construye de todo, desde la casa más simple hasta el castillo más grandioso.', 
      precio: 29.99, 
      stock: 30, 
      categoriaId: 2, 
      desarrolladorId: 2,
      imagenUrl: '/images/imagenes-juegos/imagen_minecraft.webp' 
    },
    { 
      id: 3, 
      titulo: 'The Witcher 3: Wild Hunt', 
      descripcion: 'Juego de rol de fantasía de mundo abierto basado en una historia y centrado en las opciones.', 
      precio: 39.99, 
      stock: 8, 
      categoriaId: 1, 
      desarrolladorId: 3,
      imagenUrl: '/images/imagenes-juegos/imagen_the_witcher_3_wild_hunt.webp' 
    },
  ]);

  const juegosFiltrados = juegos.filter(juego =>
    juego.titulo.toLowerCase().includes(filtroBusqueda.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      {!filtroBusqueda && <CarruselDestacados juegos={juegos} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ color: 'var(--texto-principal)', margin: 0, fontSize: '22px', fontWeight: '700' }}>
          {filtroBusqueda ? `Resultados para "${filtroBusqueda}"` : 'Catálogo Destacado'}
        </h2>
        <span style={{ color: 'var(--texto-secundario)', fontSize: '13px', fontWeight: '600' }}>
          {juegosFiltrados.length} {juegosFiltrados.length === 1 ? 'juego encontrado' : 'juegos encontrados'}
        </span>
      </div>

      {juegosFiltrados.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'var(--texto-secundario)' }}>
          <p style={{ fontSize: '16px' }}>No se encontraron videojuegos que coincidan con tu búsqueda.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '24px',
          paddingBottom: '40px'
        }}>
          {juegosFiltrados.map(juego => (
            <CartaJuego key={juego.id} juego={juego} />
          ))}
        </div>
      )}
    </div>
  );
};