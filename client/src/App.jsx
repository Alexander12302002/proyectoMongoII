import './App.css';
import React, { useState, useEffect } from 'react';
import Carrusel from './components/carrusel'

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};  

const Peliculas = () => {
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/pelicula/v1')
      .then(response => response.json())
      .then(data => setPeliculas(data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  return (
    <div>
      <h1>Lista de Películas</h1>
      {peliculas.length > 0 ? <Carrusel peliculas={peliculas} /> : <p>Cargando...</p>}
    </div>
  );
};

export default Peliculas;
