import React from "react";
import "../assets/css/Inicio.css";

function Inicio() {
  return (
    <section className="inicio-section">
      <div className="inicio-content">
        <h1 className="inicio-titulo">
          TU BIBLIOTECA
          <br />
          <span className="inicio-titulo-destacado">DE VIDEOJUEGOS</span>
        </h1>
        
        <p className="inicio-descripcion">
          Organiza, rastrea y evalúa tu colección de videojuegos. Lleva el control de tus horas de juego, escribe reseñas y descubre estadísticas fascinantes sobre tus hábitos gaming.
        </p>

        <button className="inicio-btn">VER AHORA</button>

      </div>
    </section>
  );
}

export default Inicio;