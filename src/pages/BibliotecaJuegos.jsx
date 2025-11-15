import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/BibliotecaJuegos.css";


const BibliotecaJuegos = () => {
  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    const obtenerJuegos = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/juegos");
        setJuegos(res.data);
      } catch (error) {
        console.error("Error al obtener los juegos:", error);
      }
    };

    obtenerJuegos();
  }, []);

  const handleEditar = (juego) => {
    // Lógica para editar el juego
    console.log("Editar juego:", juego);
  };
const handleEliminar = async (juegoId) => {
    try {
      await axios.delete(`http://localhost:4000/api/juegos/${juegoId}`);
      setJuegos(juegos.filter((juego) => juego._id !== juegoId));
    } catch (error) {
      console.error("Error al eliminar el juego:", error);
    }
  };

  return (
    <div className="biblioteca-container">
      <h1>Biblioteca de Juegos</h1>
      <div className="juegos-grid">
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
                onClick={() => handleEliminar(juego._Id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BibliotecaJuegos;