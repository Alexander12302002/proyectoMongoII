import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client'
import { useLocation } from 'react-router-dom';
import styles from '../../style/tickets/tickets.module.css';
import screenSvg from '../../assets/screen.svg'
import regresoSvg from '../../assets/regreso.svg'
import puntosSvg from '../../assets/puntos.svg'
import Asientos from './asientos'
import Horarios from './horarios'
import Comprar from './compra'

const Tickets = () => {
    const location = useLocation();
    const [cineId, setCineId] = useState(location.state?.cineId || null);
    const [precioTotal, setPrecioTotal] = useState(0);
    const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);
    const [horarioSeleccionado, setHorarioSeleccionado] = useState(null)


    useEffect(() => {
      if (location.state?.cineId) {
          setCineId(location.state.cineId);
      }
    }, [location.state]);
    
    const handlePriceUpdate = (nuevoPrecio) => {
      setPrecioTotal(nuevoPrecio);
    };
  
    const handleSeatsSelect = (asientos) => {
      setAsientosSeleccionados(asientos);
    };
  
    const handleHorarioSelect = (horario) => {
      setHorarioSeleccionado(horario);
    };

    return (
        <>
      <div className={styles['container-menu']}>
        <div className={styles['regreso']}>
          <a href='/'><img src={regresoSvg} alt="Back" /></a>
        </div>
        <div className={styles['title']}>
          <h1>Choose Seat</h1>
        </div>
        <div className={styles['menu']}>
          <a><img src={puntosSvg} alt="Menu" /></a>
        </div>
      </div>
      <div className={styles['container-seating']}>
        <div className={styles['container-screen']}>
          <img src={screenSvg} alt="Screen" />
        </div>
        <Asientos cineId={cineId} onPriceUpdate={handlePriceUpdate} onSeatsSelect={handleSeatsSelect}/>
      </div>
      <div className={styles['container-functions']}>
        <Horarios cineId={cineId} onHorarioSelect={handleHorarioSelect}/>
      </div>
      <div className={styles['container-preci']}>
        <Comprar cineId={cineId} precioTotal={precioTotal} asientosSeleccionados={asientosSeleccionados} horarioSeleccionado={horarioSeleccionado} />
      </div>
    </>
    )
  }
  
export default Tickets;