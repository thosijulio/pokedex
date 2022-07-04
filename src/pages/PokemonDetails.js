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
  const [phrases, setPhrases] = useState([]);
  const [selectedPhrase, setSelectedPhrase] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!Object.keys(pokemon).length) {
      const getPokemonInfos = async () => {
        const dataPokemon = await getPokemonByNameOrId(pokemonId);
        const dataPokemonSpecies = await getPokemonSpeciesByIdOrName(pokemonId);
        const {
          sprites,
          sprites: {
            other,
            other: { dream_world }
          }
        } = dataPokemon;

        setImages([
          sprites.back_default,
          sprites.back_shiny,
          sprites.front_default,
          sprites.front_shiny,
          dream_world.front_default,
          other['official-artwork'].front_default
        ]);
        setSelectedImage(other['official-artwork'].front_default);
        setPokemon({ ...dataPokemon, ...dataPokemonSpecies });
        setPhrases(
          dataPokemonSpecies.flavor_text_entries.filter((entry) => entry.language.name === 'en')
        );
        setSelectedPhrase(
          dataPokemonSpecies.flavor_text_entries.filter((entry) => entry.language.name === 'en')[0]
        );
        setIsLoading(false);
      };

      getPokemonInfos();
    }
  }, [pokemon]);

  useEffect(() => {
    if (Object.keys(pokemon).length > 0) {
      let interval = setInterval(() => {
        setSelectedPhrase(phrases[phrases.indexOf(selectedPhrase) + 1] || phrases[0]);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [pokemon, selectedPhrase]);

  const handleImageChange = ({ target }) => {
    setSelectedImage(target.getAttribute('src'));
  };

  return !isLoading ? (
    <section className="pokemon-details">
      <main className="pokemon-details-card">
        <div className="pokemon-details-header">
          <h2>{`Nº: ${pokemon.id} - ${
            pokemon.name.substring(0, 1).toUpperCase() + pokemon.name.substring(1)
          }`}</h2>
        </div>
        <div className="pokemon-details-image-description">
          <div className="selected-image-box">
            <img alt="pokemon" src={selectedImage} title={`${pokemon.name} artwork`} />
          </div>
          <div className="other-images">
            {images.map((image, index) => (
              <img
                alt="pokemon"
                className="thumb-images"
                key={index}
                onClick={(ev) => handleImageChange(ev)}
                src={image}
              />
            ))}
          </div>
          <p>{`${selectedPhrase.flavor_text.replace(/(\r\n|\n|\r|\f)/gm, ' ')} - Pokémon ${
            selectedPhrase.version.name.substring(0, 1).toUpperCase() +
            selectedPhrase.version.name.substring(1)
          } Version`}</p>
        </div>
        <div className="pokemon-other-details">
          <div className="pokemon-types">
            {pokemon.types.map(({ type: { name } }, index) => (
              <img
                alt="pokemon"
                key={index}
                src={require(`../images/pokemonTypes/${name}.png`)}
                title={name.substring(0, 1).toUpperCase() + name.substring(1)}
              />
            ))}
          </div>
          <div className="pokemon-shape">
            <p>{`${pokemon.weight / 10} m`}</p>
            <p>{`${pokemon.height / 10} kg`}</p>
          </div>
        </div>
      </main>
    </section>
  ) : (
    <Loading />
  );
}

export default PokemonDetails;
