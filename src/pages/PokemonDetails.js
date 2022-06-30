import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getPokemonByNameOrId from '../services/getPokemonByNameOrId';

function PokemonDetails() {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    getPokemonByNameOrId(pokemonId).then((result) => setPokemon(result));
  });

  return <h1>{JSON.stringify(pokemon)}</h1>;
}

export default PokemonDetails;
