import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Peliculas from './components/peliculas.jsx'
import User from './components/user.jsx'
import Search from './components/search.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <>  
  <div class="container">
    <div class="user">
      <User/>
    </div>
    <div class="Search_movie">
      <Search/>
    </div>
    <div class="movies">
      <Peliculas/>
    </div>
    <div class="coming_soon">
    </div>
  </div>
  </>
)
