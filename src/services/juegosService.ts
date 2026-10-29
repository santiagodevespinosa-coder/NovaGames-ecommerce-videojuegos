// src/services/juegosService.ts
import type { CrearJuegoDto, Juego } from '../types';

// TODO: Hay que cambiar el puerto por el que use Agus
const API_URL = 'https://localhost:5001/api';

export const juegosService = {
  // Obtener todos los juegos (para el catálogo)
  async obtenerJuegos(): Promise<Juego[]> {
    try {
      // CORREGIDO: Se agregó la barra fuera de las llaves ${API_URL}/juegos
      const response = await fetch(`${API_URL}/juegos`);

      if (!response.ok) {
        throw new Error('Error al obtener el listado de videojuegos');
      }
      const data: Juego[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error en juegosService.obtenerJuegos:', error);
      throw error;
    }
  },

  // Crear un nuevo juego 
  async crearJuego(juegoDto: CrearJuegoDto): Promise<Juego> {
    try {
      const response = await fetch(`${API_URL}/juegos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(juegoDto),
      });

      if (!response.ok) {
        throw new Error('No se pudo registrar el videojuego');
      }

      const nuevoJuego: Juego = await response.json();
      return nuevoJuego;
    } catch (error) {
      console.error('Error en juegosService.crearJuego:', error);
      throw error;
    }
  }
};