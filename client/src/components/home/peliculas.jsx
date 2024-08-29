import '../../style/home/peliculas.css';
import React, { useState, useEffect, useRef } from 'react';
import circleSvg from '../../assets/circle.svg'
import { useNavigate  } from 'react-router-dom';


const Peliculas = () => {
  const listRef = useRef();
  const [peliculas, setPeliculas] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();


  useEffect(() =>{
    const listNode = listRef.current
    const imgNode = listNode.querySelectorAll('li > img')[currentIndex]
    
    if(imgNode){
      imgNode.scrollIntoView({
        behavior: "smooth"
      })
    }
  }, [currentIndex])

  useEffect(() => {
    fetch('http://localhost:3000/pelicula/v1')
      .then(response => response.json())
      .then(data => setPeliculas(data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  const scrollToImage = (direction) => {
    if(direction == 'prev'){
      setCurrentIndex(curr => {
        const isFirstSlide = currentIndex === 0
        return isFirstSlide ? 0 : curr - 1
      })
    } else {
      const isLastSlide = currentIndex === peliculas.length - 1
      if(!isLastSlide){
        setCurrentIndex(curr => curr + 1)
      }
    }
  }

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  }

  const handleImageClick = (titulo) => {
    navigate(`/pelicula/detalle?nombre=${encodeURIComponent(titulo)}`);
  };

  return (
    <>
      <div class="header-section-1">
        <span class="title">Now playing</span>
        <a href="#" class="see_all">See all</a>
      </div>
      <div className='main_container'> 
        <div className='slider_container'>
          <div className='leftArrow' onClick={() => scrollToImage('prev')}>&#10092;</div>
          <div className='rightArrow' onClick={() => scrollToImage('next')}>&#10093;</div>
          <div className='container_images'>
              <ul ref={listRef}>
                {
                  peliculas.map((item, index) =>{
                    return <li key={item.id || index}>
                  <img 
                    src={item.bannerUrl} 
                    alt={`Banner of ${item.titulo}`} 
                    onClick={() => handleImageClick(item.titulo)} // Utiliza el nombre de la película
                  />
                    </li>
                  })
                }
              </ul>
          </div>
          <div className="dots-container">
            {
              peliculas.map((_, idx) => (
                <div key={idx}
                  className={`dot-container-item ${idx === currentIndex ? "active" : ""}`}
                  onClick={() => goToSlide(idx)}>
                  <img  src={circleSvg}/>
                </div>))
            }
          </div>
          <div className='info_container'>
            {
              peliculas.length > 0 && (
                <div className='info'>
                  <h1 className='titulo'>{peliculas[currentIndex].titulo}</h1>
                  <h1 className='genero'>{peliculas[currentIndex].genero}</h1>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Peliculas;
