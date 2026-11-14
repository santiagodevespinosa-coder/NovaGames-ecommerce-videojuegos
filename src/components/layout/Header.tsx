// src/components/layout/Header.tsx
import { useNavigate } from 'react-router-dom';
import type { Usuario } from '../../types';

interface HeaderProps {
  terminoBusqueda: string;
  onBusquedaChange: (valor: string) => void;
  usuarioLogueado: Usuario | null;
  onAbrirLogin: (modo?: 'login' | 'register') => void;
  onCerrarSesion: () => void;
}

export function Header({
  terminoBusqueda,
  onBusquedaChange,
  usuarioLogueado,
  onAbrirLogin,
  onCerrarSesion,
}: HeaderProps) {
  const navigate = useNavigate();

  const puedeAdministrar =
    usuarioLogueado?.tipoUsuario === 'Admin' ||
    usuarioLogueado?.tipoUsuario === 'Desarrollador';

  return (
    <header className="flex justify-between items-center py-4 px-8 bg-bg-principal border-b border-borde">
      <div className="w-[300px]">
        <input
          type="text"
          placeholder="Search store..."
          value={terminoBusqueda}
          onChange={(e) => onBusquedaChange(e.target.value)}
          className="w-full py-2.5 px-4 bg-bg-tarjeta border border-borde rounded-[30px] text-texto-principal text-[13px] outline-none box-border focus:border-primario"
        />
      </div>

      <div className="flex items-center gap-3">
        {usuarioLogueado ? (
          <div className="flex items-center gap-3">
            {puedeAdministrar && (
              <button
                onClick={() => navigate('/admin')}
                className="bg-[#1E293B] text-primario border border-primario py-2 px-4 rounded-[20px] font-bold text-[13px] cursor-pointer"
              >
                ⚙️ Panel Admin
              </button>
            )}

            <div className="flex items-center gap-2">
              <span className="text-texto-principal text-sm font-semibold">
                {usuarioLogueado.nombreUsuario}
              </span>
              <div className="w-8 h-8 rounded-full bg-exito flex items-center justify-center text-bg-principal font-bold text-sm">
                {usuarioLogueado.nombreUsuario.charAt(0).toUpperCase()}
              </div>
            </div>

            <button
              onClick={onCerrarSesion}
              className="bg-transparent text-[#EF4444] border border-[#EF4444] py-1.5 px-3 rounded-[20px] font-semibold text-xs cursor-pointer"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onAbrirLogin('login')}
              className="bg-transparent text-texto-principal border border-[#334155] py-[9px] px-[18px] rounded-[20px] font-bold text-[13px] cursor-pointer transition-all duration-200"
            >
              Iniciar Sesión
            </button>

            <button
              onClick={() => onAbrirLogin('register')}
              className="bg-exito text-white border-none py-[9px] px-[18px] rounded-[20px] font-bold text-[13px] cursor-pointer shadow-[0_4px_12px_rgba(16,185,129,0.3)] transition-transform duration-200"
            >
              Registrarse
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
