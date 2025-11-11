import React, { useState, useEffect } from "react";

function FormularioJuego({ onGuardar, juegoEditado, onCancelar }) {
const [formData, setFormData] = useState({
    titulo: "",
    genero: "",
    plataforma: "",
    anoLanzamiento: "",
    desarrollador: "",
    imagenPortada: "",
    descripcion: "",
    completado: false,
});

  // Si hay un juego en modo edición, se cargan sus datos
useEffect(() => {
    if (juegoEditado) {
    setFormData(juegoEditado);
    }
}, [juegoEditado]);

const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
    ...formData,
    [name]: type === "checkbox" ? checked : value,
    });
};

const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(formData);
    setFormData({
        titulo: "",
        genero: "",
        plataforma: "",
        anoLanzamiento: "",
        desarrollador: "",
        imagenPortada: "",
        descripcion: "",
        completado: false,
    });
};

return (
    <form
        onSubmit={handleSubmit}
        className="card"
        style={{
        marginBottom: "2rem",
        maxWidth: "500px",
    }}
    >
    <h3>{juegoEditado ? "Editar juego" : "Agregar nuevo juego"}</h3>

    <input
        type="text"
        name="titulo"
        placeholder="Título"
        value={formData.titulo}
        onChange={handleChange}
        required
    />

    <input
        type="text"
        name="genero"
        placeholder="Género"
        value={formData.genero}
        onChange={handleChange}
        required
    />

    <input
        type="text"
        name="plataforma"
        placeholder="Plataforma"
        value={formData.plataforma}
        onChange={handleChange}
        required
    />

    <input
        type="number"
        name="anoLanzamiento"
        placeholder="Año de lanzamiento"
        value={formData.anoLanzamiento}
        onChange={handleChange}
        required
    />

    <input
        type="text"
        name="desarrollador"
        placeholder="Desarrollador"
        value={formData.desarrollador}
        onChange={handleChange}
    />

    <input
        type="text"
        name="imagenPortada"
        placeholder="URL de la portada"
        value={formData.imagenPortada}
        onChange={handleChange}
    />

    <textarea
        name="descripcion"
        placeholder="Descripción"
        value={formData.descripcion}
        onChange={handleChange}
        rows={4}
    ></textarea>

    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <input
            type="checkbox"
            name="completado"
            checked={formData.completado}
            onChange={handleChange}
        />
        Juego completado
    </label>

    <div style={{ marginTop: "1rem" }}>
        <button type="submit">
            {juegoEditado ? "Guardar cambios" : "Agregar juego"}
        </button>
        {juegoEditado && (
            <button
            type="button"
            style={{ marginLeft: "0.5rem", backgroundColor: "#ff4c4c" }}
            onClick={onCancelar}
            >
            Cancelar
            </button>
        )}
        </div>
    </form>
    );
}

export default FormularioJuego;
