// src/types/index.ts

// Temporary UI model used by current mock components (will be unified with JuegoApi in Phase 4)
export interface Juego {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagenUrl?: string;
  categoriaId: number;
  desarrolladorId: number;
}

export interface CrearJuegoDto {
  titulo: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagenUrl?: string;
  categoriaId: number;
  desarrolladorId: number;
}

// ==========================================
// Backend API DTOs (API_videojurgos)
// ==========================================

export type TipoUsuario = 'Cliente' | 'Desarrollador' | 'Admin';

export interface Usuario {
  idUsuario: number;
  nombreUsuario: string;
  email: string;
  tipoUsuario: TipoUsuario;
  idEmpresa: number | null;
  fechaRegistro: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  nombreUsuario: string;
  email: string;
  password: string;
  tipoUsuario?: TipoUsuario;
  idEmpresa?: number | null;
}

export interface AuthDatos {
  token: string;
  usuario: Usuario;
}

export interface ApiMessageResponse<T> {
  mensaje: string;
  datos: T;
}

export interface JuegoApi {
  idJuego: number;
  titulo: string;
  slug: string;
  descripcion: string | null;
  precioBase: number;
  descuentoPorcentaje: number;
  fechaLanzamiento: string | null;
  idDesarrollador: number | null;
  idEditor: number | null;
  imagenUrl: string | null;
}

export interface CreateJuegoApiDto {
  titulo: string;
  slug: string;
  descripcion?: string | null;
  precioBase: number;
  descuentoPorcentaje: number;
  fechaLanzamiento?: string | null;
  idDesarrollador?: number | null;
  idEditor?: number | null;
  imagenUrl?: string | null;
}

export interface BibliotecaItem {
  idUsuario: number;
  idJuego: number;
  fechaAdquisicion: string;
  horasJugadas: number;
}

export interface CreateDetalleOrdenDto {
  idJuego: number;
  precioComprado: number;
}

export interface CreateOrdenDto {
  idUsuario: number;
  metodoPago?: string | null;
  detalles: CreateDetalleOrdenDto[];
}

export interface DetalleOrdenResponse {
  idDetalle: number;
  idJuego: number;
  precioComprado: number;
}

export interface OrdenResponse {
  idOrden: number;
  idUsuario: number;
  montoTotal: number;
  estado: 'Pendiente' | 'Completado' | 'Reembolsado';
  metodoPago: string | null;
  fechaCreacion: string;
  detalles: DetalleOrdenResponse[];
}

export interface Genero {
  idGenero: number;
  nombre: string;
}

export interface Empresa {
  idEmpresa: number;
  nombre: string;
  sitioWeb: string | null;
}

export interface Resena {
  idResena: number;
  idUsuario: number;
  idJuego: number;
  recomendado: boolean;
  comentario: string | null;
  fechaPublicacion: string;
}
