export interface Juego
{
    id: number;
    titulo: string;
    descripcion: string;
    precio:number;
    stock: number;
    imagenUrl?: string;
    categoriaId: number;
    desarrolladorId: number;
}

//DTO para cuando el usuario quiera crear o actualizar un juego
export interface CrearJuegoDto
{
    titulo: string;
    descripcion: string;
    precio: number;
    stock: number;
    imagenUrl?: string;
    categoriaId: number;
    desarrolladorId: number;
}

export interface Categoria
{
    id: number;
    nombre: string;
}

export interface Desarrollador
{
    id: number;
    nombre: string;
    paisOrigen?: string;
}

export interface Usuario
{
    id: number;
    nombre: string;
    email: string;
    token?: string;
}

export interface TarjetaJuegoProps
{
    juego: Juego;
    onComprar: (id: number) => void;
}