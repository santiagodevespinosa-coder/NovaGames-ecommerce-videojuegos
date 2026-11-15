// src/components/juegos/RequisitosSistema.tsx
import { useMemo, useState } from 'react';
import { playClick } from '../../utils/novaAudio';

type RigPresetId = 'entry' | 'sweet' | 'ultra' | 'auto';
type ResolutionId = '1080p' | '1440p' | '4K';

interface RigProfile {
  id: RigPresetId;
  label: string;
  gpu: string;
  cpu: string;
  ram: string;
  baseFps1080: number;
}

function detectWebGLGpu(): string {
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return 'GPU WebGL Genérica';
    const webgl = gl as WebGLRenderingContext;
    const ext = webgl.getExtension('WEBGL_debug_renderer_info');
    if (!ext) return 'GPU Detectada (Modo Privado)';
    const renderer = webgl.getParameter(ext.UNMASKED_RENDERER_WEBGL);
    return typeof renderer === 'string' && renderer.trim()
      ? renderer.replace(/ANGLE \((.+)\)/, '$1').slice(0, 52)
      : 'GPU WebGL Genérica';
  } catch {
    return 'GPU Detectada (Modo Privado)';
  }
}

function estimateAutoFps(gpuName: string): number {
  const lower = gpuName.toLowerCase();
  if (/4090|4080|4070|7900|7800|3080|3090|m3 max|m4/.test(lower)) return 138;
  if (/3060|3070|4060|6700|6800|2070|2080|m2|m3/.test(lower)) return 96;
  if (/1660|1650|1060|1070|580|6600|iris|radeon/.test(lower)) return 64;
  return 78;
}

const PRESETS: RigProfile[] = [
  {
    id: 'entry',
    label: 'Entry Rig',
    gpu: 'GTX 1050 Ti 4GB',
    cpu: 'Core i5-8400',
    ram: '8 GB DDR4',
    baseFps1080: 48,
  },
  {
    id: 'sweet',
    label: 'Sweet Spot',
    gpu: 'RTX 3060 12GB',
    cpu: 'Ryzen 5 5600',
    ram: '16 GB DDR4',
    baseFps1080: 102,
  },
  {
    id: 'ultra',
    label: 'Nova Ultra',
    gpu: 'RTX 4080 Super',
    cpu: 'Core i7-14700K',
    ram: '32 GB DDR5',
    baseFps1080: 158,
  },
];

const RES_MULTIPLIER: Record<ResolutionId, number> = {
  '1080p': 1,
  '1440p': 0.72,
  '4K': 0.45,
};

export function RequisitosSistema() {
  const [selectedRig, setSelectedRig] = useState<RigPresetId>('sweet');
  const [resolution, setResolution] = useState<ResolutionId>('1080p');
  const detectedGpu = useMemo(() => detectWebGLGpu(), []);

  const activeProfile: RigProfile =
    selectedRig === 'auto'
      ? {
          id: 'auto',
          label: 'Mi PC (Auto)',
          gpu: detectedGpu,
          cpu: 'Detección WebGL',
          ram: 'Navegador',
          baseFps1080: estimateAutoFps(detectedGpu),
        }
      : PRESETS.find((p) => p.id === selectedRig) ?? PRESETS[1];

  const estimatedFps = Math.max(
    24,
    Math.round(activeProfile.baseFps1080 * RES_MULTIPLIER[resolution])
  );
  const meterPercent = Math.min(100, Math.round((estimatedFps / 144) * 100));

  const tier =
    estimatedFps >= 90
      ? { label: 'Ultra Fluido', color: 'text-exito', bar: 'bg-exito' }
      : estimatedFps >= 55
        ? { label: 'Óptimo 60+ FPS', color: 'text-primario', bar: 'bg-primario' }
        : { label: 'Jugable (Ajustado)', color: 'text-amber-400', bar: 'bg-amber-400' };

  return (
    <div className="nova-blade-chamfer bg-[#0B1220]/85 backdrop-blur-sm p-6 sm:p-7 border border-primario/20 shadow-[0_12px_30px_rgba(0,0,0,0.45)] mb-10">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-primario/15 pb-3 mb-5">
        <h3 className="m-0 text-lg font-extrabold tracking-wide text-texto-principal uppercase">
          Requerimientos del Sistema &amp; Simulador FPS
        </h3>
        <span className="font-mono text-[11px] text-primario uppercase tracking-widest">
          Hardware Profiler // 64-Bit
        </span>
      </div>

      {/* Simulador Interactivo */}
      <div className="mb-6 p-4 sm:p-5 rounded-xl bg-[#070B14]/85 border border-primario/25">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => {
                  playClick();
                  setSelectedRig(preset.id);
                }}
                className={`nova-blade-chamfer px-3.5 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
                  selectedRig === preset.id
                    ? 'nova-btn-primary text-white'
                    : 'nova-btn-outline text-texto-secundario hover:text-texto-principal'
                }`}
              >
                {preset.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                playClick();
                setSelectedRig('auto');
              }}
              className={`nova-blade-chamfer px-3.5 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
                selectedRig === 'auto'
                  ? 'nova-btn-primary text-white'
                  : 'nova-btn-outline text-primario hover:text-white'
              }`}
            >
              Detectar Mi GPU
            </button>
          </div>

          <div className="flex items-center gap-1.5 bg-[#0B1220] p-1 rounded-lg border border-borde">
            {(['1080p', '1440p', '4K'] as ResolutionId[]).map((res) => (
              <button
                key={res}
                type="button"
                onClick={() => {
                  playClick();
                  setResolution(res);
                }}
                className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold cursor-pointer transition-colors ${
                  resolution === res
                    ? 'bg-primario/20 text-primario border border-primario/40'
                    : 'text-texto-secundario hover:text-texto-principal border border-transparent'
                }`}
              >
                {res}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="min-w-0">
            <div className="text-xs text-texto-secundario font-mono truncate">
              {activeProfile.gpu} • {activeProfile.cpu} • {activeProfile.ram}
            </div>
            <div className="mt-2 h-2.5 w-full sm:w-80 bg-[#0B1220] rounded-full overflow-hidden border border-primario/20">
              <div
                className={`h-full ${tier.bar} transition-all duration-500`}
                style={{ width: `${meterPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-baseline gap-3 shrink-0">
            <span className={`font-mono text-2xl font-extrabold ${tier.color}`}>
              ~{estimatedFps} FPS
            </span>
            <span className={`text-xs font-bold uppercase tracking-wider ${tier.color}`}>
              {tier.label}
            </span>
          </div>
        </div>
      </div>

      {/* Tabla Mínimos / Recomendados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[13px] text-texto-secundario leading-relaxed">
        <div className="bg-[#070B14]/70 border border-borde rounded-lg p-4">
          <strong className="text-primario text-xs uppercase tracking-wider block mb-2">
            Mínimos
          </strong>
          <ul className="m-0 pl-4 space-y-1">
            <li>SO: Windows 10 de 64 bits</li>
            <li>Procesador: Core i5-3570K o FX-8310</li>
            <li>Memoria RAM: 8 GB</li>
            <li>Gráficos: GTX 780 o RX 470</li>
            <li>Almacenamiento: 70 GB disponibles</li>
          </ul>
        </div>

        <div className="bg-[#070B14]/70 border border-borde rounded-lg p-4">
          <strong className="text-purple-400 text-xs uppercase tracking-wider block mb-2">
            Recomendados
          </strong>
          <ul className="m-0 pl-4 space-y-1">
            <li>SO: Windows 10/11 de 64 bits</li>
            <li>Procesador: Core i7-4790 o Ryzen 3 3200G</li>
            <li>Memoria RAM: 12 GB</li>
            <li>Gráficos: GTX 1060 o R9 Fury</li>
            <li>Almacenamiento: 70 GB SSD</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
