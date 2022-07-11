import { Routes, Route } from 'react-router-dom';
import PokemonProvider from './context/PokemonProvider';
import Pokemon from './pages/Pokemon';
import Home from './pages/Home';
import Types from './pages/Types';
import NotFound from './pages/NotFound';
import './App.css';
import PokemonDetails from './pages/PokemonDetails';

function App() {
  return (
    <Routes>
      <Route path="/pokemon/:pokemonId" element={<PokemonDetails />} />
      <Route
        path="/pokemon"
        element={
          <PokemonProvider>
            <Pokemon />
          </PokemonProvider>
        }
      />
      <Route path="/types" element={<Types />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
