import { Routes, Route } from 'react-router-dom';
import PokemonProvider from './context/PokemonProvider';
import Pokemon from './pages/Pokemon';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Routes>
      <Route
        path="/pokemon"
        element={
          <PokemonProvider>
            <Pokemon />
          </PokemonProvider>
        }
      />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
