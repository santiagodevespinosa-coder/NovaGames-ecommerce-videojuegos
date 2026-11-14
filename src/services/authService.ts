// src/services/authService.ts
import { apiFetch, TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from './apiClient';
import type {
  ApiMessageResponse,
  AuthDatos,
  LoginRequest,
  RegisterRequest,
  Usuario,
} from '../types';

function saveSession(datos: AuthDatos): void {
  localStorage.setItem(TOKEN_STORAGE_KEY, datos.token);
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(datos.usuario));
}

export const authService = {
  async login(dto: LoginRequest): Promise<AuthDatos> {
    const response = await apiFetch<ApiMessageResponse<AuthDatos>>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(dto),
    });
    saveSession(response.datos);
    return response.datos;
  },

  async signup(dto: RegisterRequest): Promise<AuthDatos> {
    const response = await apiFetch<ApiMessageResponse<AuthDatos>>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(dto),
    });
    saveSession(response.datos);
    return response.datos;
  },

  async getMe(): Promise<Usuario> {
    const usuario = await apiFetch<Usuario>('/auth/me');
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(usuario));
    return usuario;
  },

  logout(): void {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
  },

  getStoredUser(): Usuario | null {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    if (!raw) return null;

    try {
      const parsed = JSON.parse(raw) as Usuario;
      if (parsed && typeof parsed.idUsuario === 'number') {
        return parsed;
      }
      return null;
    } catch {
      // Clear legacy string-only value from pre-backend mock login
      localStorage.removeItem(USER_STORAGE_KEY);
      return null;
    }
  },
};
