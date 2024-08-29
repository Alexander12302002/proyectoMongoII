import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieDetails from './components/movie/MovieDetails.jsx';
import './style/movie/movieDetails.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/pelicula/:titulo" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

createRoot(document.getElementById('root')).render(
  <App />
);
