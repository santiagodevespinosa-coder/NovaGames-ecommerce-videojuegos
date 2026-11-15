// src/components/layout/Header.tsx
import { useLocation, useNavigate } from 'react-router-dom';
import type { Usuario } from '../../types';
import { playClick } from '../../utils/novaAudio';
import { navigateWithTransition } from '../../utils/viewTransition';

interface HeaderProps {
  terminoBusqueda: string;
  onBusquedaChange: (valor: string) => void;
  usuarioLogueado: Usuario | null;
  onAbrirLogin: (modo?: 'login' | 'register') => void;
  onCerrarSesion: () => void;
  onAbrirMenu?: () => void;
  onAbrirPalette?: () => void;
  sfxEnabled?: boolean;
  onToggleSfx?: () => void;
}

export function Header({
  terminoBusqueda,
  onBusquedaChange,
  usuarioLogueado,
  onAbrirLogin,
  onCerrarSesion,
  onAbrirMenu,
  onAbrirPalette,
  sfxEnabled = false,
  onToggleSfx,
}: HeaderProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const puedeAdministrar =
    usuarioLogueado?.tipoUsuario === 'Admin' ||
    usuarioLogueado?.tipoUsuario === 'Desarrollador';

  const handleSearchChange = (valor: string) => {
    onBusquedaChange(valor);
    if (valor.trim() && pathname !== '/') {
      navigate('/');
    }
  };

  return (
    <header className="sticky top-0 z-30 flex flex-wrap justify-between items-center gap-3 py-3.5 px-4 sm:px-6 lg:px-8 bg-[#070B14]/82 backdrop-blur-xl border-b border-primario/15">
      <div className="flex items-center gap-3 flex-1 min-w-[200px] max-w-[420px]">
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
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Buscar en la tienda..."
            value={terminoBusqueda}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="nova-blade-chamfer w-full py-2.5 pl-5 pr-9 bg-[#0E1626]/90 border border-primario/25 text-texto-principal text-[13px] outline-none box-border transition-colors focus:border-primario"
          />
          {terminoBusqueda && (
            <button
              type="button"
              onClick={() => {
                playClick();
                onBusquedaChange('');
              }}
              aria-label="Limpiar búsqueda"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-0 text-texto-secundario hover:text-primario text-xs font-bold cursor-pointer p-1"
            >
              ✕
            </button>
          )}
        </div>
        {onAbrirPalette && (
          <button
            type="button"
            onClick={onAbrirPalette}
            title="Abrir NovaJump (Ctrl+K)"
            className="hidden sm:inline-flex items-center gap-1.5 nova-blade-chamfer bg-[#0E1626]/90 border border-primario/25 hover:border-primario text-texto-secundario hover:text-primario px-3 py-2 font-mono text-[11px] font-bold shrink-0 cursor-pointer transition-colors"
          >
            <span>Jump</span>
            <kbd className="text-[10px] text-primario">Ctrl+K</kbd>
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        {onToggleSfx && (
          <button
            type="button"
            onClick={onToggleSfx}
            aria-pressed={sfxEnabled}
            title="Audio UI Sintetizado"
            className={`nova-blade-chamfer inline-flex items-center gap-1.5 px-3 py-2 font-mono text-[11px] font-bold border cursor-pointer transition-colors ${
              sfxEnabled
                ? 'bg-primario/15 border-primario/50 text-primario'
                : 'bg-[#0E1626]/80 border-borde text-texto-secundario hover:text-texto-principal'
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
              {sfxEnabled ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5zm4.54 3.46a5 5 0 010 7.07m2.83-9.9a9 9 0 010 12.73" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5L6 9H2v6h4l5 4V5zm12 4l-6 6m0-6l6 6" />
              )}
            </svg>
            <span>{sfxEnabled ? 'SFX ON' : 'SFX OFF'}</span>
          </button>
        )}
        {usuarioLogueado ? (
          <div className="flex items-center gap-3">
            {puedeAdministrar && (
              <button
                onClick={() => {
                  playClick();
                  navigateWithTransition(navigate, '/admin');
                }}
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
