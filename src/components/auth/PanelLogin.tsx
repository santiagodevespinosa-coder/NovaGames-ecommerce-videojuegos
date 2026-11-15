// src/components/auth/PanelLogin.tsx
import React, { useState } from 'react';
import { authService } from '../../services/authService';
import type { Usuario } from '../../types';

interface PanelLoginProps {
  initialMode?: 'login' | 'register';
  onLoginExitoso: (usuario: Usuario) => void;
  onCerrar: () => void;
}

const inputClass =
  'w-full py-3 px-3.5 bg-bg-superficie/90 border border-borde rounded-lg text-texto-principal text-sm box-border outline-none transition-all focus:border-primario focus:shadow-[0_0_12px_rgba(56,189,248,0.2)]';
const labelClass = 'block text-[13px] text-texto-secundario mb-1.5';

export const PanelLogin: React.FC<PanelLoginProps> = ({
  initialMode = 'login',
  onLoginExitoso,
  onCerrar,
}) => {
  const [modo, setModo] = useState<'login' | 'register'>(initialMode);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setEnviando(true);

    try {
      const datos =
        modo === 'login'
          ? await authService.login({ email: email.trim(), password: clave })
          : await authService.signup({
              nombreUsuario: nombreUsuario.trim(),
              email: email.trim(),
              password: clave,
              tipoUsuario: 'Cliente',
            });

      onLoginExitoso(datos.usuario);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error al autenticar.');
    } finally {
      setEnviando(false);
    }
  };

  const alternarModo = () => {
    setError(null);
    setModo((prev) => (prev === 'login' ? 'register' : 'login'));
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black/75 flex items-center justify-center z-[1000] backdrop-blur-sm p-4">
      <div className="bg-bg-tarjeta/95 border border-primario/35 rounded-2xl p-6 sm:p-8 w-full max-w-[420px] shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_40px_rgba(56,189,248,0.12)] text-texto-principal">
        <div className="flex justify-between items-center mb-6">
          <h2 className="m-0 text-xl font-bold">
            {modo === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </h2>
          <button
            onClick={onCerrar}
            className="bg-transparent border-none text-texto-secundario text-lg cursor-pointer hover:text-texto-principal"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-[#EF4444]/40 bg-[#EF4444]/10 px-3.5 py-2.5 text-xs text-[#FCA5A5]">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          {modo === 'register' && (
            <div>
              <label className={labelClass}>Nombre de Usuario</label>
              <input
                type="text"
                value={nombreUsuario}
                onChange={(e) => setNombreUsuario(e.target.value)}
                placeholder="Ej. gamer_pro99"
                className={inputClass}
              />
            </div>
          )}

          <div>
            <label className={labelClass}>Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Contraseña</label>
            <input
              type="password"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              placeholder="••••••••"
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={enviando}
            className="mt-2 nova-btn-primary text-white p-3 rounded-[30px] font-bold text-[15px] cursor-pointer disabled:opacity-50"
          >
            {enviando
              ? 'Procesando...'
              : modo === 'login'
                ? 'Entrar a Nova Games'
                : 'Registrarme en Nova Games'}
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-texto-secundario">
          {modo === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
          <button
            type="button"
            onClick={alternarModo}
            className="bg-transparent border-none p-0 text-primario font-semibold cursor-pointer hover:underline"
          >
            {modo === 'login' ? 'Regístrate aquí' : 'Inicia sesión'}
          </button>
        </div>
      </div>
    </div>
  );
};
