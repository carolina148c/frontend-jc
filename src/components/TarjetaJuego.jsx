import React from "react";

function TarjetaJuego({ juego, onEditar, onEliminar }) {
    return (
    <div className="card">
        <img
        src={juego.imagenPortada}
        alt={juego.titulo}
        style={{ width: "100%", borderRadius: "8px" }}
        />
    <h3 style={{ marginTop: "0.8rem" }}>{juego.titulo}</h3>
    <p>🎮 {juego.plataforma}</p>
    <p>⭐ {juego.genero}</p>
    <p>📅 {juego.anoLanzamiento}</p>
    <p>{juego.completado ? "✅ Completado" : "🕹️ En progreso"}</p>

    <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
        <button onClick={() => onEditar(juego)}>Editar</button>
        <button
            onClick={() => onEliminar(juego._id)}
            style={{ backgroundColor: "#ff4c4c" }}
        >
            Eliminar
        </button>
    </div>
    </div>
);
}

export default TarjetaJuego;
