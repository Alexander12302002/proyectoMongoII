import '../../style/tickets/horarios.css';
import React, { useState, useEffect } from 'react';

const Horarios = ({ cineId }) => {
    const [horarios, setHorarios] = useState([]);
    const [selectedHorario, setSelectedHorario] = useState(null);

  useEffect(() => {
    if (cineId) {
      fetch(`http://localhost:3000/funciones/v2?id=${cineId}`)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            setHorarios(data[0].horarios); 
          }
        })
        .catch(error => {
          console.error('Error fetching horarios:', error);
        });
    }
  }, [cineId]);

  const handleCardClick = (horario) => {
    setSelectedHorario(horario);
    console.log('Horario seleccionado:', horario);
  };


  return (
<div className="horarios-container">
      {horarios.length > 0 ? (
        horarios.map((horario, index) => (
          <div 
            key={index} 
            className={`horario-card ${selectedHorario === horario ? 'selected' : ''}`} 
            onClick={() => handleCardClick(horario)}
          >
            <div className="horario-dia">
              {/* Mostrar el día de la semana */}
              {horario.dia}
            </div>
            <div className="horario-numero">
              {/* Mostrar el número del día */}
              {horario.dia_numero}
            </div>
            <div className="horario-hora">
              {/* Mostrar la hora */}
              {horario.hora}
            </div>
          </div>
        ))
      ) : (
        <div className="no-horarios">No hay horarios disponibles</div>
      )}
    </div>
  );
};

export default Horarios;
