import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import BibliotecaJuegos from './pages/BibliotecaJuegos'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BibliotecaJuegos />} />
      </Routes>
    </Router>
  )
}

export default App
