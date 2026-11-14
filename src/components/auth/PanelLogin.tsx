// src/components/auth/PanelLogin.tsx
import React, { useState } from 'react';

interface PanelLoginProps {
  onLoginExitoso: (nombreUsuario: string) => void;
  onCerrar: () => void;
}

export const PanelLogin: React.FC<PanelLoginProps> = ({ onLoginExitoso, onCerrar }) => {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (usuario.trim()) {
      onLoginExitoso(usuario);
    }
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black/75 flex items-center justify-center z-[1000] backdrop-blur-xs">
      <div className="bg-bg-tarjeta border border-borde rounded-2xl p-8 w-full max-w-[400px] shadow-2xl text-texto-principal">
        <div className="flex justify-between items-center mb-6">
          <h2 className="m-0 text-xl font-bold">Iniciar Sesión</h2>
          <button 
            onClick={onCerrar}
            className="bg-transparent border-none text-texto-secundario text-lg cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-[13px] text-texto-secundario mb-1.5">
              Nombre de Usuario
            </label>
            <input 
              type="text" 
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              placeholder="Ej. Santiago"
              required
              className="w-full py-3 px-3.5 bg-bg-superficie border border-borde rounded-lg text-texto-principal text-sm box-border outline-none focus:border-primario"
            />
          </div>

          <div>
            <label className="block text-[13px] text-texto-secundario mb-1.5">
              Contraseña
            </label>
            <input 
              type="password" 
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full py-3 px-3.5 bg-bg-superficie border border-borde rounded-lg text-texto-principal text-sm box-border outline-none focus:border-primario"
            />
          </div>

          <button 
            type="submit"
            className="mt-2 bg-exito text-white border-none p-3 rounded-lg font-bold text-[15px] cursor-pointer transition-opacity duration-200 hover:opacity-90"
          >
            Entrar a Nova Games
          </button>
        </form>
      </div>
    </div>
  );
};