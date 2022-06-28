import { useContext, useEffect, useState } from 'react';
import PokemonCard from '../components/PokemonCard';
import PokemonContext from '../context/PokemonContext';
import getPokemon from '../services/getPokemon';
import './Pokemon.css';

function Pokemon() {
  const { pokemon, setPokemon } = useContext(PokemonContext);
  const [pokemonLimit, setPokemonLimit] = useState(20);

  const handleClick = () => {
    setPokemonLimit(pokemonLimit + 20);
  };

  useEffect(() => {
    const getMorePokemon = async () => {
      if (pokemonLimit > 20) {
        setPokemon(await getPokemon(pokemonLimit));
      }
    };

    getMorePokemon();
  }, [pokemonLimit]);

  return pokemon.results ? (
    <main className="main-pokemon">
      <section className="pokemon-cards-section">
        {pokemon.results.map(({ name }, index) => (
          <PokemonCard key={index} name={name} />
        ))}
        <button id="btn-more-pokemon" onClick={handleClick}>
          Ver mais
        </button>
      </section>
    </main>
  ) : null;
}

export default Pokemon;
