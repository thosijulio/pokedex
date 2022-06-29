import { useContext, useEffect, useState } from 'react';
import PokemonCard from '../components/PokemonCard';
import PokemonContext from '../context/PokemonContext';
import getPokemon from '../services/getPokemon';
import getPokemonByRegion from '../services/getPokemonByRegion';
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
        console.log(await getPokemonByRegion('generation-ii'));
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
      </section>
      <button id="btn-more-pokemon" onClick={handleClick}>
        See more
      </button>
    </main>
  ) : null;
}

export default Pokemon;
