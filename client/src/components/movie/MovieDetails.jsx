import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import regresoSvg from '../../assets/regreso.svg'
import puntosSvg from '../../assets/puntos.svg'
import playSvg from '../../assets/play.svg'
import styles from '../../style/movie/movieDetails.module.css'

const MovieDetails = () => {
    const [pelicula, setPelicula] = useState(null);
    const location = useLocation();
  
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const nombre = params.get('nombre');
    
        if (nombre) {
          fetch(`http://localhost:3000/pelicula/v2?nombre=${nombre}`)
            .then(response => response.json())
            .then(data => setPelicula(data))
            .catch(error => console.error('Error fetching movie details:', error));
        }
      }, [location]);
  
    if (!pelicula) {
      return <div>Loading...</div>;
    }

    return (
        <>
        <div className={styles['container-menu']}>
          <div className={styles['regreso']}>
            <a href='/'><img src={regresoSvg} alt="Back"></img></a>
          </div>
          <div className={styles['title']}>
            <h3>Cinema Selection</h3>
          </div>
          <div className={styles['menu']}>
            <a><img src={puntosSvg} alt="Menu"></img></a>
          </div>
        </div>
        <div className={styles['detalle-pelicula']}>
          <div className={styles['container-img']}>
            <img src={pelicula.bannerUrl} alt={`Banner de ${pelicula.titulo}`} />
          </div>
          <div className={styles['container-trailer']}>
            <div className={styles['container-title-gen']}>
              <h4>{pelicula.titulo}</h4>
              <h5>{pelicula.genero}</h5>
            </div>
            <button><img src={playSvg}/><a src="#">Watch Trailer</a></button>
          </div>
          <div className={styles['container-sinopsis']}>
            <p>{pelicula.sinopsis}</p>
          </div>
            <h2>Cast</h2>
          <div className={styles['container-cast']}>
            <div className={styles['container-actors']} >
              {pelicula.cast && pelicula.cast.length > 0 ? (
                pelicula.cast.map((actor, index) => (
                  <div className={styles['container-actor']} key={index}>
                    <div className={styles['img-actor']}>
                    <img src={actor.foto_autor} alt={actor.nombre_autor} style={{ width: '50px', height: '75px', marginRight: '10px' }} />
                    </div>
                    <div className={styles['info-cast']}>
                    <h4>{actor.nombre_autor}</h4>
                    <h5>{actor.personaje}</h5>
                    </div>
                  </div>
                ))
              ) : (
                <p>No cast information available.</p>
              )}
            </div>
          </div>
      </div>
      </>
    );
  };

export default MovieDetails;