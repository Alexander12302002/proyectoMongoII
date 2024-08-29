import { createRoot } from 'react-dom/client'
import styles from '../../style/tickets/tickets.module.css';
import Asientos from './asientos'
import screenSvg from '../../assets/screen.svg'
import regresoSvg from '../../assets/regreso.svg'
import puntosSvg from '../../assets/puntos.svg'

const Tickets = () => {
    return (
        <>
        <div className={styles['container-menu']}>
          <div className={styles['regreso']}>
            <a href='/'><img src={regresoSvg} alt="Back"></img></a>
          </div>
          <div className={styles['title']}>
            <h1>Choose Seat</h1>
          </div>
          <div className={styles['menu']}>
            <a><img src={puntosSvg} alt="Menu"></img></a>
          </div>
        </div>
        <div className={styles['container-seating']}>
          <div className={styles['container-screen']}>
            <img src={screenSvg} alt="Screen"></img>
          </div>
          <Asientos />
        </div>
        <div className={styles['container-functions']}></div>
        <div className={styles['container-preci']}></div>
      </>
    )
  }
  
export default Tickets;