import '../../style/home/comingSoon.css';
import React, { useState, useEffect, useRef } from 'react';

const ComingSoon = () =>{
    const [pelicula, setPelicula] = useState(null);
    const [peliculas, setPeliculas] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/pelicula/v1')
          .then(response => response.json())
          .then(data => setPeliculas(data))
          .catch(error => console.error('Error fetching movies:', error));
      }, []);

    useEffect(() => {
        fetch('http://localhost:3000/pelicula/v0')
          .then(response => response.json())
          .then(data => {
            if (data.length > 0) {
                const peliculasIds = new Set(peliculas.map(pelicula => pelicula.titulo));
                const peliculasFiltradas = data.filter(pelicula => !peliculasIds.has(pelicula.titulo));

                if (peliculasFiltradas.length > 0) {
                    const randomIndex = Math.floor(Math.random() * peliculasFiltradas.length);
                    setPelicula(peliculasFiltradas[randomIndex]);
                }
            }
          })
          .catch(error => console.error('Error fetching movies:', error));
    }, [peliculas]);

    if (!pelicula) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <div class="header-section">
            <span class="title">Coming soon</span>
            <a href="#" class="see_all">See all</a>
        </div>
        <div className="container_soon">
                <div className="movie-card">
                    <div className="container_imagen">
                        <img src={pelicula.bannerUrl} alt={pelicula.titulo} />
                    </div>
                    <div className="container_info">
                        <h1 className="title">{pelicula.titulo}</h1>
                        <h2 className="genero">{pelicula.genero}</h2>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ComingSoon