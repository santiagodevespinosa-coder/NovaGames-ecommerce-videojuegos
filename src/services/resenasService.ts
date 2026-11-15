// src/services/resenasService.ts
import { apiFetch } from './apiClient';
import type { ApiMessageResponse, Resena } from '../types';

export interface CreateResenaDto {
  idUsuario: number;
  idJuego: number;
  recomendado: boolean;
  comentario: string | null;
}

export const resenasService = {
  async obtenerPorJuego(idJuego: number): Promise<Resena[]> {
    return apiFetch<Resena[]>(`/resenas/juego/${idJuego}`);
  },

  async crearResena(dto: CreateResenaDto): Promise<Resena> {
    const response = await apiFetch<ApiMessageResponse<Resena>>('/resenas', {
      method: 'POST',
      body: JSON.stringify(dto),
    });
    return response.datos;
  },
};
