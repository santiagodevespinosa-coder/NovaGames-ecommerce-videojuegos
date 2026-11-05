// src/components/juegos/VistaDetalleJuego.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Juego } from '../../types';

interface VistaDetalleJuegoProps {
  juegos: Juego[];
  usuarioLogueado: string | null;
  onAbrirLogin: () => void;
  onComprarJuego: (juegoComprado: Juego) => void;
  juegosEnBiblioteca: number[];
}

export const VistaDetalleJuego: React.FC<VistaDetalleJuegoProps> = ({ 
  juegos, 
  usuarioLogueado, 
  onAbrirLogin, 
  onComprarJuego,
  juegosEnBiblioteca 
}) => {
  const { id } = useParams<{ id: string }>();
  const juegoEncontrado = juegos.find(j => j.id === Number(id));

  if (!juegoEncontrado) {
    return (
      <div style={{ textAlign: 'center', padding: '60px', color: '#F87171' }}>
        <h2>Videojuego no encontrado</h2>
        <Link to="/" style={{ color: '#38BDF8', textDecoration: 'none', fontWeight: '700' }}>
          ← Volver al catálogo
        </Link>
      </div>
    );
  }

  const yaEnBiblioteca = juegosEnBiblioteca.includes(juegoEncontrado.id);

  const manejarCompra = () => {
    if (!usuarioLogueado) {
      onAbrirLogin();
      return;
    }
    if (yaEnBiblioteca) {
      alert(`Ya tienes el juego ${juegoEncontrado.titulo} en tu biblioteca.`);
      return;
    }
    onComprarJuego(juegoEncontrado);
    alert(`¡Compra exitosa! ${juegoEncontrado.titulo} se ha añadido a tu Biblioteca.`);
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', color: '#F8FAFC', paddingBottom: '60px' }}>
      <Link to="/" style={{ color: '#38BDF8', textDecoration: 'none', fontSize: '14px', fontWeight: '600', display: 'inline-block', marginBottom: '20px' }}>
        ← Volver a la tienda
      </Link>

      {/* 🎬 Sección Superior: Tráiler / Media y Compra */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '32px', marginBottom: '40px' }}>
        
        {/* Reproductor de Tráiler / Banner Principal */}
        <div style={{ 
          height: '360px', 
          backgroundColor: '#0F172A', 
          borderRadius: '16px', 
          border: '1px solid #23324A',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: '#94A3B8',
          fontSize: '16px',
          fontWeight: '600',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          ▶ [ Tráiler Oficial de {juegoEncontrado.titulo} ]
        </div>

        {/* Panel de Compra y Datos Clave */}
        <div style={{ 
          backgroundColor: '#151F33', 
          padding: '30px', 
          borderRadius: '16px', 
          border: '1px solid #23324A',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
        }}>
          <div>
            <span style={{ backgroundColor: '#070B14', color: '#38BDF8', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700', border: '1px solid #23324A' }}>
              RPG / Acción
            </span>
            <h1 style={{ margin: '16px 0 10px 0', fontSize: '28px', fontWeight: '800' }}>{juegoEncontrado.titulo}</h1>
            
            {/* Puntuación de Satisfacción */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <span style={{ color: '#10B981', fontSize: '15px', fontWeight: '800' }}>★ 94%</span>
              <span style={{ color: '#94A3B8', fontSize: '13px' }}>Muy positiva (Reseñas de la comunidad)</span>
            </div>

            <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: '1.6', margin: 0 }}>
              {juegoEncontrado.descripcion}
            </p>
          </div>

          <div style={{ marginTop: '24px', borderTop: '1px solid #23324A', paddingTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '13px', color: '#94A3B8', textTransform: 'uppercase' }}>Precio final</span>
              <span style={{ fontSize: '26px', fontWeight: '800', color: '#38BDF8' }}>${juegoEncontrado.precio.toFixed(2)}</span>
            </div>

            <button 
              onClick={manejarCompra}
              style={{
                width: '100%',
                backgroundColor: yaEnBiblioteca ? '#334155' : '#10B981',
                color: '#FFF',
                border: 'none',
                padding: '14px',
                borderRadius: '30px',
                fontWeight: '800',
                fontSize: '15px',
                cursor: yaEnBiblioteca ? 'default' : 'pointer',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)',
                transition: 'transform 0.2s ease'
              }}
            >
              {yaEnBiblioteca ? 'En tu Biblioteca' : usuarioLogueado ? 'Comprar y Añadir a Biblioteca' : 'Inicia sesión para comprar'}
            </button>
          </div>
        </div>
      </div>

      {/* 💻 Requerimientos del Sistema */}
      <div style={{ 
        backgroundColor: '#151F33', 
        padding: '30px', 
        borderRadius: '16px', 
        border: '1px solid #23324A' 
      }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', color: '#F8FAFC', borderBottom: '1px solid #23324A', paddingBottom: '10px' }}>
          Requerimientos del Sistema (PC)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', fontSize: '13px', color: '#94A3B8', lineHeight: '1.6' }}>
          <div>
            <strong style={{ color: '#F8FAFC', display: 'block', marginBottom: '6px' }}>Mínimos:</strong>
            • SO: Windows 10 de 64 bits<br />
            • Procesador: Core i5-3570K o FX-8310<br />
            • Memoria RAM: 8 GB<br />
            • Gráficos: GTX 780 o RX 470<br />
            • Almacenamiento: 70 GB disponibles
          </div>
          <div>
            <strong style={{ color: '#F8FAFC', display: 'block', marginBottom: '6px' }}>Recomendados:</strong>
            • SO: Windows 10/11 de 64 bits<br />
            • Procesador: Core i7-4790 o Ryzen 3 3200G<br />
            • Memoria RAM: 12 GB<br />
            • Gráficos: GTX 1060 o R9 Fury<br />
            • Almacenamiento: 70 GB SSD
          </div>
        </div>
      </div>
    </div>
  );
};