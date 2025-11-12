import React from "react";
import "../assets/css/TarjetaJuego.css";


function TarjetaJuego({ juego, onEditar, onEliminar }) {
  return (
    <div className="tarjeta-juego">
      <img
        src={juego.imagenPortada}
        alt={juego.titulo}
        className="tarjeta-imagen"
      />
      <div className="tarjeta-contenido">
        <h3 className="tarjeta-titulo">{juego.titulo}</h3>
        <p className="tarjeta-info">
          <span>🎮</span>
          <span>{juego.plataforma}</span>
        </p>
        <p className="tarjeta-info">
          <span>⭐</span>
          <span>{juego.genero}</span>
        </p>
        <p className="tarjeta-info">
          <span>📅</span>
          <span>{juego.anoLanzamiento}</span>
        </p>
        <p className={`tarjeta-estado ${juego.completado ? "completado" : "progreso"}`}>
          {juego.completado ? "✅ Completado" : "🕹️ En progreso"}
        </p>

        <div className="tarjeta-botones">
          <button
            onClick={() => onEditar(juego)}
            className="btn-editar"
          >
            Editar
          </button>
          <button
            onClick={() => onEliminar(juego._id)}
            className="btn-eliminar"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}


export default TarjetaJuego;