// src/components/juegos/BibliotecaJuegos.tsx
import React, { useState } from 'react';

interface JuegoBiblioteca {
  id: number;
  titulo: string;
  horasJugadas: number;
  instalado: boolean;
}

export const BibliotecaJuegos: React.FC = () => {
  // 🎮 Datos de prueba para la biblioteca
  const [juegosBiblioteca, setJuegosBiblioteca] = useState<JuegoBiblioteca[]>([
    { id: 1, titulo: 'Cyberpunk 2077', horasJugadas: 24.5, instalado: true },
    { id: 2, titulo: 'Minecraft', horasJugadas: 112.0, instalado: false },
    { id: 3, titulo: 'The Witcher 3: Wild Hunt', horasJugadas: 45.2, instalado: true },
  ]);

  const toggleInstalacion = (id: number) => {
    setJuegosBiblioteca(prev =>
      prev.map(juego =>
        juego.id === id ? { ...juego, instalado: !juego.instalado } : juego
      )
    );
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ color: '#F8FAFC', margin: '0 0 8px 0', fontSize: '24px', fontWeight: '600' }}>Mi Biblioteca</h2>
        <p style={{ color: '#94A3B8', fontSize: '14px', margin: 0 }}>
          Gestiona tus juegos adquiridos, verifica horas de juego e instálalos en tu equipo.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {juegosBiblioteca.map(juego => (
          <div 
            key={juego.id}
            style={{ 
              backgroundColor: '#1E293B', 
              border: '1px solid #334155', 
              borderRadius: '12px', 
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)'
            }}
          >
            <div>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', color: '#F8FAFC', fontWeight: '600' }}>
                {juego.titulo}
              </h3>
              <p style={{ fontSize: '13px', color: '#94A3B8', margin: '0 0 16px 0' }}>
                Tiempo de juego: <strong style={{ color: '#38BDF8' }}>{juego.horasJugadas} hrs</strong>
              </p>
            </div>

            <button
              onClick={() => toggleInstalacion(juego.id)}
              style={{
                backgroundColor: juego.instalado ? '#334155' : '#10B981',
                color: '#FFF',
                border: 'none',
                padding: '10px 16px',
                borderRadius: '8px',
                fontWeight: '700',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                textAlign: 'center'
              }}
            >
              {juego.instalado ? 'Desinstalar' : 'Instalar'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};