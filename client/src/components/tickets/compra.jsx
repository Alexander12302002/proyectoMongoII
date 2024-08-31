import '../../style/tickets/compra.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Comprar = ({ cineId ,precioTotal, asientosSeleccionados, horarioSeleccionado }) => {
    const navigate = useNavigate();

    const handleBuyTickets = () => {
      if (!horarioSeleccionado) {
          alert('Por favor, selecciona un horario antes de continuar.');
          return;
      }
      
      console.log('Datos de compra:', {
          precioTotal,
          asientosSeleccionados,
          horarioSeleccionado,
          cineId
      });
  
      navigate('/compra-tickets', {
          state: {
              precioTotal,
              asientosSeleccionados,
              horarioSeleccionado,
              cineId
          }
      });
  };
  return (
    <div className="comprar">
      <div className="total-price">
        <h3>Price</h3>
        <h2>${precioTotal.toFixed(2)}</h2>
      </div>
      <div className='Buy-ticket'>
        <button onClick={handleBuyTickets}>
            <h2>Buy ticket</h2>
        </button>
      </div>
    </div>
  );
}

export default Comprar;