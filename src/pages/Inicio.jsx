import React from "react";

function Inicio() {
    return (
    <section>
        <h2>Bienvenido a tu Biblioteca de Juegos 🎮</h2>
        <p style={{ marginTop: "1rem", lineHeight: "1.6" }}>
        Administra tu colección personal de videojuegos, escribe reseñas,
        califica con estrellas y lleva el control de tus horas jugadas.
        </p>

        <div style={{ marginTop: "2rem" }}>
        <h3>Funciones principales:</h3>
        <ul style={{ marginTop: "1rem", marginLeft: "1.5rem", lineHeight: "1.8" }}>
            <li>Gestiona tu colección personal de videojuegos.</li>
            <li>Califica y reseña cada título que hayas jugado.</li>
            <li>Marca los juegos como completados.</li>
            <li>Registra tus horas jugadas y progreso.</li>
            <li>Consulta estadísticas personales.</li>
        </ul>
        </div>
    </section>
    );
}

export default Inicio;
