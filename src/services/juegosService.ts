// src/services/juegosService.ts
import { apiFetch } from './apiClient';
import type { ApiMessageResponse, CreateJuegoApiDto, Juego, JuegoApi } from '../types';
import { calcularPrecioFinal, getGameImageUrl, getGameTrailerUrl } from '../utils/gameImages';

function mapJuegoApiToJuego(api: JuegoApi): Juego {
  return {
    id: api.idJuego,
    titulo: api.titulo,
    descripcion: api.descripcion ?? '',
    precio: calcularPrecioFinal(api.precioBase, api.descuentoPorcentaje),
    stock: 99,
    imagenUrl: api.imagenUrl || getGameImageUrl(api.slug, api.titulo),
    trailerUrl: api.trailerUrl || getGameTrailerUrl(api.titulo, api.slug),
    categoriaId: 1,
    desarrolladorId: api.idDesarrollador ?? 1,
  };
}

export const juegosService = {
  async obtenerJuegos(): Promise<Juego[]> {
    const data = await apiFetch<JuegoApi[]>('/juegos');
    return data.map(mapJuegoApiToJuego);
  },

  async obtenerJuegoPorId(id: number): Promise<Juego> {
    const data = await apiFetch<JuegoApi>(`/juegos/${id}`);
    return mapJuegoApiToJuego(data);
  },

  async crearJuego(juegoDto: CreateJuegoApiDto): Promise<Juego> {
    const response = await apiFetch<ApiMessageResponse<JuegoApi>>('/juegos', {
      method: 'POST',
      body: JSON.stringify(juegoDto),
    });
    return mapJuegoApiToJuego(response.datos);
  },
};
