// src/services/generosService.ts
import { apiFetch } from './apiClient';
import type { Genero } from '../types';

export const generosService = {
  async obtenerGeneros(): Promise<Genero[]> {
    return apiFetch<Genero[]>('/generos');
  },

  async obtenerGenerosPorJuego(idJuego: number): Promise<Genero[]> {
    return apiFetch<Genero[]>(`/generos/juego/${idJuego}`);
  },
};
