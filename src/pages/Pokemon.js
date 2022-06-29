import { useContext, useEffect, useState } from 'react';
import PokemonCard from '../components/PokemonCard';
import PokemonContext from '../context/PokemonContext';
import getPokemon from '../services/getPokemon';
import getPokemonByRegion from '../services/getPokemonByRegion';
import getRegions from '../services/getRegions';
import './Pokemon.css';

function Pokemon() {
  const { pokemon, setPokemon } = useContext(PokemonContext);
  const [pokemonLimit, setPokemonLimit] = useState(20);
  const [showMorePokeBtn, setShowMorePokeBtn] = useState(true);
  const [regions, setRegions] = useState([]);

  const handleClick = () => {
    setPokemonLimit(pokemonLimit + 20);
  };

  const handleRegion = async ({ target: { value } }) => {
    if (value == 'All') {
      setPokemon(await getPokemon(pokemonLimit));
      setShowMorePokeBtn(true);
    } else {
      setPokemon(await getPokemonByRegion(value));
      setShowMorePokeBtn(false);
    }
  };

  useEffect(() => {
    const teste = async () => {
      if (!regions.length) {
        const data = await getRegions();
        if (data) {
          setRegions(data);
        }
        console.log(data);
      }
    };

    teste();
  }, [regions]);

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
      <section className="pokemon-regions-section">
        {regions.length &&
          regions.map((region, index) => (
            <button key={index} onClick={handleRegion}>
              {region.id}
            </button>
          ))}
      </section>
      <section className="pokemon-cards-section">
        {pokemon.results.map(({ name }, index) => (
          <PokemonCard key={index} name={name} />
        ))}
      </section>
      {showMorePokeBtn && (
        <button id="btn-more-pokemon" onClick={handleClick}>
          See more
        </button>
      )}
    </main>
  ) : null;
}

export default Pokemon;
