import { useEffect, useState } from 'react';
import getPokemonByName from '../services/getPokemonByName';
import PropTypes from 'prop-types';
import './PokemonCard.css';

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.substring(1);
};

function PokemonCard({ name }) {
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    getPokemonByName(name).then((data) => {
      setPokemon(data);
    });
  }, []);

  if (Object.keys(pokemon).length) {
    return (
      <section className="pokemon-card">
        <div className="pokemon-card-header">
          <h3>{`Nº: ${pokemon.id}`}</h3>
          <h3>{pokemon.name.capitalize()}</h3>
        </div>
        <div className="pokemon-card-other-infos">
          <img src={pokemon.sprites.other['official-artwork']['front_default']} />
        </div>
      </section>
    );
  }
}

PokemonCard.propTypes = {
  name: PropTypes.string.isRequired
};

export default PokemonCard;
