// src/components/juegos/CatalogoJuegos.tsx
import React, { useEffect, useState } from 'react';
import { juegosService } from '../../services/juegosService';
import type { Juego } from '../../types';
import { CartaJuego } from './CartaJuego';

interface CatalogoJuegosProps {
  filtroBusqueda: string; // 🔍 Recibe lo que el usuario escribe en el header
}

export const CatalogoJuegos: React.FC<CatalogoJuegosProps> = ({ filtroBusqueda }) => {
  // Datos de prueba iniciales para poder ver y filtrar las cartas sin el servidor encendido
  const [juegos, setJuegos] = useState<Juego[]>([
    { id: 1, titulo: 'Cyberpunk 2077', descripcion: 'Un RPG de acción y aventura en mundo abierto.', precio: 59.99, stock: 15, categoriaId: 1, desarrolladorId: 1 },
    { id: 2, titulo: 'Minecraft', descripcion: 'Explora mundos infinitos y construye de todo.', precio: 29.99, stock: 30, categoriaId: 2, desarrolladorId: 2 },
    { id: 3, titulo: 'The Witcher 3: Wild Hunt', descripcion: 'Juego de rol de fantasía basado en la historia.', precio: 39.99, stock: 8, categoriaId: 1, desarrolladorId: 3 },
  ]);
  const [cargando, setCargando] = useState<boolean>(false); 
  const [error, setError] = useState<string | null>(null); // 👈 Declaración del estado de error que faltaba

  useEffect(() => {
    juegosService.obtenerJuegos()
      .then(data => {
        setJuegos(data);
        setCargando(false);
      })
      .catch(err => {
        console.error(err);
        setError('No se pudo conectar con el servidor.');
        setCargando(false);
      });
  }, []);

  // 🔍 Filtrar los juegos en base al texto ingresado (ignorando mayúsculas/minúsculas)
  const juegosFiltrados = juegos.filter(juego =>
    juego.titulo.toLowerCase().includes(filtroBusqueda.toLowerCase())
  );

  if (cargando) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#94A3B8', fontSize: '18px' }}>
        🔄 Sincronizando videojuegos con el servidor...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        backgroundColor: '#1E293B', 
        borderLeft: '4px solid #EF4444', 
        color: '#F87171', 
        padding: '20px', 
        borderRadius: '8px', 
        maxWidth: '800px', 
        margin: '40px auto',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ margin: '0 0 8px 0', color: '#FCA5A5' }}>⚠️ Error de Conexión</h3>
        <p style={{ margin: 0, fontSize: '14px', color: '#CBD5E1' }}>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2 style={{ color: '#F8FAFC', margin: 0, fontSize: '24px', fontWeight: '600' }}>Catálogo Destacado</h2>
        <span style={{ backgroundColor: '#334155', color: '#94A3B8', padding: '4px 12px', borderRadius: '20px', fontSize: '13px' }}>
          {juegosFiltrados.length} {juegosFiltrados.length === 1 ? 'juego encontrado' : 'juegos encontrados'}
        </span>
      </div>

      {juegosFiltrados.length === 0 ? (
        <p style={{ color: '#94A3B8', textAlign: 'center', padding: '40px' }}>No se encontraron videojuegos que coincidan con tu búsqueda.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
          {juegosFiltrados.map(juego => (
            <CartaJuego key={juego.id} juego={juego} /> // 👈 Usamos el componente modularizado aquí
          ))}
        </div>
      )}
    </div>
  );
};