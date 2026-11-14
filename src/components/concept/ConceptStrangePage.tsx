// src/components/concept/ConceptStrangePage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Juego } from '../../types';

interface ConceptStrangePageProps {
  juegos: Juego[];
}

export function ConceptStrangePage({ juegos }: ConceptStrangePageProps) {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<number>(juegos[0]?.id ?? 1);
  const [distortion, setDistortion] = useState(false);
  const [commandInput, setCommandInput] = useState('');
  const [terminalLog, setTerminalLog] = useState<string[]>([
    'NOVA_BIOS v0.99-ANOMALY // MOUNTED /dev/juegos',
    'TYPE "help" OR CLICK ANY SPECIMEN CARTRIDGE TO INSPECT.',
  ]);

  const selectedGame = juegos.find((j) => j.id === selectedId) ?? juegos[0];

  const appendLog = (line: string) => {
    setTerminalLog((prev) => [...prev.slice(-4), line]);
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = commandInput.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === 'help') {
      appendLog('> help :: commands = [list, glitch, open, clear]');
    } else if (cmd === 'list') {
      appendLog(`> list :: ${juegos.map((j) => `[${j.id}:${j.titulo}]`).join(' ')}`);
    } else if (cmd === 'glitch') {
      setDistortion((prev) => !prev);
      appendLog('> glitch :: toggled CRT signal distortion');
    } else if (cmd === 'open' && selectedGame) {
      navigate(`/juego/${selectedGame.id}`);
    } else if (cmd === 'clear') {
      setTerminalLog(['NOVA_BIOS // BUFFER CLEARED.']);
    } else {
      appendLog(`> "${cmd}" :: UNKNOWN OPCODE. TRY "help".`);
    }

    setCommandInput('');
  };

  const rotations = ['-rotate-1', 'rotate-1', '-rotate-2'];

  return (
    <div
      className={`relative min-h-full overflow-hidden rounded-xl border-2 border-dashed border-exito/50 bg-bg-principal p-6 font-mono text-texto-principal transition-transform duration-300 ${
        distortion ? 'skew-x-[0.6deg] hue-rotate-15' : ''
      }`}
    >
      {/* CRT Scanline Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 opacity-20"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(56,189,248,0.15) 0px, rgba(56,189,248,0.15) 1px, transparent 1px, transparent 4px)',
        }}
      />

      {/* Top BIOS Status Strip */}
      <div className="relative z-10 mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-dashed border-borde pb-4">
        <div>
          <p className="m-0 text-[11px] tracking-[0.3em] text-exito uppercase">
            [!] ANOMALOUS_STOREFRONT_DETECTED
          </p>
          <h1 className="m-0 mt-1 text-2xl font-black tracking-tight text-primario">
            NOVA_BIOS // CARTRIDGE_LAB.EXE
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDistortion((prev) => !prev)}
            className={`cursor-pointer border px-3 py-1.5 text-xs font-bold uppercase transition ${
              distortion
                ? 'border-exito bg-exito text-bg-principal'
                : 'border-primario/50 bg-bg-superficie text-primario hover:bg-primario/10'
            }`}
          >
            {distortion ? 'SIGNAL: CORRUPTED' : 'SIGNAL: STABLE'}
          </button>

          <button
            onClick={() => navigate('/')}
            className="cursor-pointer border border-borde bg-bg-tarjeta px-3 py-1.5 text-xs text-texto-secundario hover:border-primario hover:text-texto-principal"
          >
            [ESC] EXIT
          </button>
        </div>
      </div>

      {/* Interactive Command Terminal */}
      <section className="relative z-10 mb-8 rounded-lg border border-primario/40 bg-bg-superficie/90 p-4">
        <div className="mb-3 space-y-1 text-xs text-texto-secundario">
          {terminalLog.map((line, i) => (
            <div key={i} className={i === terminalLog.length - 1 ? 'text-exito' : ''}>
              {line}
            </div>
          ))}
        </div>

        <form onSubmit={handleCommand} className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-primario">root@novagames:~$</span>
          <input
            type="text"
            value={commandInput}
            onChange={(e) => setCommandInput(e.target.value)}
            placeholder="type 'help', 'list', 'glitch', or 'open'..."
            className="min-w-[200px] flex-1 border-none bg-transparent text-xs text-texto-principal placeholder:text-texto-secundario/60 focus:outline-none"
          />
          <div className="flex gap-1.5">
            {(['help', 'list', 'glitch'] as const).map((quick) => (
              <button
                key={quick}
                type="button"
                onClick={() => {
                  if (quick === 'glitch') {
                    setDistortion((p) => !p);
                    appendLog('> glitch :: toggled CRT signal distortion');
                  } else if (quick === 'list') {
                    appendLog(`> list :: ${juegos.map((j) => `[${j.id}:${j.titulo}]`).join(' ')}`);
                  } else {
                    appendLog('> help :: commands = [list, glitch, open, clear]');
                  }
                }}
                className="cursor-pointer border border-borde bg-bg-principal px-2 py-0.5 text-[10px] text-primario hover:border-primario"
              >
                {quick}
              </button>
            ))}
          </div>
        </form>
      </section>

      {/* Main Strange Workspace: Scattered Cartridges + Specimen Inspector */}
      <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left 7 Cols: Tilted Physical Data Cartridges */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-7">
          {juegos.map((juego, idx) => {
            const isSelected = selectedGame?.id === juego.id;
            const rotClass = rotations[idx % rotations.length];

            return (
              <div
                key={juego.id}
                onClick={() => {
                  setSelectedId(juego.id);
                  appendLog(`> MOUNTED CARTRIDGE_0${juego.id} (${juego.titulo})`);
                }}
                className={`cursor-pointer border-2 bg-bg-tarjeta p-3 transition-all duration-300 hover:rotate-0 hover:scale-[1.02] ${rotClass} ${
                  isSelected
                    ? 'border-exito shadow-[0_0_25px_rgba(16,185,129,0.25)]'
                    : 'border-borde hover:border-primario'
                }`}
              >
                {/* Cartridge Grip Ridges */}
                <div className="mb-3 flex items-center justify-between border-b border-borde pb-2">
                  <div className="flex flex-col gap-1">
                    <span className="block h-0.5 w-14 bg-borde" />
                    <span className="block h-0.5 w-10 bg-primario/60" />
                  </div>
                  <span className="text-[10px] font-bold text-primario">
                    HEX_0x0{juego.id}F{idx + 4}
                  </span>
                </div>

                {/* Cartridge Label Art */}
                <div className="relative mb-3 h-36 overflow-hidden border border-borde bg-bg-principal">
                  {juego.imagenUrl ? (
                    <img
                      src={juego.imagenUrl}
                      alt={juego.titulo}
                      className="h-full w-full object-cover contrast-125"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-texto-secundario">
                      [CORRUPT_IMAGE]
                    </div>
                  )}
                  <span className="absolute right-2 bottom-2 bg-bg-principal/90 px-2 py-0.5 text-xs font-black text-exito">
                    ${juego.precio.toFixed(2)}
                  </span>
                </div>

                <h3 className="m-0 truncate text-sm font-black uppercase text-texto-principal">
                  {juego.titulo}
                </h3>
                <div className="mt-2 flex items-center justify-between text-[11px] text-texto-secundario">
                  <span>SECTORS: {juego.stock}</span>
                  <span className={isSelected ? 'text-exito' : 'text-primario'}>
                    {isSelected ? '● MOUNTED' : '○ IDLE'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 5 Cols: Specimen Inspector Console */}
        {selectedGame && (
          <aside className="flex flex-col justify-between border-2 border-primario/60 bg-bg-superficie p-5 lg:col-span-5">
            <div>
              <div className="mb-4 flex items-center justify-between border-b border-dashed border-borde pb-2 text-xs">
                <span className="font-bold text-exito">SPECIMEN_INSPECTOR</span>
                <span className="text-texto-secundario">SLOT #0{selectedGame.id}</span>
              </div>

              <div className="mb-4 border border-borde bg-bg-principal p-3">
                <div className="mb-1 text-[10px] text-texto-secundario">DESIGNATION</div>
                <div className="text-lg font-black uppercase text-primario">
                  {selectedGame.titulo}
                </div>
              </div>

              <p className="m-0 mb-5 text-xs leading-relaxed text-texto-secundario">
                {selectedGame.descripcion}
              </p>

              {/* Fake Signal Integrity Meter */}
              <div className="mb-6 space-y-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-texto-secundario">SIGNAL_INTEGRITY</span>
                  <span className="text-exito">98.4%</span>
                </div>
                <div className="h-2 w-full bg-bg-principal p-0.5">
                  <div className="h-full w-[94%] bg-gradient-to-r from-primario to-exito" />
                </div>
              </div>
            </div>

            <div className="border-t border-dashed border-borde pt-4">
              <div className="mb-3 flex items-baseline justify-between">
                <span className="text-xs text-texto-secundario">EXCHANGE_VALUE</span>
                <span className="text-2xl font-black text-exito">
                  ${selectedGame.precio.toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => navigate(`/juego/${selectedGame.id}`)}
                className="w-full cursor-pointer border-2 border-primario bg-primario/15 py-3 text-xs font-black uppercase tracking-widest text-primario transition hover:bg-primario hover:text-bg-principal"
              >
                [ EXTRACT_LICENSE_AND_PLAY ]
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
