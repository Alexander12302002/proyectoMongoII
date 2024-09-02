import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../style/tickets/compraTickets.css';
import regresoSvg from '../../assets/regreso.svg';
import puntosSvg from '../../assets/puntos.svg';

const generateRandomOrderNumber = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};


const CompraTickets = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { precioTotal, asientosSeleccionados, horarioSeleccionado, cineId } = location.state || {};
  const [pelicula, setPelicula] = useState(null);
  const [funcion, setFuncion] = useState(null);
  const [asientosDetalles, setAsientosDetalles] = useState([]);
  const orderNumber = generateRandomOrderNumber();


  useEffect(() => {
    const fetchFuncion = async () => {
      try {
        const response = await fetch(`http://localhost:3000/funciones/v2?id=${cineId}`);
        const data = await response.json();
        if (data.length > 0) {
          setFuncion(data[0]); 
          fetchPelicula(data[0].id_pelicula); 
        }
      } catch (error) {
        console.error('Error al obtener la función:', error);
      }
    };

    const fetchPelicula = async (idPelicula) => {
      try {
        const response = await fetch(`http://localhost:3000/pelicula/v3?id=${idPelicula}`);
        const data = await response.json();
        setPelicula(data[0] || {}); 
      } catch (error) {
        console.error('Error al obtener la película:', error);
      }
    };

    const fetchAsientos = async () => {
      try {
        const codes = JSON.stringify(asientosSeleccionados);
        const response = await fetch(`http://localhost:3000/asientos/v1?codes=${encodeURIComponent(codes)}`);
        const data = await response.json();
        setAsientosDetalles(data);

        const ids = data.map(asiento => asiento._id);
        console.log('IDs de asientos:', ids);
      } catch (error) {
        console.error('Error al obtener los asientos:', error);
      }
    };

    if (cineId) {
      fetchFuncion();
    }

    if (asientosSeleccionados && asientosSeleccionados.length > 0) {
      fetchAsientos();
    }
  }, [cineId, asientosSeleccionados]);

  const handleBuyTicket = async () => {
    try {
      const idMovimiento = "66c65384e3e8281d85bd18d1"
      const fechaAdquisicion = new Date().toISOString();
      const idsAsientos  = asientosDetalles.map(asiento => asiento._id);

      const response = await fetch('http://localhost:3000/boletas/v0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          asientos: idsAsientos,
          fecha_adquisicion: fechaAdquisicion,
          id_movimiento: idMovimiento
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Compra realizada con éxito:', result);
        navigate('/', { state: { orderNumber } });
      } else {
        console.error('Error al realizar la compra:', await response.text());
      }
    } catch (error) {
      console.error('Error al enviar la solicitud de compra:', error);
    }
  };


  return (
    <div className="compra-tickets">
      <div className='container-menu'>
        <div className='regreso'>
          <a href='/'><img src={regresoSvg} alt="Back" /></a>
        </div>
        <div className='title'>
          <h1>Order Summary</h1>
        </div>
        <div className='menu'>
          <a><img src={puntosSvg} alt="Menu" /></a>
        </div>
      </div>
      {pelicula && funcion ? (
        <div className="order-summary">
          <div className="movie-details">
            <img src={pelicula.bannerUrl} alt={`${pelicula.titulo} banner`} className="movie-banner" />
            <div className="movie-info">
              <h2 className="movie-title">{pelicula.titulo}</h2>
              <p className="movie-genre">{pelicula.genero}</p>
              <p className="movie-synopsis">{pelicula.sinopsis}</p>
            </div>
          </div>
          <div className="order-details">
            <div className='orderNumber'>
              <h3>Order Number: {orderNumber}</h3>
            </div>
            <div className='TICKET'>
            <p>{asientosSeleccionados.length} Ticket(s)</p><p> Seats: {asientosSeleccionados.join(', ')}</p>
            </div>
            <div className='regular-seat'>
            <p>Regular Seat:</p><p> ${precioTotal.toFixed(2)}</p>
            </div>
            <div className='service-fee'>
            <p>Service Fee: $120 </p><p> {asientosSeleccionados.length}</p>
            </div>
            <button className="buy-ticket-button" onClick={handleBuyTicket}>Buy Ticket</button>
          </div>
        </div>
      ) : (
        <p>Loading movie details...</p>
      )}
    </div>
  );
}

export default CompraTickets;
