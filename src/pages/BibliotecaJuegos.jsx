import { useEffect, useState } from "react";
import "../assets/css/BibliotecaJuegos.css";
import FormularioJuego from "../components/FormularioJuego";
import { obtenerJuegos, agregarJuego, editarJuego, eliminarJuego } from "../services/api";

const BibliotecaJuegos = () => {
  const [juegos, setJuegos] = useState([]);
  const [showFormulario, setShowFormulario] = useState(false);
  const [juegoEditado, setJuegoEditado] = useState(null);

  useEffect(() => {
    const fetchJuegos = async () => {
      try {
        const data = await obtenerJuegos();
        setJuegos(data);
      } catch (error) {
        console.error("Error al obtener los juegos:", error);
      }
    };

    fetchJuegos();
  }, []);

  const handleEditar = (juego) => {
    setJuegoEditado(juego);
    setShowFormulario(true);
  };

  const handleEliminar = async (juegoId) => {
    try {
      if (!window.confirm("¿Seguro que deseas eliminar este juego?")) return;
      await eliminarJuego(juegoId);
      setJuegos((prev) => prev.filter((j) => j._id !== juegoId));
    } catch (error) {
      console.error("Error al eliminar el juego:", error);
    }
  };

  const handleGuardar = async (formData) => {
    try {
      if (juegoEditado && juegoEditado._id) {
        await editarJuego(juegoEditado._id, formData);
      } else {
        await agregarJuego(formData);
      }
      const data = await obtenerJuegos();
      setJuegos(data);
      setShowFormulario(false);
      setJuegoEditado(null);
    } catch (error) {
      console.error("Error al guardar el juego:", error);
    }
  };

  const handleCancelar = () => {
    setShowFormulario(false);
    setJuegoEditado(null);
  };

  return (
    <div className="biblioteca-container">
      <h1>Biblioteca de Juegos</h1>
      <div className="juegos-grid">
        {/* Tarjeta para agregar nuevo juego */}
        {!showFormulario && (
          <div
            className="juego-card agregar-card"
            onClick={() => setShowFormulario(true)}
          >
            <div className="agregar-contenido">
              <span className="agregar-icono">＋</span>
              <p>Agregar nuevo juego</p>
            </div>
          </div>
        )}

        {juegos.map((juego) => (
          <div key={juego._id} className="juego-card">
            <img
              src={juego.imagenPortada}
              alt={juego.titulo}
              className="juego-imagen"
            />
            <h3>{juego.titulo}</h3>
            <p><strong>Género:</strong> {juego.genero}</p>
            <p><strong>Plataforma:</strong> {juego.plataforma}</p> 
            <p><strong>Desarrollador:</strong> {juego.desarrollador}</p>
            <p className="descripcion">{juego.descripcion}</p>
            <div className="juego-botones">
              <button
                className="btn-editar-juego"
                onClick={() => handleEditar(juego)}
              >
                Editar
              </button>
              <button
                className="btn-eliminar-juego"
                onClick={() => handleEliminar(juego._id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {showFormulario && (
        <FormularioJuego
          onGuardar={handleGuardar}
          juegoEditado={juegoEditado}
          onCancelar={handleCancelar}
        />
      )}

    </div>
  );
};

export default BibliotecaJuegos;
