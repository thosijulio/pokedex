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
          <h3>{pokemon.name.capitalize()}</h3>
          <h4>{`Nº: ${pokemon.id}`}</h4>
        </div>
        <div className="pokemon-card-image">
          <img src={pokemon.sprites.other['official-artwork']['front_default']} title="oi" />
        </div>
        <div className="pokemon-card-footer">
          <h4>Type:</h4>
          {pokemon.types.map(({ type: { name } }, index) => (
            <img key={index} src={require(`../images/pokemonTypes/${name}.png`)} title={name} />
          ))}
          <p>
            <b>Height: </b>
            {pokemon.height / 10}m
          </p>
          <p>
            <b>Weight: </b>
            {pokemon.weight / 10}kg
          </p>
        </div>
      </section>
    );
  }
}

PokemonCard.propTypes = {
  name: PropTypes.string.isRequired
};

export default PokemonCard;
