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
    <div style={{ maxWidth: '900px', margin: '0 auto', color: '#F8FAFC' }}>
      <h1 style={{ fontSize: '26px', fontWeight: '800', marginBottom: '8px' }}>Panel de Administración</h1>
      <p style={{ color: '#94A3B8', marginBottom: '30px' }}>Administra el catálogo de la tienda, rutas de imágenes, precios y stock.</p>

      {/* Formulario para añadir juegos */}
      <div style={{ backgroundColor: '#151F33', padding: '28px', borderRadius: '16px', border: '1px solid #23324A', marginBottom: '40px' }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#38BDF8' }}>Añadir Nuevo Videojuego</h3>
        
        <form onSubmit={handleAgregarJuego} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94A3B8', marginBottom: '6px' }}>Título del Juego</label>
            <input 
              type="text" value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Ej. Grand Theft Auto VI" required
              style={{ width: '100%', padding: '10px', backgroundColor: '#070B14', border: '1px solid #23324A', borderRadius: '8px', color: '#FFF', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94A3B8', marginBottom: '6px' }}>Precio ($)</label>
            <input 
              type="number" step="0.01" value={precio} onChange={e => setPrecio(e.target.value)} placeholder="59.99" required
              style={{ width: '100%', padding: '10px', backgroundColor: '#070B14', border: '1px solid #23324A', borderRadius: '8px', color: '#FFF', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94A3B8', marginBottom: '6px' }}>Stock Inicial</label>
            <input 
              type="number" value={stock} onChange={e => setStock(e.target.value)} placeholder="20" required
              style={{ width: '100%', padding: '10px', backgroundColor: '#070B14', border: '1px solid #23324A', borderRadius: '8px', color: '#FFF', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: '#94A3B8', marginBottom: '6px' }}>Ruta de la Imagen (URL / Public)</label>
            <input 
              type="text" value={imagenUrl} onChange={e => setImagenUrl(e.target.value)} placeholder="/images/imagenes-juegos/juego.jpg"
              style={{ width: '100%', padding: '10px', backgroundColor: '#070B14', border: '1px solid #23324A', borderRadius: '8px', color: '#FFF', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label style={{ display: 'block', fontSize: '13px', color: '#94A3B8', marginBottom: '6px' }}>Descripción</label>
            <textarea 
              value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder="Sinopsis del juego..." rows={3}
              style={{ width: '100%', padding: '10px', backgroundColor: '#070B14', border: '1px solid #23324A', borderRadius: '8px', color: '#FFF', boxSizing: 'border-box', resize: 'vertical' }}
            />
          </div>

          <div style={{ gridColumn: 'span 2', marginTop: '10px' }}>
            <button 
              type="submit"
              style={{
                backgroundColor: '#10B981', color: '#FFF', border: 'none', padding: '12px 24px',
                borderRadius: '30px', fontWeight: '800', fontSize: '14px', cursor: 'pointer', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)'
              }}
            >
              Guardar y Publicar en Tienda
            </button>
          </div>
        </form>
      </div>

      {/* Listado rápido de administración */}
      <div style={{ backgroundColor: '#151F33', padding: '24px', borderRadius: '16px', border: '1px solid #23324A' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', color: '#F8FAFC' }}>Juegos Registrados en el Sistema ({juegos.length})</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {juegos.map(j => (
            <div key={j.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', backgroundColor: '#070B14', borderRadius: '8px', border: '1px solid #23324A' }}>
              <div>
                <strong style={{ color: '#F8FAFC' }}>{j.titulo}</strong>
                <span style={{ color: '#94A3B8', fontSize: '13px', marginLeft: '12px' }}>Stock: {j.stock} | ${j.precio}</span>
              </div>
              <span style={{ fontSize: '12px', color: '#38BDF8' }}>ID: {j.id}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};