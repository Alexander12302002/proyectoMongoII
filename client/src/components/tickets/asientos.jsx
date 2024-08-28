import '../../style/tickets/asientos.css'
import React, { useState, useEffect } from 'react';

const Asientos = () => {
    const [asientos, setAsientos] = useState([]);
    const [asientosReservados, setAsientosReservados] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/asientos/v0')
        .then(response => response.json())
        .then(data => setAsientos(data))
        .catch(error => console.error('Error fetching movies:', error));
      }, []);

      useEffect(() => {
        fetch('http://localhost:3000/asientosReserva/v0')
          .then(response => response.json())
          .then(data => {
            const reservedSeats = data.flatMap(reserva => reserva.asientos_reservados);
            setAsientosReservados(reservedSeats);
          })
          .catch(error => console.error('Error fetching reserved seats:', error));
      }, []);

    const handleSeatChange = (event) => {
    const { value, checked } = event.target;
    console.log(`Seat ${value} is ${checked ? 'selected' : 'unselected'}`);
    };

    return (
<section className="asientos">
      <form id="myform">
        {Object.entries(
          asientos.reduce((acc, asiento) => {
            const fila = asiento.codigo.slice(0, 1);
            if (!acc[fila]) {
              acc[fila] = [];
            }
            acc[fila].push(asiento);
            return acc;
          }, {})
        ).map(([fila, asientosFila]) => (
          <article
            key={fila}
            className={`asientos__${fila === 'C' ? 'preferenciales' : 'normal'}`}
          >
            <div fila={fila}>
              <small>{fila}</small>
              <div className="asientos__lista">
                {asientosFila.map((asiento, index) => {
                  const isReserved = asientosReservados.includes(asiento._id);
                  return (
                    <React.Fragment key={index}>
                      <input
                        type="checkbox"
                        name="seat"
                        value={asiento.codigo}
                        id={asiento.codigo}
                        onChange={handleSeatChange}
                        disabled={isReserved}
                        // Apply class "reserved" if the seat is reserved
                        className={isReserved ? 'reserved' : ''}
                      />
                      <label
                        htmlFor={asiento.codigo}
                        data-place={asiento.codigo.slice(1)}
                      ></label>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </article>
        ))}
        <article className="asientos__menu">
          <div>
            <small className="available"></small> <label>Available</label>
          </div>
          <div>
            <small className="reserved"></small> <label>Reserved</label>
          </div>
          <div>
            <small className="selected"></small> <label>Selected</label>
          </div>
        </article>
      </form>
    </section>
      );
}

export default Asientos