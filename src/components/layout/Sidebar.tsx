// src/components/layout/Sidebar.tsx
import { useLocation, useNavigate } from 'react-router-dom';
import logoNovaGames from '../../assets/logo_nova_games.webp';
import libraryIcon from '../../assets/library.webp';
import storeIcon from '../../assets/store.webp';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
    onClose?.();
  };

  const isStore = pathname === '/' || pathname.startsWith('/juego/');
  const isLibrary = pathname === '/biblioteca';

  const navButtonClass = (active: boolean) =>
    `nova-blade-tab relative flex items-center gap-3 w-full py-3 pl-4 pr-6 font-semibold text-sm cursor-pointer text-left transition-all duration-200 border-0 border-l-2 ${
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
        className={`fixed inset-y-0 left-0 z-50 w-[240px] bg-[#070B14]/88 backdrop-blur-md border-r border-primario/15 flex flex-col py-6 px-4 box-border shrink-0 overflow-y-auto transition-transform duration-200 lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-6 pl-2">
          <img
            src={logoNovaGames}
            alt="Nova Games Logo"
            className="w-[160px] h-[160px] lg:w-[200px] lg:h-[200px] object-contain"
          />
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

        <nav className="flex flex-col gap-2">
          <button onClick={() => handleNavigate('/')} className={navButtonClass(isStore)}>
            <img
              src={storeIcon}
              alt=""
              className="w-5 h-5 object-contain shrink-0"
            />
            Tienda
          </button>

          <button onClick={() => handleNavigate('/biblioteca')} className={navButtonClass(isLibrary)}>
            <img
              src={libraryIcon}
              alt=""
              className="w-5 h-5 object-contain shrink-0"
            />
            Biblioteca
          </button>
        </nav>

      <div className="mt-8 pt-6 border-t border-borde">
        <span className="block px-4 mb-2 text-[11px] font-bold uppercase tracking-wider text-texto-secundario">
          Conceptos UI
        </span>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => navigate('/concept')}
            className={navButtonClass(pathname === '/concept')}
          >
            ⚡ Maximalist
          </button>
          <button
            onClick={() => navigate('/concept-futuristic')}
            className={navButtonClass(pathname === '/concept-futuristic')}
          >
            🛸 Futuristic
          </button>
          <button
            onClick={() => navigate('/concept-strange')}
            className={navButtonClass(pathname === '/concept-strange')}
          >
            👾 Strange BIOS
          </button>
          <button
            onClick={() => navigate('/concept-art')}
            className={navButtonClass(pathname === '/concept-art')}
          >
            🎨 Concept Art
          </button>
          <button
            onClick={() => navigate('/concept-enchanted')}
            className={navButtonClass(pathname === '/concept-enchanted')}
          >
            🦌 Enchanted
          </button>
          <button
            onClick={() => navigate('/concept-amalgam')}
            className={navButtonClass(pathname === '/concept-amalgam')}
          >
            🌀 Weird Amalgam
          </button>
          <button
            onClick={() => navigate('/concept-blades')}
            className={navButtonClass(pathname === '/concept-blades')}
          >
            🗡️ Blade Pillars
          </button>
          <button
            onClick={() => navigate('/concept-glass')}
            className={navButtonClass(pathname === '/concept-glass')}
          >
            🪟 Glassmorphism
          </button>
          <button
            onClick={() => navigate('/concept-neu')}
            className={navButtonClass(pathname === '/concept-neu')}
          >
            🫧 Neumorphism
          </button>
          <button
            onClick={() => navigate('/concept-cyberpunk')}
            className={navButtonClass(pathname === '/concept-cyberpunk')}
          >
            🌆 Cyberpunk
          </button>
          <button
            onClick={() => navigate('/concept-3d')}
            className={navButtonClass(pathname === '/concept-3d')}
          >
            🧊 3D Launcher
          </button>
        </div>
      </div>
      </aside>
    </>
  );
}
