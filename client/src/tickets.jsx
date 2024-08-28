import './style/tickets/tickets.css'
import { createRoot } from 'react-dom/client'
import Asientos from './components/tickets/asientos'
import screenSvg from './assets/screen.svg'
import regresoSvg from './assets/regreso.svg'
import puntosSvg from './assets/puntos.svg'

createRoot(document.getElementById('root')).render(
    <>
    <div className='container-menu'>
        <div className='regreso'>
            <a href='../index.html'><img src={regresoSvg}></img></a>
        </div>
        <div className='title'>
            <h1>Choose Seat</h1>
        </div>
        <div className='menu'>
            <a><img src={puntosSvg}></img></a>
        </div> 
    </div>
    <div className='container-seating'>
        <div className='container-screen'>
            <img src={screenSvg}></img>
        </div>   
        <Asientos/>
    </div>  
    <div className='container-functions'>
    </div>
    <div className='container-preci'>

    </div>
    </>
  )