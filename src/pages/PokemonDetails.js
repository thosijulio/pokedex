import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import getPokemonByNameOrId from '../services/getPokemonByNameOrId';
import getPokemonSpeciesByIdOrName from '../services/getPokemonSpeciesByIdOrName';
import './PokemonDetails.css';

function PokemonDetails() {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState({});
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!Object.keys(pokemon).length) {
      const getPokemonInfos = async () => {
        const dataPokemon = await getPokemonByNameOrId(pokemonId);
        const dataPokemonSpecies = await getPokemonSpeciesByIdOrName(pokemonId);
        setPokemon({ ...dataPokemon, ...dataPokemonSpecies });
        setIsLoading(false);
      };

      getPokemonInfos();
    }
  }, [pokemon]);

  useEffect(() => {
    if (!images.length && !isLoading) {
      const {
        sprites,
        sprites: {
          other,
          other: { dream_world, home }
        }
      } = pokemon;

      setImages([
        sprites.back_default,
        sprites.back_shiny,
        sprites.front_default,
        sprites.front_shiny,
        dream_world.front_default,
        home.front_default,
        home.front_shiny,
        other['official-artwork'].front_default
      ]);

      setSelectedImage(other['official-artwork'].front_default);
    }
  }, [images, pokemon]);

  const handleImageChange = ({ target }) => {
    setSelectedImage(target.getAttribute('src'));
  };

  return !isLoading ? (
    <section>
      <div className="pokemon-details-header">
        <h2>{pokemon.id}</h2>
        <h2>{pokemon.name}</h2>
      </div>
      <div className="pokemon-details-image-description">
        <img alt="pokemon" src={selectedImage} title={`${pokemon.name} artwork`} />
        {images.map((image, index) => (
          <img
            alt="pokemon"
            className="thumb-images"
            key={index}
            onClick={(ev) => handleImageChange(ev)}
            src={image}
          />
        ))}
        <p>
          {
            pokemon.flavor_text_entries.filter((entry) => entry.language.name === 'en')[0]
              .flavor_text
          }
        </p>
      </div>
      <div className="pokemon-other-details">
        <div id="pokemon-types">
          {pokemon.types.map(({ type: { name } }, index) => (
            <img
              alt="pokemon"
              key={index}
              src={require(`../images/pokemonTypes/${name}.png`)}
              title={name}
            />
          ))}
        </div>
        <div className="pokemon-shape">
          <p>{`${pokemon.weight / 10} m`}</p>
          <p>{`${pokemon.height / 10} kg`}</p>
        </div>
      </div>
    </section>
  ) : (
    <Loading />
  );
}

export default PokemonDetails;
