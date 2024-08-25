import React, { useState } from 'react';
import '../style/carrusel.css';

const Carrusel = ({ peliculas }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
  
    const nextSlide = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === peliculas.length - 1 ? 0 : prevIndex + 1
      );
    };
  
    const prevSlide = () => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? peliculas.length - 1 : prevIndex - 1
      );
    };
  
    const goToSlide = (index) => {
      setCurrentIndex(index);
    };
  
    return (
      <div className="carrusel">
        <button className="carrusel__button carrusel__button--prev" onClick={prevSlide}>
          &lt;
        </button>
        <div className="carrusel__slides" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {peliculas.map((pelicula, index) => (
            <div key={index} className="carrusel__slide">
              <img
                src={pelicula.bannerUrl}
                alt={pelicula.titulo}
                className="carrusel__image"
              />
              <div className="carrusel__info">
                <h2>{pelicula.titulo}</h2>
                <p>{pelicula.sinopsis}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="carrusel__button carrusel__button--next" onClick={nextSlide}>
          &gt;
        </button>
        <div className="carrusel__dots">
          {peliculas.map((_, index) => (
            <span
              key={index}
              className={`carrusel__dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    );
  };
  
  export default Carrusel;