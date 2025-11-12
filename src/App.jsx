import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BibliotecaJuegos from "./pages/BibliotecaJuegos.jsx";
import Resenas from "./pages/Resenas.jsx";
import Estadisticas from "./pages/Estadisticas.jsx";
import Inicio from "./pages/Inicio.jsx";

function App() {
  return (
    <Router>
      <nav>
        <h2>GameTracker</h2>
        <div>
          <Link to="/">Inicio</Link>
          <Link to="/biblioteca">Biblioteca</Link>
          <Link to="/resenas">Reseñas</Link>
          <Link to="/estadisticas">Estadísticas</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/biblioteca" element={<BibliotecaJuegos />} />
        <Route path="/resenas" element={<Resenas />} />
        <Route path="/estadisticas" element={<Estadisticas />} />
      </Routes>
    </Router>
  );
}

export default App;
