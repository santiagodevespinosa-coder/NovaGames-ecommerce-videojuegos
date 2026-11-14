// src/components/layout/Sidebar.tsx
import { useLocation, useNavigate } from 'react-router-dom';
import logoNovaGames from '../../assets/logo_nova_games.webp';

export function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isStore = pathname === '/' || pathname.startsWith('/juego/');
  const isLibrary = pathname === '/biblioteca';

  const navButtonClass = (active: boolean) =>
    `flex items-center gap-3 w-full py-3 px-4 rounded-lg border-none font-semibold text-sm cursor-pointer text-left transition-all duration-200 ${
      active
        ? 'bg-bg-tarjeta text-primario'
        : 'bg-transparent text-texto-secundario hover:text-texto-principal'
    }`;

  return (
    <aside className="w-[240px] bg-bg-superficie border-r border-borde flex flex-col py-6 px-4 box-border shrink-0">
      <div className="flex items-center gap-3 mb-8 pl-2">
        <img
          src={logoNovaGames}
          alt="Nova Games Logo"
          className="w-[200px] h-[200px] object-contain"
        />
      </div>

      <nav className="flex flex-col gap-2">
        <button onClick={() => navigate('/')} className={navButtonClass(isStore)}>
          🏪 Tienda
        </button>

        <button onClick={() => navigate('/biblioteca')} className={navButtonClass(isLibrary)}>
          📚 Biblioteca
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
  );
}
