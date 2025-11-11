import axios from "axios";

// ⚙️ Ajusta la URL al puerto donde corre tu backend
const API_URL = "http://localhost:3000/api";

// === Juegos ===

// Obtener todos los juegos
export const obtenerJuegos = async () => {
  const res = await axios.get(`${API_URL}/juegos`);
  return res.data;
};

// Agregar un juego
export const agregarJuego = async (nuevoJuego) => {
  const res = await axios.post(`${API_URL}/juegos`, nuevoJuego);
  return res.data;
};

// Editar un juego
export const editarJuego = async (id, juegoActualizado) => {
  const res = await axios.put(`${API_URL}/juegos/${id}`, juegoActualizado);
  return res.data;
};

// Eliminar un juego
export const eliminarJuego = async (id) => {
  await axios.delete(`${API_URL}/juegos/${id}`);
};

// === Reseñas ===

// Obtener todas las reseñas
export const obtenerResenas = async () => {
  const res = await axios.get(`${API_URL}/resenas`);
  return res.data;
};

// Reseñas por juego
export const obtenerResenasPorJuego = async (juegoId) => {
  const res = await axios.get(`${API_URL}/resenas/juego/${juegoId}`);
  return res.data;
};

// Agregar una reseña
export const agregarResena = async (nuevaResena) => {
  const res = await axios.post(`${API_URL}/resenas`, nuevaResena);
  return res.data;
};

// Editar reseña
export const editarResena = async (id, resenaActualizada) => {
  const res = await axios.put(`${API_URL}/resenas/${id}`, resenaActualizada);
  return res.data;
};

// Eliminar reseña
export const eliminarResena = async (id) => {
  await axios.delete(`${API_URL}/resenas/${id}`);
};
