import PokemonContext from './PokemonContext';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function PokemonProvider({ children }) {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/').then((result) =>
      result.json().then((data) => setPokemon(data))
    );
  }, []);

  return (
    <PokemonContext.Provider value={{ pokemon, setPokemon }}>{children}</PokemonContext.Provider>
  );
}

PokemonProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default PokemonProvider;
