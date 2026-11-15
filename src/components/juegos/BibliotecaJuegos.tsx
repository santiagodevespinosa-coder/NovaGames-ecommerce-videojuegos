// src/components/juegos/BibliotecaJuegos.tsx
import React, { useEffect, useRef, useState } from 'react';
import libraryIcon from '../../assets/library.webp';
import { getPortraitImageUrl } from '../../utils/gameImages';
import { playClick, playInstallComplete } from '../../utils/novaAudio';
import type { Juego, OrdenResponse } from '../../types';

export interface JuegoBiblioteca {
  id: number;
  titulo: string;
  imagenUrl?: string;
  horasJugadas: number;
  fechaAdquisicion?: string;
  instalado: boolean;
}

interface BibliotecaJuegosProps {
  juegosBiblioteca: JuegoBiblioteca[];
  onToggleInstalacion: (id: number) => void;
  onRegistrarHoras?: (idJuego: number, nuevasHoras: number) => Promise<void> | void;
  ordenes?: OrdenResponse[];
  juegosCatalogo?: Juego[];
}

interface InstallState {
  progress: number;
  stage: string;
}

export const BibliotecaJuegos: React.FC<BibliotecaJuegosProps> = ({
  juegosBiblioteca,
  onToggleInstalacion,
  onRegistrarHoras,
  ordenes = [],
  juegosCatalogo = [],
}) => {
  const [installing, setInstalling] = useState<Record<number, InstallState>>({});
  const [activeSession, setActiveSession] = useState<{
    id: number;
    titulo: string;
    horasActuales: number;
  } | null>(null);
  const [guardandoHoras, setGuardandoHoras] = useState(false);
  const [tab, setTab] = useState<'juegos' | 'ordenes'>('juegos');
  const timersRef = useRef<number[]>([]);
  const progressRef = useRef<Record<number, number>>({});

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((id) => window.clearInterval(id));
    };
  }, []);

  const iniciarInstalacion = (id: number) => {
    if (installing[id]) return;

    progressRef.current[id] = 8;
    setInstalling((prev) => ({
      ...prev,
      [id]: { progress: 8, stage: 'Descargando paquetes...' },
    }));

    const intervalId = window.setInterval(() => {
      const nextProgress = Math.min(100, (progressRef.current[id] ?? 8) + 18);
      progressRef.current[id] = nextProgress;
      const stage =
        nextProgress < 45
          ? 'Descargando paquetes...'
          : nextProgress < 80
            ? 'Verificando archivos...'
            : 'Configurando entorno...';

      if (nextProgress >= 100) {
        window.clearInterval(intervalId);
        delete progressRef.current[id];
        setInstalling((prev) => {
          const next = { ...prev };
          delete next[id];
          return next;
        });
        onToggleInstalacion(id);
        playInstallComplete();
      } else {
        setInstalling((prev) => ({
          ...prev,
          [id]: { progress: nextProgress, stage },
        }));
      }
    }, 240);

    timersRef.current.push(intervalId);
  };

  const iniciarJuego = (juego: JuegoBiblioteca) => {
    playClick();
    setActiveSession({
      id: juego.id,
      titulo: juego.titulo,
      horasActuales: juego.horasJugadas,
    });
  };

  const cerrarSesionJuego = async () => {
    if (!activeSession || guardandoHoras) return;
    playClick();
    const nuevasHoras = Number((activeSession.horasActuales + 0.5).toFixed(1));
    setGuardandoHoras(true);
    try {
      await onRegistrarHoras?.(activeSession.id, nuevasHoras);
    } finally {
      setGuardandoHoras(false);
      setActiveSession(null);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <img
            src={libraryIcon}
            alt="Biblioteca"
            className="w-11 h-11 object-contain shrink-0 drop-shadow-[0_0_10px_rgba(56,189,248,0.35)]"
          />
          <div>
            <h2 className="text-texto-principal m-0 mb-1 text-2xl font-semibold">
              Mi Biblioteca
            </h2>
            <p className="text-texto-secundario text-sm m-0">
              Gestiona tus juegos adquiridos, registra horas de juego y revisa tus órdenes.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#0B1220] p-1 rounded-xl border border-primario/20">
          <button
            type="button"
            onClick={() => {
              playClick();
              setTab('juegos');
            }}
            className={`nova-blade-chamfer px-4 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
              tab === 'juegos'
                ? 'nova-btn-primary text-white'
                : 'text-texto-secundario hover:text-texto-principal bg-transparent border-0'
            }`}
          >
            Mis Juegos ({juegosBiblioteca.length})
          </button>
          <button
            type="button"
            onClick={() => {
              playClick();
              setTab('ordenes');
            }}
            className={`nova-blade-chamfer px-4 py-1.5 text-xs font-bold cursor-pointer transition-colors ${
              tab === 'ordenes'
                ? 'nova-btn-primary text-white'
                : 'text-texto-secundario hover:text-texto-principal bg-transparent border-0'
            }`}
          >
            Historial de Órdenes ({ordenes.length})
          </button>
        </div>
      </div>

      {activeSession && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-primario/50 bg-gradient-to-r from-primario/20 via-blue-500/15 to-purple-500/20 px-4 py-3 text-sm font-semibold text-texto-principal shadow-[0_0_25px_rgba(56,189,248,0.25)]">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-exito animate-ping" />
            <span>
              En sesión: <strong className="text-primario">{activeSession.titulo}</strong>
            </span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-primario/90">
              NovaVault // Running
            </span>
          </div>
          <button
            type="button"
            disabled={guardandoHoras}
            onClick={cerrarSesionJuego}
            className="nova-btn-outline nova-blade-chamfer px-4 py-1.5 text-xs font-bold text-texto-principal hover:text-primario cursor-pointer disabled:opacity-60"
          >
            {guardandoHoras ? 'Guardando horas...' : 'Cerrar Juego (+0.5 hrs)'}
          </button>
        </div>
      )}

      {tab === 'ordenes' ? (
        ordenes.length === 0 ? (
          <p className="text-texto-secundario text-center p-10">
            No tienes órdenes registradas todavía.
          </p>
        ) : (
          <div className="space-y-4">
            {ordenes.map((orden) => (
              <div
                key={orden.idOrden}
                className="bg-[#0B1220]/90 border border-primario/20 rounded-xl p-5 shadow-[0_10px_25px_rgba(0,0,0,0.4)]"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-3 border-b border-primario/15">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-primario">
                      Orden #{orden.idOrden}
                    </span>
                    <span className="text-xs text-texto-secundario">
                      {new Date(orden.fechaCreacion).toLocaleDateString()}
                    </span>
                    {orden.metodoPago && (
                      <span className="text-[11px] font-mono text-texto-secundario bg-[#070B14] border border-borde px-2 py-0.5 rounded">
                        {orden.metodoPago}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-[11px] font-bold uppercase px-2.5 py-0.5 rounded ${
                        orden.estado === 'Completado'
                          ? 'bg-exito/15 text-exito border border-exito/40'
                          : orden.estado === 'Reembolsado'
                            ? 'bg-red-500/15 text-red-400 border border-red-500/40'
                            : 'bg-amber-500/15 text-amber-400 border border-amber-500/40'
                      }`}
                    >
                      {orden.estado}
                    </span>
                    <span className="text-base font-extrabold text-primario">
                      ${orden.montoTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {orden.detalles.map((det) => {
                    const juegoInfo = juegosCatalogo.find((j) => j.id === det.idJuego);
                    return (
                      <div
                        key={det.idDetalle}
                        className="flex items-center justify-between text-xs text-texto-secundario"
                      >
                        <span className="text-texto-principal font-semibold">
                          {juegoInfo?.titulo ?? `Juego #${det.idJuego}`}
                        </span>
                        <span className="font-mono">
                          ${det.precioComprado.toFixed(2)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )
      ) : juegosBiblioteca.length === 0 ? (
        <p className="text-texto-secundario text-center p-10">
          No tienes juegos en tu biblioteca todavía. ¡Visita la tienda para comprar algunos!
        </p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">
          {juegosBiblioteca.map((juego) => {
            const installState = installing[juego.id];
            const portraitUrl = getPortraitImageUrl(juego.imagenUrl);

            return (
              <div
                key={juego.id}
                className="bg-[#0B1220]/90 border border-primario/20 hover:border-primario/60 rounded-xl overflow-hidden flex flex-col justify-between shadow-[0_12px_30px_rgba(0,0,0,0.45)] transition-all duration-300"
              >
                {portraitUrl && (
                  <div className="relative h-44 overflow-hidden border-b border-borde">
                    <img
                      src={portraitUrl}
                      alt={juego.titulo}
                      className="w-full h-full object-cover"
                    />
                    <span
                      className={`absolute top-2.5 right-2.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded ${
                        juego.instalado
                          ? 'bg-exito/90 text-white'
                          : 'bg-[#070B14]/85 text-texto-secundario border border-borde'
                      }`}
                    >
                      {juego.instalado ? 'Instalado' : 'En la nube'}
                    </span>
                  </div>
                )}

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="m-0 mb-2 text-lg text-texto-principal font-semibold">
                      {juego.titulo}
                    </h3>
                    <p className="text-[13px] text-texto-secundario m-0 mb-1">
                      Tiempo de juego:{' '}
                      <strong className="text-primario">{juego.horasJugadas} hrs</strong>
                    </p>
                    {juego.fechaAdquisicion && (
                      <p className="text-[11px] text-texto-secundario/80 font-mono m-0 mb-4">
                        Adquirido el {new Date(juego.fechaAdquisicion).toLocaleDateString()}
                      </p>
                    )}
                  </div>

                  {installState ? (
                    <div className="space-y-2">
                      <div className="flex justify-between text-[11px] font-mono text-primario">
                        <span>{installState.stage}</span>
                        <span>{installState.progress}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-[#070B14] border border-primario/30 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 transition-all duration-200 shadow-[0_0_10px_rgba(56,189,248,0.8)]"
                          style={{ width: `${installState.progress}%` }}
                        />
                      </div>
                    </div>
                  ) : juego.instalado ? (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => iniciarJuego(juego)}
                        className="nova-btn-primary nova-blade-chamfer flex-1 text-white py-2.5 px-4 font-bold text-xs uppercase tracking-wider cursor-pointer text-center"
                      >
                        ▶ Jugar
                      </button>
                      <button
                        type="button"
                        onClick={() => onToggleInstalacion(juego.id)}
                        className="nova-btn-outline nova-blade-chamfer text-texto-secundario hover:text-red-400 py-2.5 px-3 font-bold text-xs cursor-pointer"
                      >
                        Desinstalar
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => iniciarInstalacion(juego.id)}
                      className="nova-btn-primary nova-blade-chamfer text-white py-2.5 px-4 font-bold text-xs uppercase tracking-wider cursor-pointer text-center"
                    >
                      Instalar
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
