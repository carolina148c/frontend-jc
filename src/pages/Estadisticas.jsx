import React, { useEffect, useState } from "react";

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
    <div>
        <h2>📊 Estadísticas Personales</h2>
            <div className="card" style={{ maxWidth: "400px", margin: "0 auto" }}>
        <p>Total de juegos: <strong>{estadisticas.totalJuegos}</strong></p>
        <p>Completados: <strong>{estadisticas.completados}</strong></p>
        <p>Horas jugadas: <strong>{estadisticas.horasTotales}</strong></p>
        <p>Puntuación promedio: <strong>{estadisticas.promedioPuntuacion} ⭐</strong></p>
        </div>
    </div>
);
}

export default Estadisticas;
