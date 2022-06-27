import { useEffect, useState } from 'react';
import getPokemonByName from '../services/getPokemonByName';
import PropTypes from 'prop-types';
import './PokemonCard.css';

function PokemonCard({ name }) {
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    getPokemonByName(name).then((data) => {
      setPokemon(data);
    });
  }, []);

  if (Object.keys(pokemon).length) {
    return (
      <div className="pokemon-card">
        <h4>{pokemon.name}</h4>
        <img src={pokemon.sprites.other['official-artwork']['front_default']} />
      </div>
    );
  }
}

PokemonCard.propTypes = {
  name: PropTypes.string.isRequired
};

export default PokemonCard;
