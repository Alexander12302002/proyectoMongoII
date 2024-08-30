import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../style/tickets/compraTickets.css';
import regresoSvg from '../../assets/regreso.svg';
import puntosSvg from '../../assets/puntos.svg';

const CompraTickets = () => {
  const location = useLocation();
  const { precioTotal, asientosSeleccionados, horarioSeleccionado, cineId } = location.state || {};
  const [pelicula, setPelicula] = useState(null);
  const [funcion, setFuncion] = useState(null);

  useEffect(() => {
    // Obtener detalles de la función usando cineId
    const fetchFuncion = async () => {
      try {
        const response = await fetch(`http://localhost:3000/funciones/v2?id=${cineId}`);
        const data = await response.json();
        if (data.length > 0) {
          setFuncion(data[0]); // Suponiendo que data es un array
          fetchPelicula(data[0].id_pelicula); // Obtener detalles de la película
        }
      } catch (error) {
        console.error('Error al obtener la función:', error);
      }
    };

    // Obtener detalles de la película usando id_pelicula
    const fetchPelicula = async (idPelicula) => {
      try {
        const response = await fetch(`http://localhost:3000/pelicula/v3?id=${idPelicula}`);
        const data = await response.json();
        // Suponiendo que data es un array con un solo objeto
        setPelicula(data[0] || {}); // Si la respuesta es un array, obtenemos el primer objeto
      } catch (error) {
        console.error('Error al obtener la película:', error);
      }
    };

    if (cineId) {
      fetchFuncion();
    }
  }, [cineId]);

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
            <h3>Cinema ID: {cineId}</h3>
            <p>{horarioSeleccionado?.dia}, {horarioSeleccionado?.hora}</p>
            <p>Order Number: 1234567890</p>
            <p>{asientosSeleccionados.length} Ticket(s) - Seats: {asientosSeleccionados.join(', ')}</p>
            <p>Regular Seat: ${precioTotal.toFixed(2)}</p>
            <p>Service Fee: $1.99 x {asientosSeleccionados.length}</p>
            <div className="payment-method">
              <h4>Payment Method</h4>
              <div className="payment-card">
                <img src="mastercard-logo.png" alt="MasterCard" />
                <p>**** **** **** 7865</p>
              </div>
              <p>Complete your payment in: 04:59</p>
            </div>
            <button className="buy-ticket-button">Buy Ticket</button>
          </div>
        </div>
      ) : (
        <p>Loading movie details...</p>
      )}
    </div>
  );
}

export default CompraTickets;
