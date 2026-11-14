// src/services/bibliotecaService.ts
import { apiFetch } from './apiClient';
import type { BibliotecaItem } from '../types';

export const bibliotecaService = {
  async obtenerPorUsuario(idUsuario: number): Promise<BibliotecaItem[]> {
    return apiFetch<BibliotecaItem[]>(`/biblioteca/usuario/${idUsuario}`);
  },

  async actualizarHoras(idUsuario: number, idJuego: number, horasJugadas: number): Promise<void> {
    await apiFetch<void>(`/biblioteca/usuario/${idUsuario}/juego/${idJuego}/horas`, {
      method: 'PATCH',
      body: JSON.stringify({ horasJugadas }),
    });
  },
};
