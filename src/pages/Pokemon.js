import { useContext, useEffect } from 'react';
import PokemonCard from '../components/PokemonCard';
import PokemonContext from '../context/PokemonContext';
import './Pokemon.css';

function Pokemon() {
  const { pokemon } = useContext(PokemonContext);

  useEffect(() => {
    if (pokemon) {
      console.log(pokemon);
    }
  });

  return (
    <main className="main-pokemon">
      <section>
        {pokemon.results.map(({ url }, index) => (
          <PokemonCard key={index} url={url} />
        ))}
      </section>
    </main>
  );
}

export default Pokemon;
