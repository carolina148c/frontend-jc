import React, { useEffect, useState } from "react";
import {
  obtenerJuegos,
  agregarJuego,
  editarJuego,
  eliminarJuego,
} from "../services/api";
import TarjetaJuego from "../components/TarjetaJuego";
import FormularioJuego from "../components/FormularioJuego";

function BibliotecaJuegos() {
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [juegoEditado, setJuegoEditado] = useState(null);
  const [error, setError] = useState(null);

  // Cargar los juegos al iniciar
  useEffect(() => {
    cargarJuegos();
  }, []);

  const cargarJuegos = async () => {
    try {
      setCargando(true);
      const data = await obtenerJuegos();
      setJuegos(data);
    } catch (err) {
      setError("Error al cargar los juegos");
    } finally {
      setCargando(false);
    }
  };

  // Guardar (nuevo o editado)
  const manejarGuardar = async (formData) => {
    try {
      if (juegoEditado) {
        await editarJuego(juegoEditado._id, formData);
      } else {
        await agregarJuego(formData);
      }
      setJuegoEditado(null);
      cargarJuegos();
    } catch (err) {
      console.error(err);
      alert("Error al guardar el juego");
    }
  };

  // Editar un juego
  const manejarEditar = (juego) => {
    setJuegoEditado(juego);
  };

  // Cancelar edición
  const manejarCancelar = () => {
    setJuegoEditado(null);
  };

  // Eliminar un juego
  const manejarEliminar = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este juego?")) {
      try {
        await eliminarJuego(id);
        cargarJuegos();
      } catch (err) {
        console.error(err);
        alert("Error al eliminar el juego");
      }
    }
  };

  if (cargando) return <p>Cargando biblioteca...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h2>Biblioteca de Juegos</h2>

      {/* Formulario para agregar o editar */}
      <FormularioJuego
        onGuardar={manejarGuardar}
        juegoEditado={juegoEditado}
        onCancelar={manejarCancelar}
      />

      {/* Lista de juegos */}
      {juegos.length === 0 ? (
        <p>No hay juegos en tu biblioteca aún.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "1.5rem",
            marginTop: "1.5rem",
          }}
        >
          {juegos.map((juego) => (
            <TarjetaJuego
              key={juego._id}
              juego={juego}
              onEditar={manejarEditar}
              onEliminar={manejarEliminar}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default BibliotecaJuegos;
