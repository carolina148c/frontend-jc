import React, { useEffect, useState } from "react";
import {
  obtenerResenas,
  agregarResena,
  editarResena,
  eliminarResena,
} from "../services/api";

function Resenas() {
  const [resenas, setResenas] = useState([]);
  const [resenaEditada, setResenaEditada] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [formData, setFormData] = useState({
    juegoId: "",
    puntuacion: 1,
    textoResena: "",
    horasJugadas: 0,
    dificultad: "Normal",
    recomendaria: false,
  });

  // Cargar reseñas al montar el componente
  useEffect(() => {
    cargarResenas();
  }, []);

  const cargarResenas = async () => {
    try {
      const data = await obtenerResenas();
      setResenas(data);
    } catch (err) {
      console.error("Error al cargar reseñas", err);
    } finally {
      setCargando(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (resenaEditada) {
        await editarResena(resenaEditada._id, formData);
      } else {
        await agregarResena(formData);
      }
      setFormData({
        juegoId: "",
        puntuacion: 1,
        textoResena: "",
        horasJugadas: 0,
        dificultad: "Normal",
        recomendaria: false,
      });
      setResenaEditada(null);
      cargarResenas();
    } catch (err) {
      console.error(err);
      alert("Error al guardar reseña");
    }
  };

  const handleEditar = (resena) => {
    setResenaEditada(resena);
    setFormData(resena);
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta reseña?")) {
      try {
        await eliminarResena(id);
        cargarResenas();
      } catch (err) {
        console.error(err);
      }
    }
  };

  if (cargando) return <p>Cargando reseñas...</p>;

  return (
    <section>
      <h2>Reseñas de Juegos</h2>

      {/* Formulario para reseña */}
      <form
        onSubmit={handleSubmit}
        className="card"
        style={{ marginBottom: "2rem", maxWidth: "600px" }}
      >
        <h3>{resenaEditada ? "Editar Reseña" : "Nueva Reseña"}</h3>

        <input
          type="text"
          name="juegoId"
          placeholder="ID del juego"
          value={formData.juegoId}
          onChange={handleChange}
          required
        />

        <label>Puntuación:</label>
        <select
          name="puntuacion"
          value={formData.puntuacion}
          onChange={handleChange}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} ⭐
            </option>
          ))}
        </select>

        <textarea
          name="textoResena"
          placeholder="Escribe tu reseña"
          value={formData.textoResena}
          onChange={handleChange}
          rows={4}
        ></textarea>

        <input
          type="number"
          name="horasJugadas"
          placeholder="Horas jugadas"
          value={formData.horasJugadas}
          onChange={handleChange}
        />

        <label>Dificultad:</label>
        <select
          name="dificultad"
          value={formData.dificultad}
          onChange={handleChange}
        >
          <option value="Fácil">Fácil</option>
          <option value="Normal">Normal</option>
          <option value="Difícil">Difícil</option>
        </select>

        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="checkbox"
            name="recomendaria"
            checked={formData.recomendaria}
            onChange={handleChange}
          />
          Recomendaría este juego
        </label>

        <button type="submit">
          {resenaEditada ? "Guardar cambios" : "Agregar reseña"}
        </button>
      </form>

      {/* Lista de reseñas */}
      {resenas.length === 0 ? (
        <p>No hay reseñas registradas.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem",
          }}
        >
          {resenas.map((r) => (
            <div key={r._id} className="card">
              <h3>Juego ID: {r.juegoId}</h3>
              <p>⭐ {r.puntuacion} / 5</p>
              <p>{r.textoResena}</p>
              <p>⏱️ {r.horasJugadas} horas</p>
              <p>🎯 Dificultad: {r.dificultad}</p>
              <p>
                {r.recomendaria ? "✅ Lo recomendaría" : "❌ No lo recomendaría"}
              </p>

              <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
                <button onClick={() => handleEditar(r)}>Editar</button>
                <button
                  onClick={() => handleEliminar(r._id)}
                  style={{ backgroundColor: "#ff4c4c" }}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Resenas;
