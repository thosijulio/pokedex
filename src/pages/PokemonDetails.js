import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import getPokemonByNameOrId from '../services/getPokemonByNameOrId';
import getPokemonSpeciesByIdOrName from '../services/getPokemonSpeciesByIdOrName';
import './PokemonDetails.css';

function PokemonDetails() {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPokemonInfos = async () => {
      setIsLoading(true);
      const dataPokemon = await getPokemonByNameOrId(pokemonId);
      const dataPokemonSpecies = await getPokemonSpeciesByIdOrName(pokemonId);

      setPokemon({ ...dataPokemon, ...dataPokemonSpecies });
      setIsLoading(false);
    };

    getPokemonInfos();
  }, []);

  return !isLoading ? (
    <section>
      <div className="pokemon-details-header">
        <h2>{pokemon.id}</h2>
        <h2>{pokemon.name}</h2>
      </div>
    </section>
  ) : (
    <Loading />
  );
}

export default PokemonDetails;
