import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import getPokemonByNameOrId from '../services/getPokemonByNameOrId';
import getPokemonSpeciesByIdOrName from '../services/getPokemonSpeciesByIdOrName';
import upperFirstLetter from '../services/upperFirstLetter';
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
          sprites: { other }
        } = dataPokemon;

        setImages([
          other['official-artwork'].front_default,
          other['dream_world'].front_default,
          sprites.front_default,
          sprites.back_default,
          sprites.front_shiny,
          sprites.back_shiny
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
      }, 6000);
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
        <div className="pokemon-details-image">
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
        </div>
        <div className="pokemon-details-flavor-text">
          <h3>Flavor Text:</h3>
          <p>
            {`${selectedPhrase.flavor_text.replace(/(\r\n|\n|\r|\f)/gm, ' ')}`}
            <b>
              <em>{` - Pokémon ${
                selectedPhrase.version.name.substring(0, 1).toUpperCase() +
                selectedPhrase.version.name.substring(1)
              } Version`}</em>
            </b>
          </p>
        </div>
        <div className="pokemon-type">
          <h3>Type:</h3>
          {pokemon.types.map(({ type: { name } }, index) => (
            <img
              alt="pokemon"
              key={index}
              src={require(`../images/pokemonTypes/${name}.png`)}
              title={name.substring(0, 1).toUpperCase() + name.substring(1)}
            />
          ))}
        </div>
        <div className="pokemon-other-details">
          <div className="pokemon-shape">
            <h3>Shape:</h3>
            <p>
              <b>Type: </b>
              {upperFirstLetter(pokemon.shape.name)}
            </p>
            <p>
              <b>Weight: </b>
              {`${pokemon.weight / 10}m`}
            </p>
            <p>
              <b>Height: </b>
              {`${pokemon.height / 10}kg`}
            </p>
          </div>
          <div className="pokemon-stats">
            <h3>Stats:</h3>
            <div className="stats">
              {pokemon.stats.map((stat, index) => (
                <p key={index}>
                  <b>{stat.stat.name}: </b>
                  {stat.base_stat}
                </p>
              ))}
            </div>
          </div>
          <div className="pokemon-other-infos">
            <h3>Other infos:</h3>
            <p>
              <b>Growth rate: </b>
              {upperFirstLetter(pokemon.growth_rate.name)}
            </p>
            <p>
              <b>Habitat: </b>
              {pokemon.habitat ? upperFirstLetter(pokemon.habitat.name) : 'None'}
            </p>
            <p>
              <b>Color: </b>
              {upperFirstLetter(pokemon.color.name)}
            </p>
          </div>
        </div>
      </main>
    </section>
  ) : (
    <Loading />
  );
}

export default PokemonDetails;
