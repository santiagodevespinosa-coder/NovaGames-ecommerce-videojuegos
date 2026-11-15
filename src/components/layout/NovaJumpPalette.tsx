// src/components/layout/NovaJumpPalette.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Juego, Usuario } from '../../types';
import { getPortraitImageUrl } from '../../utils/gameImages';
import { playClick } from '../../utils/novaAudio';
import { navigateWithTransition } from '../../utils/viewTransition';

interface NovaJumpPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  juegos: Juego[];
  usuarioLogueado: Usuario | null;
  sfxEnabled: boolean;
  onToggleSfx: () => void;
}

type PaletteItem =
  | { kind: 'game'; id: string; label: string; sublabel: string; juego: Juego }
  | {
      kind: 'action';
      id: string;
      label: string;
      sublabel: string;
      run: () => void;
    };

export const NovaJumpPalette: React.FC<NovaJumpPaletteProps> = ({
  isOpen,
  onClose,
  juegos,
  usuarioLogueado,
  sfxEnabled,
  onToggleSfx,
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  const items = useMemo<PaletteItem[]>(() => {
    const q = query.trim().toLowerCase();

    const quickActions: PaletteItem[] = [
      {
        kind: 'action',
        id: 'act-store',
        label: 'Ir al Catálogo',
        sublabel: 'Navegación • Tienda principal',
        run: () => navigateWithTransition(navigate, '/'),
      },
      {
        kind: 'action',
        id: 'act-library',
        label: 'Abrir NovaVault (Biblioteca)',
        sublabel: 'Navegación • Juegos instalados',
        run: () => navigateWithTransition(navigate, '/biblioteca'),
      },
      {
        kind: 'action',
        id: 'act-sfx',
        label: sfxEnabled ? 'Silenciar Audio UI (SFX)' : 'Activar Audio UI (SFX)',
        sublabel: 'Sistema • Web Audio Synth',
        run: onToggleSfx,
      },
    ];

    if (
      usuarioLogueado?.tipoUsuario === 'Admin' ||
      usuarioLogueado?.tipoUsuario === 'Desarrollador'
    ) {
      quickActions.push({
        kind: 'action',
        id: 'act-admin',
        label: 'Abrir Panel Admin',
        sublabel: 'Gestión • Catálogo y stock',
        run: () => navigateWithTransition(navigate, '/admin'),
      });
    }

    const filteredGames: PaletteItem[] = juegos
      .filter((j) => !q || j.titulo.toLowerCase().includes(q))
      .slice(0, 8)
      .map((j) => ({
        kind: 'game',
        id: `game-${j.id}`,
        label: j.titulo,
        sublabel: j.precio === 0 ? 'Gratis' : `$${j.precio.toFixed(2)}`,
        juego: j,
      }));

    const filteredActions = q
      ? quickActions.filter(
          (a) =>
            a.label.toLowerCase().includes(q) ||
            a.sublabel.toLowerCase().includes(q)
        )
      : quickActions;

    return [...filteredGames, ...filteredActions];
  }, [juegos, navigate, onToggleSfx, query, sfxEnabled, usuarioLogueado]);

  if (!isOpen) return null;

  const safeIndex = items.length > 0 ? selectedIndex % items.length : 0;
  const activeItem = items[safeIndex];
  const previewJuego = activeItem?.kind === 'game' ? activeItem.juego : null;
  const previewImg = previewJuego
    ? getPortraitImageUrl(previewJuego.imagenUrl)
    : undefined;

  const executeItem = (item: PaletteItem | undefined) => {
    if (!item) return;
    playClick();
    if (item.kind === 'game') {
      navigateWithTransition(navigate, `/juego/${item.juego.id}`);
    } else {
      item.run();
    }
    setQuery('');
    setSelectedIndex(0);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setQuery('');
      setSelectedIndex(0);
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (items.length > 0) setSelectedIndex((prev) => (prev + 1) % items.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (items.length > 0)
        setSelectedIndex((prev) => (prev - 1 + items.length) % items.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      executeItem(activeItem);
    }
  };

  return (
    <div
      onClick={onClose}
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-start justify-center pt-[12vh] px-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-[#0B1220]/95 border border-primario/35 rounded-xl shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_40px_rgba(56,189,248,0.18)] overflow-hidden"
      >
        {/* Barra de búsqueda */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-primario/20 bg-[#070B14]/80">
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-primario px-2 py-0.5 rounded bg-primario/10 border border-primario/30">
            NovaJump
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Buscar juego o comando rápido..."
            className="flex-1 bg-transparent text-texto-principal text-sm outline-none placeholder:text-texto-secundario/60"
          />
          <kbd className="font-mono text-[10px] text-texto-secundario border border-borde px-1.5 py-0.5 rounded">
            ESC
          </kbd>
        </div>

        {/* Resultados + Preview */}
        <div className="grid grid-cols-1 md:grid-cols-[1.35fr_1fr] max-h-[400px]">
          <div className="overflow-y-auto p-2 space-y-1">
            {items.length === 0 ? (
              <div className="p-6 text-center text-xs text-texto-secundario">
                Sin coincidencias para &ldquo;{query}&rdquo;
              </div>
            ) : (
              items.map((item, idx) => {
                const selected = idx === safeIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onMouseEnter={() => setSelectedIndex(idx)}
                    onClick={() => executeItem(item)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center justify-between gap-2 transition-colors cursor-pointer ${
                      selected
                        ? 'bg-primario/15 border border-primario/40 text-texto-principal'
                        : 'border border-transparent text-texto-secundario hover:bg-white/5'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="text-sm font-bold truncate">
                        {item.label}
                      </div>
                      <div className="text-[11px] opacity-75 truncate">
                        {item.sublabel}
                      </div>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-primario shrink-0">
                      {item.kind === 'game' ? 'Juego' : 'Cmd'}
                    </span>
                  </button>
                );
              })
            )}
          </div>

          <div className="hidden md:flex flex-col justify-between p-4 border-l border-primario/15 bg-[#070B14]/60">
            {previewJuego ? (
              <>
                <div className="h-44 rounded-lg overflow-hidden border border-primario/25 bg-bg-principal mb-3">
                  {previewImg ? (
                    <img
                      src={previewImg}
                      alt={previewJuego.titulo}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-texto-secundario">
                      Sin portada
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-sm font-extrabold text-texto-principal truncate">
                    {previewJuego.titulo}
                  </div>
                  <p className="text-xs text-texto-secundario line-clamp-2 mt-1 mb-0">
                    {previewJuego.descripcion}
                  </p>
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-xs text-texto-secundario gap-2">
                <span className="font-mono text-primario uppercase tracking-widest text-[11px]">
                  Launcher Ready
                </span>
                <span>Usa ↑ ↓ para navegar y Enter para ejecutar.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
