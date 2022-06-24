import { useContext } from 'react';
import PokemonContext from '../context/PokemonContext';

function Pokemon() {
  const pokemon = useContext(PokemonContext);
  console.log(pokemon);
  return (
    <>
      <h1>Pokemon page</h1>
    </>
  );
}

export default Pokemon;
