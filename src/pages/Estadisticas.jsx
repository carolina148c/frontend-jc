import React, { useEffect, useState } from "react";
import "../assets/css/Estadisticas.css";

function Estadisticas() {
  const [estadisticas, setEstadisticas] = useState({
    totalJuegos: 0,
    completados: 0,
    horasTotales: 0,
    promedioPuntuacion: 0,
  });

  useEffect(() => {
    const obtenerEstadisticas = async () => {
      try {
        const [juegosRes, resenasRes] = await Promise.all([
          fetch("http://localhost:4000/api/juegos"),
          fetch("http://localhost:4000/api/resenas"),
        ]);

        const juegos = await juegosRes.json();
        const resenas = await resenasRes.json();

        const completados = juegos.filter((j) => j.completado).length;
        const horasTotales = resenas.reduce(
          (acc, r) => acc + (r.horasJugadas || 0),
          0
        );
        const promedioPuntuacion =
          resenas.length > 0
            ? (
                resenas.reduce((acc, r) => acc + (r.puntuacion || 0), 0) /
                resenas.length
              ).toFixed(1)
            : 0;

        setEstadisticas({
          totalJuegos: juegos.length,
          completados,
          horasTotales,
          promedioPuntuacion,
        });
      } catch (error) {
        console.error("Error al obtener estadísticas:", error);
      }
    };

    obtenerEstadisticas();
  }, []);

  return (
    <div className="estadisticas-container">
      <h2>Estadísticas Personales</h2>
      <div className="estadisticas-grid">
        <div className="estadistica-box">
          <div className="estadistica-box-icon"></div>
          <div className="estadistica-box-label">Total de juegos</div>
          <div className="estadistica-box-valor">{estadisticas.totalJuegos}</div>
        </div>
        <div className="estadistica-box">
          <div className="estadistica-box-icon"></div>
          <div className="estadistica-box-label">Completados</div>
          <div className="estadistica-box-valor">{estadisticas.completados}</div>
        </div>
        <div className="estadistica-box">
          <div className="estadistica-box-icon"></div>
          <div className="estadistica-box-label">Horas jugadas</div>
          <div className="estadistica-box-valor">{estadisticas.horasTotales}</div>
        </div>
        <div className="estadistica-box">
          <div className="estadistica-box-icon"></div>
          <div className="estadistica-box-label">Puntuación promedio</div>
          <div className="estadistica-box-valor">{estadisticas.promedioPuntuacion}</div>
        </div>
      </div>
    </div>
  );
}

export default Estadisticas;