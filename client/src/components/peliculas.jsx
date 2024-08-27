import '../style/peliculas.css';
import React, { useState, useEffect, useRef } from 'react';


const Peliculas = () => {
  const listRef = useRef();
  const [peliculas, setPeliculas] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0)

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

  return (
    <>
      <div className='main_container'> 
        <div className='slider_container'>
          <div className='leftArrow' onClick={() => scrollToImage('prev')}>&#10092;</div>
          <div className='rightArrow' onClick={() => scrollToImage('next')}>&#10093;</div>
          <div className='container_images'>
              <ul ref={listRef}>
                {
                  peliculas.map((item, index) =>{
                    return <li key={item.id || index}>
                      <img src={item.bannerUrl} alt={`Banner of ${item.title}`} />
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
                  &#9865;
                </div>))
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Peliculas;
