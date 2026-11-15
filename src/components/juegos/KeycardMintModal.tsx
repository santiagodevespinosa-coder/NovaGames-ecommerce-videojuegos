// src/components/juegos/KeycardMintModal.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Juego } from '../../types';
import { getPortraitImageUrl } from '../../utils/gameImages';
import { playClick, playKeycardMint } from '../../utils/novaAudio';
import { navigateWithTransition } from '../../utils/viewTransition';

interface KeycardMintModalProps {
  juego: Juego | null;
  onClose: () => void;
}

const CIPHER_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function buildTargetKey(gameId: number): string {
  const seg1 = ((gameId * 7919) % 9000 + 1000).toString(36).toUpperCase().padStart(4, 'X');
  const seg2 = ((gameId * 4999) % 9000 + 1000).toString(36).toUpperCase().padStart(4, '9');
  return `NOVA-${seg1}-${seg2}`;
}

export const KeycardMintModal: React.FC<KeycardMintModalProps> = ({
  juego,
  onClose,
}) => {
  const navigate = useNavigate();
  const [revealedCount, setRevealedCount] = useState(0);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const targetKey = useMemo(
    () => (juego ? buildTargetKey(juego.id) : ''),
    [juego]
  );

  useEffect(() => {
    if (!juego) return;
    playKeycardMint();
    let count = 0;
    const interval = window.setInterval(() => {
      count += 1;
      setRevealedCount(count);
      if (count >= targetKey.length) {
        window.clearInterval(interval);
      }
    }, 70);
    return () => {
      window.clearInterval(interval);
    };
  }, [juego, targetKey.length]);

  if (!juego) return null;

  const portraitUrl = getPortraitImageUrl(juego.imagenUrl);
  const decodedKey = targetKey
    .split('')
    .map((ch, idx) => {
      if (ch === '-') return '-';
      if (idx < revealedCount) return ch;
      return CIPHER_CHARS[(idx + revealedCount * 3) % CIPHER_CHARS.length];
    })
    .join('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ rx: (0.5 - py) * 18, ry: (px - 0.5) * 18 });
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md flex flex-col items-center gap-6"
      >
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          }}
          className="relative w-full rounded-2xl border border-primario/50 bg-gradient-to-br from-[#0F1B33] via-[#091020] to-[#1A1038] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.9),0_0_45px_rgba(56,189,248,0.28)] transition-transform duration-150 overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="nova-holo-scanlines pointer-events-none absolute inset-0 opacity-45"
          />

          <div className="relative z-10 flex items-center justify-between mb-5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-primario">
              NovaKey // Licencia Activada
            </span>
            <span className="text-[11px] font-bold text-exito bg-exito/15 border border-exito/40 px-2.5 py-0.5 rounded-full">
              En Biblioteca
            </span>
          </div>

          <div className="relative z-10 flex items-center gap-4 mb-6">
            {portraitUrl && (
              <img
                src={portraitUrl}
                alt={juego.titulo}
                className="w-16 h-20 rounded-lg object-cover border border-primario/40 shadow-lg shrink-0"
              />
            )}
            <div className="min-w-0">
              <h3 className="m-0 text-lg font-extrabold text-texto-principal truncate">
                {juego.titulo}
              </h3>
              <p className="m-0 mt-1 text-xs text-texto-secundario">
                Acceso digital permanente desbloqueado
              </p>
            </div>
          </div>

          <div className="relative z-10 bg-[#050811]/90 border border-primario/30 rounded-lg p-3.5 text-center">
            <span className="block font-mono text-[10px] text-texto-secundario uppercase tracking-widest mb-1">
              Clave Cifrada de Activación
            </span>
            <span className="font-mono text-lg font-extrabold tracking-[0.18em] text-primario">
              {decodedKey}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full">
          <button
            type="button"
            onClick={() => {
              playClick();
              onClose();
              navigateWithTransition(navigate, '/biblioteca');
            }}
            className="nova-btn-primary nova-blade-chamfer flex-1 py-3 px-5 text-white font-extrabold text-sm cursor-pointer"
          >
            Ir a Biblioteca
          </button>
          <button
            type="button"
            onClick={() => {
              playClick();
              onClose();
            }}
            className="nova-btn-outline nova-blade-chamfer py-3 px-5 text-texto-principal font-bold text-sm cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
