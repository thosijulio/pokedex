import { useParams } from 'react-router-dom';

function PokemonDetails() {
  const { pokemonId } = useParams();

  return <h1>{pokemonId}</h1>;
}

export default PokemonDetails;
