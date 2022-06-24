import { useContext, useEffect } from 'react';
import PokemonContext from '../context/PokemonContext';

function Pokemon() {
  const pokemon = useContext(PokemonContext);

  useEffect(() => {
    console.log(pokemon);
  });

  return (
    <>
      <h1>Pokemon page</h1>
    </>
  );
}

export default Pokemon;
