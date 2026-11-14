// src/services/apiClient.ts

const API_BASE_URL = '/api';

export const TOKEN_STORAGE_KEY = 'nova_token';
export const USER_STORAGE_KEY = 'nova_usuario_logueado';

interface ApiErrorPayload {
  error?: string;
  mensaje?: string;
  detalle?: string;
}

/**
 * Lightweight fetch wrapper that prepends `/api`, attaches the JWT Bearer token
 * when present in localStorage, and normalizes backend error messages.
 */
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  const headers = new Headers(options.headers);

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let message = `Error ${response.status}: ${response.statusText}`;
    try {
      const data = (await response.json()) as ApiErrorPayload;
      message = data.error || data.mensaje || message;
    } catch {
      // Ignore non-JSON error bodies
    }
    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
