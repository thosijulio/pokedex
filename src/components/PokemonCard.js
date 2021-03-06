import { useEffect, useState } from 'react';
import getPokemonByNameOrId from '../services/getPokemonByNameOrId';
import PropTypes from 'prop-types';
import './PokemonCard.css';
import { Link } from 'react-router-dom';

String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.substring(1);
};

function PokemonCard({ name }) {
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    getPokemonByNameOrId(name).then((data) => {
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
          <img
            src={pokemon.sprites.other['official-artwork']['front_default']}
            title={`${pokemon.name} artwork`}
          />
        </div>
        <div className="pokemon-card-footer">
          <h4>Type:</h4>
          <div id="pokemon-types">
            {pokemon.types.map(({ type: { name, url } }, index) => {
              console.log(url);
              return (
                <Link key={index} to={`/type/${url.substring(30)}`}>
                  <img
                    alt="pokemon type"
                    src={require(`../images/pokemonTypes/${name}.png`)}
                    title={name}
                  />
                </Link>
              );
            })}
          </div>
          <p>
            <b>Height: </b>
            {pokemon.height / 10}m
          </p>
          <p>
            <b>Weight: </b>
            {pokemon.weight / 10}kg
          </p>
          <Link id="btn-pokemon-details" to={`/pokemon/${pokemon.id}`}>
            See Details
          </Link>
        </div>
      </section>
    );
  }
}

PokemonCard.propTypes = {
  name: PropTypes.string.isRequired
};

export default PokemonCard;
