// src/components/layout/Header.tsx
import { useNavigate } from 'react-router-dom';
import type { Usuario } from '../../types';

interface HeaderProps {
  terminoBusqueda: string;
  onBusquedaChange: (valor: string) => void;
  usuarioLogueado: Usuario | null;
  onAbrirLogin: (modo?: 'login' | 'register') => void;
  onCerrarSesion: () => void;
  onAbrirMenu?: () => void;
}

export function Header({
  terminoBusqueda,
  onBusquedaChange,
  usuarioLogueado,
  onAbrirLogin,
  onCerrarSesion,
  onAbrirMenu,
}: HeaderProps) {
  const navigate = useNavigate();

  const puedeAdministrar =
    usuarioLogueado?.tipoUsuario === 'Admin' ||
    usuarioLogueado?.tipoUsuario === 'Desarrollador';

  return (
    <header className="relative z-30 flex flex-wrap justify-between items-center gap-3 py-3.5 px-4 sm:px-6 lg:px-8 bg-[#070B14]/70 backdrop-blur-md border-b border-primario/15">
      <div className="flex items-center gap-3 flex-1 min-w-[180px] max-w-[360px]">
        {onAbrirMenu && (
          <button
            type="button"
            onClick={onAbrirMenu}
            aria-label="Abrir menú"
            className="lg:hidden nova-btn-outline nova-blade-chamfer text-texto-principal w-11 h-9 flex items-center justify-center shrink-0 cursor-pointer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
        <input
          type="text"
          placeholder="Search store..."
          value={terminoBusqueda}
          onChange={(e) => onBusquedaChange(e.target.value)}
          className="nova-blade-chamfer w-full py-2.5 px-5 bg-[#0E1626]/90 border border-primario/25 text-texto-principal text-[13px] outline-none box-border transition-colors focus:border-primario"
        />
      </div>

      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        {usuarioLogueado ? (
          <div className="flex items-center gap-3">
            {puedeAdministrar && (
              <button
                onClick={() => navigate('/admin')}
                className="nova-btn-outline nova-blade-chamfer text-primario py-2 px-5 font-bold text-[13px] cursor-pointer"
              >
                Panel Admin
              </button>
            )}

            <div className="flex items-center gap-2.5">
              <div className="flex flex-col items-end leading-tight">
                <span className="text-texto-principal text-sm font-semibold">
                  {usuarioLogueado.nombreUsuario}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-exito font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-exito shadow-[0_0_6px_#10B981]" />
                  online
                </span>
              </div>
              <div className="p-[2px] rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_12px_rgba(56,189,248,0.45)]">
                <div className="w-8 h-8 rounded-full bg-bg-superficie flex items-center justify-center text-primario font-extrabold text-sm">
                  {usuarioLogueado.nombreUsuario.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>

            <button
              onClick={onCerrarSesion}
              className="nova-blade-chamfer bg-transparent text-[#EF4444] border border-[#EF4444]/60 hover:border-[#EF4444] py-1.5 px-4 font-semibold text-xs cursor-pointer transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onAbrirLogin('login')}
              className="nova-btn-outline nova-blade-chamfer text-texto-principal py-[9px] px-5 font-bold text-[13px] cursor-pointer"
            >
              Iniciar Sesión
            </button>

            <button
              onClick={() => onAbrirLogin('register')}
              className="nova-btn-primary nova-blade-chamfer text-white py-[9px] px-5 font-bold text-[13px] cursor-pointer"
            >
              Registrarse
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
