import React, { useState, useEffect } from "react";
import "../assets/css/FormularioJuego.css";

function FormularioJuego({ onGuardar, juegoEditado, onCancelar }) {
  const [formData, setFormData] = useState({
    titulo: "",
    genero: "",
    plataforma: "",
    anoLanzamiento: "",
    desarrollador: "",
    imagenPortada: "",
    imagenFile: null,
    descripcion: "",
    completado: false,
  });

  // Si hay un juego en modo edición, se cargan sus datos
  useEffect(() => {
    if (juegoEditado) {
      setFormData((prev) => ({ ...prev, ...juegoEditado, imagenFile: null }));
    }
  }, [juegoEditado]);

  // Manejar preview seguro para imagenFile (crear y revocar objectURL)
  const [previewUrl, setPreviewUrl] = useState(null);
  useEffect(() => {
    if (formData.imagenFile) {
      const url = URL.createObjectURL(formData.imagenFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }

    // Si no hay archivo, usar la URL existente (imagenPortada) o null
    setPreviewUrl(formData.imagenPortada || null);
  }, [formData.imagenFile, formData.imagenPortada]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      const file = files && files[0] ? files[0] : null;
      setFormData({ ...formData, imagenFile: file });
      return;
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Construir FormData para enviar multipart/form-data si hay archivo
    const payload = new FormData();
    payload.append("titulo", formData.titulo);
    payload.append("genero", formData.genero);
    payload.append("plataforma", formData.plataforma);
    payload.append("anoLanzamiento", formData.anoLanzamiento);
    payload.append("desarrollador", formData.desarrollador);
    payload.append("descripcion", formData.descripcion);
    payload.append("completado", formData.completado ? "true" : "false");
    // Si se seleccionó un archivo, añadirlo con el field name 'imagen' (backend espera 'imagen')
    if (formData.imagenFile) {
      payload.append("imagen", formData.imagenFile);
    } else if (formData.imagenPortada) {
      // En caso de edición sin nuevo archivo, enviar la URL existente
      payload.append("imagenPortada", formData.imagenPortada);
    }

    onGuardar(payload);
    setFormData({
      titulo: "",
      genero: "",
      plataforma: "",
      anoLanzamiento: "",
      desarrollador: "",
      imagenPortada: "",
      imagenFile: null,
      descripcion: "",
      completado: false,
    });
  };

  // previewUrl se maneja en el efecto para crear/revocar objectURL
  const imagenPreview = previewUrl;

  return (
    <form onSubmit={handleSubmit} className="juego-card formulario-card">
      <h3>{juegoEditado ? "Editar juego" : "Agregar nuevo juego"}</h3>
      <div className="formulario-contenido">
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
          required
        />

        <input
          type="text"
          name="imagenPortada"
          placeholder="URL de la portada (opcional si subes archivo)"
          value={formData.imagenPortada}
          onChange={handleChange}
        />

        <label style={{ marginBottom: '0.5rem', color: '#9ca3af' }}>Portada (archivo):</label>
        <input
          type="file"
          name="imagen"
          accept="image/*"
          onChange={handleChange}
        />

        {imagenPreview && (
          <img
            src={imagenPreview}
            alt="preview"
            style={{ width: '100%', height: 160, objectFit: 'cover', marginTop: '0.75rem', borderRadius: 6 }}
          />
        )}

        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={handleChange}
          rows={4}
          required
        />

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="completado"
            checked={formData.completado}
            onChange={handleChange}
          />
          Juego completado
        </label>
      </div>

      <div className="botones-form">
        <button type="submit">
          {juegoEditado ? "Guardar cambios" : "Agregar juego"}
        </button>
        <button
          type="button"
          onClick={onCancelar}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default FormularioJuego;
