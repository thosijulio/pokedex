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
    if (!Object.keys(pokemon).length) {
      const getPokemonInfos = async () => {
        setIsLoading(true);
        const dataPokemon = await getPokemonByNameOrId(pokemonId);
        const dataPokemonSpecies = await getPokemonSpeciesByIdOrName(pokemonId);
        setPokemon({ ...dataPokemon, ...dataPokemonSpecies });
        setIsLoading(false);
      };

      getPokemonInfos();
    }
  }, [pokemon]);

  return !isLoading ? (
    <section>
      <div className="pokemon-details-header">
        <h2>{pokemon.id}</h2>
        <h2>{pokemon.name}</h2>
      </div>
      <div className="pokemon-details-image-description">
        {pokemon.sprites && (
          <>
            <img
              alt="pokemon"
              src={pokemon.sprites.other['official-artwork']['front_default']}
              title={`${pokemon.name} artwork`}
            />
            <p>{pokemon.flavor_text_entries[0].flavor_text}</p>
          </>
        )}
      </div>
      <div>
        <div id="pokemon-types">
          {pokemon.types &&
            pokemon.types.map(({ type: { name } }, index) => (
              <img
                alt="pokemon"
                key={index}
                src={require(`../images/pokemonTypes/${name}.png`)}
                title={name}
              />
            ))}
        </div>
      </div>
    </section>
  ) : (
    <Loading />
  );
}

export default PokemonDetails;
