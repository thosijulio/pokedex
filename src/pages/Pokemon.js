import { useContext, useEffect, useState } from 'react';
import Loading from '../components/Loading';
import PokemonCard from '../components/PokemonCard';
import PokemonContext from '../context/PokemonContext';
import getPokemon from '../services/getPokemon';
import getPokemonByNameOrId from '../services/getPokemonByNameOrId';
import getPokemonByRegion from '../services/getPokemonByRegion';
import getRegions from '../services/getRegions';
import upperFirstLetter from '../helpers/upperFirstLetter';
import './Pokemon.css';

function Pokemon() {
  const { pokemon, setPokemon } = useContext(PokemonContext);
  const [pokemonLimit, setPokemonLimit] = useState(20);
  const [showMorePokeBtn, setShowMorePokeBtn] = useState(true);
  const [regions, setRegions] = useState([]);

  const handleClick = () => {
    setPokemonLimit(pokemonLimit + 20);
  };

  const handleInputSearch = async ({ target: { value } }) => {
    if (value) {
      setPokemon([]);
      setPokemon([await getPokemonByNameOrId(value)]);
      setShowMorePokeBtn(false);
    }
  };

  const handleRegion = async ({ target: { value } }) => {
    if (value == 'All') {
      setPokemon([]);
      setPokemon(await getPokemon(pokemonLimit));
      setShowMorePokeBtn(true);
    } else {
      setPokemon([]);
      setPokemon(await getPokemonByRegion(value));
      setShowMorePokeBtn(false);
    }
  };

  useEffect(() => {
    const getRegionsOnMount = async () => {
      if (!regions.length) {
        const data = await getRegions();
        if (data) {
          setRegions(data);
        }
      }
    };

    getRegionsOnMount();
  }, [regions]);

  useEffect(() => {
    const getMorePokemon = async () => {
      if (pokemonLimit > 20) {
        setPokemon(await getPokemon(pokemonLimit));
      }
    };

    getMorePokemon();
  }, [pokemonLimit]);

  return regions.length ? (
    <main className="main-pokemon">
      <section className="pokemon-text-search">
        <h3>Search by name or id:</h3>
        <input onChange={(ev) => handleInputSearch(ev)} type="text" />
      </section>
      <section className="pokemon-regions-section">
        <h3>Search by region:</h3>
        <div className="btn-regions">
          <button onClick={(ev) => handleRegion(ev)} value="All">
            All
          </button>
          {regions.map((region, index) => (
            <button key={index} onClick={(ev) => handleRegion(ev)} value={region.id}>
              {upperFirstLetter(region.name)}
            </button>
          ))}
        </div>
      </section>
      {pokemon.length ? (
        <section className="pokemon-cards-section">
          {pokemon.map(({ name }, index) => (
            <PokemonCard key={index} name={name} />
          ))}
        </section>
      ) : (
        <Loading />
      )}
      {showMorePokeBtn && (
        <button id="btn-more-pokemon" onClick={handleClick}>
          See more
        </button>
      )}
    </main>
  ) : (
    <Loading />
  );
}

export default Pokemon;
