import '../../style/tickets/asientos.css';
import React, { useState, useEffect } from 'react';

const Asientos = ({ cineId, onPriceUpdate }) => {
  const [asientos, setAsientos] = useState([]);
  const [asientosReservados, setAsientosReservados] = useState([]);
  const [asientosSeleccionados, setAsientosSeleccionados] = useState(new Set());

  useEffect(() => {
    if (cineId) {
      Promise.all([
        fetch(`http://localhost:3000/funciones/v1?id=${cineId}`).then(response => response.json()),
        fetch(`http://localhost:3000/asientosReserva/v0?id=${cineId}`).then(response => response.json())
      ])
      .then(([funcionesData, reservasData]) => {
        // Obtener los asientos asignados desde funcionesData
        const asientosAsignados = funcionesData[0].asientosAsignados || [];
        setAsientos(asientosAsignados);
        // Obtener los asientos reservados desde reservasData
        const reservedSeats = reservasData.flatMap(reserva => reserva.asientos_reservados);
        setAsientosReservados(reservedSeats);
      })
      .catch(error => console.error('Error fetching data:', error));
    }
  }, [cineId]);

  const handleSeatChange = (event) => {
    const { value, checked } = event.target;
    const updatedSeleccionados = new Set(asientosSeleccionados);
    const asiento = asientos.find(asiento => asiento.codigo === value);
    const precioAsiento = asiento ? asiento.precio : 0;

    if (checked) {
      updatedSeleccionados.add(value);
      onPriceUpdate(prevTotal => prevTotal + precioAsiento);
    } else {
      updatedSeleccionados.delete(value);
      onPriceUpdate(prevTotal => prevTotal - precioAsiento);
    }
    setAsientosSeleccionados(updatedSeleccionados);
    console.log(`Selected seats: ${Array.from(updatedSeleccionados).join(', ')}`);
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
                {asientosFila.map((asiento) => {
                  const isReserved = asientosReservados.includes(asiento._id);
                  const isSelected = asientosSeleccionados.has(asiento.codigo);
                  return (
                    <React.Fragment key={asiento.codigo}>
                      <input
                        type="checkbox"
                        name="seat"
                        value={asiento.codigo}
                        id={asiento.codigo}
                        onChange={handleSeatChange}
                        disabled={isReserved}
                        className={`${isReserved ? 'reserved' : ''} ${isSelected ? 'selected' : ''}`}
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

export default Asientos;
