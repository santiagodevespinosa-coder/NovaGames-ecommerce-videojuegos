// src/services/ordenesService.ts
import { apiFetch } from './apiClient';
import type { ApiMessageResponse, CreateOrdenDto, OrdenResponse } from '../types';

export const ordenesService = {
  async crearOrden(dto: CreateOrdenDto): Promise<OrdenResponse> {
    const response = await apiFetch<ApiMessageResponse<OrdenResponse>>('/ordenes', {
      method: 'POST',
      body: JSON.stringify(dto),
    });
    return response.datos;
  },

  async obtenerPorUsuario(idUsuario: number): Promise<OrdenResponse[]> {
    return apiFetch<OrdenResponse[]>(`/ordenes/usuario/${idUsuario}`);
  },
};
