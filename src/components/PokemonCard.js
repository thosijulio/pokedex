import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './PokemonCard.css';

function PokemonCard({ url }) {
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    fetch(url)
      .then((result) => result.json())
      .then((data) => setPokemon(data));
  }, []);

  return pokemon ? <h1>{pokemon.name}</h1> : null;
}

PokemonCard.propTypes = {
  url: PropTypes.string.isRequired
};

export default PokemonCard;
