// src/components/layout/Sidebar.tsx
import { useLocation, useNavigate } from 'react-router-dom';
import logoNovaGames from '../../assets/logo_nova_games.webp';
import libraryIcon from '../../assets/library.webp';
import storeIcon from '../../assets/store.webp';
import type { JuegoBiblioteca } from '../juegos/BibliotecaJuegos';
import { playClick } from '../../utils/novaAudio';
import { navigateWithTransition } from '../../utils/viewTransition';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  juegosBiblioteca?: JuegoBiblioteca[];
}

export function Sidebar({
  isOpen = false,
  onClose,
  juegosBiblioteca = [],
}: SidebarProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleNavigate = (path: string) => {
    playClick();
    navigateWithTransition(navigate, path);
    onClose?.();
  };

  const isStore = pathname === '/' || pathname.startsWith('/juego/');
  const isLibrary = pathname === '/biblioteca';
  const instalados = juegosBiblioteca.filter((j) => j.instalado);

  const navButtonClass = (active: boolean) =>
    `nova-blade-tab relative flex items-center justify-between gap-3 w-full py-3 pl-4 pr-5 font-semibold text-sm cursor-pointer text-left transition-all duration-200 border-0 border-l-2 ${
      active
        ? 'bg-gradient-to-r from-primario/20 via-blue-500/10 to-transparent text-primario border-primario shadow-[inset_0_0_20px_rgba(56,189,248,0.12)]'
        : 'bg-transparent border-transparent text-texto-secundario hover:text-texto-principal hover:bg-white/5 hover:border-primario/40'
    }`;

  return (
    <>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-40 lg:hidden"
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[240px] bg-[#070B14]/90 backdrop-blur-md border-r border-primario/15 flex flex-col py-5 px-4 box-border shrink-0 overflow-y-auto transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-5">
          <button
            type="button"
            onClick={() => handleNavigate('/')}
            className="group relative bg-transparent border-0 p-1 cursor-pointer flex items-center justify-center flex-1"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-2 rounded-full bg-[radial-gradient(circle,rgba(56,189,248,0.45)_0%,rgba(168,85,247,0.24)_45%,transparent_72%)] blur-xl opacity-85 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute w-28 h-28 lg:w-32 lg:h-32 rounded-full border border-primario/25 group-hover:border-primario/60 group-hover:scale-105 transition-all duration-300"
            />
            <img
              src={logoNovaGames}
              alt="Nova Games Logo"
              className="relative z-10 w-32 h-32 lg:w-36 lg:h-36 object-contain drop-shadow-[0_0_22px_rgba(56,189,248,0.65)] drop-shadow-[0_4px_12px_rgba(168,85,247,0.4)] group-hover:scale-105 group-hover:-translate-y-0.5 transition-transform duration-300"
            />
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar menú"
              className="lg:hidden text-texto-secundario hover:text-texto-principal bg-transparent border border-borde rounded-lg w-8 h-8 flex items-center justify-center cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        <nav className="flex flex-col gap-1.5">
          <button onClick={() => handleNavigate('/')} className={navButtonClass(isStore)}>
            <span className="flex items-center gap-3">
              <img
                src={storeIcon}
                alt=""
                className="w-5 h-5 object-contain shrink-0"
              />
              Tienda
            </span>
          </button>

          <button onClick={() => handleNavigate('/biblioteca')} className={navButtonClass(isLibrary)}>
            <span className="flex items-center gap-3">
              <img
                src={libraryIcon}
                alt=""
                className="w-5 h-5 object-contain shrink-0"
              />
              Biblioteca
            </span>
            {juegosBiblioteca.length > 0 && (
              <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-primario/15 text-primario border border-primario/30">
                {juegosBiblioteca.length}
              </span>
            )}
          </button>
        </nav>

        {/* Acceso rápido a juegos instalados */}
        <div className="mt-7 pt-5 border-t border-primario/15">
          <span className="block px-3 mb-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-texto-secundario">
            Instalados ({instalados.length})
          </span>
          {instalados.length === 0 ? (
            <p className="px-3 text-xs text-texto-secundario/70 leading-relaxed m-0">
              Instala un título desde tu Biblioteca para verlo aquí.
            </p>
          ) : (
            <div className="flex flex-col gap-1">
              {instalados.slice(0, 5).map((juego) => (
                <button
                  key={juego.id}
                  type="button"
                  onClick={() => handleNavigate('/biblioteca')}
                  className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-left text-xs font-semibold text-texto-secundario hover:text-primario hover:bg-white/5 bg-transparent border-0 cursor-pointer transition-colors"
                >
                  <span className="w-2 h-2 rounded-full bg-exito shrink-0 shadow-[0_0_6px_#10B981]" />
                  <span className="truncate">{juego.titulo}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Estado del Launcher */}
        <div className="mt-auto pt-5">
          <div className="rounded-xl bg-[#0B1220]/85 border border-primario/20 px-3.5 py-3 flex items-center justify-between">
            <div>
              <div className="font-mono text-[10px] font-bold uppercase tracking-widest text-primario">
                NovaClient
              </div>
              <div className="text-[11px] text-texto-secundario">
                Red lista • 18 ms
              </div>
            </div>
            <span className="w-2 h-2 rounded-full bg-exito shadow-[0_0_8px_#10B981]" />
          </div>
        </div>
      </aside>
    </>
  );
}
