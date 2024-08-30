import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Peliculas from './components/home/peliculas.jsx';
import User from './components/home/user.jsx';
import Search from './components/home/search.jsx';
import ComingSoon from './components/home/comingSoon.jsx';
import Footer from './components/home/footer.jsx';
import Tickets from './components/tickets/tickets.jsx';
import styles from './style/home/index.module.css';
import MovieDetails from './components/movie/MovieDetails.jsx';
import CompraTickets from './components/tickets/compraTickets.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className={styles.body}>
          <div className={styles.container}> {/* Uso de estilos del módulo */}
            <div className={styles.user}>
              <User />
            </div>
            <div className={styles.Search_movie}>
              <Search />
            </div>
            <div className={styles.movies}>
              <Peliculas />
            </div>
            <div className={styles.coming_soon}>
              <ComingSoon />
            </div>
            <footer className={styles.footer}>
              <Footer />
            </footer>
          </div>
          </div>
        } />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/pelicula/:titulo" element={<MovieDetails />} />
        <Route path="/compra-tickets" element={<CompraTickets />} />
      </Routes>
    </Router>
  );
}

createRoot(document.getElementById('root')).render(
  <App />
);