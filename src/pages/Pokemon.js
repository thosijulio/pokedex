import { useContext, useEffect, useState } from 'react';
import PokemonCard from '../components/PokemonCard';
import PokemonContext from '../context/PokemonContext';
import './Pokemon.css';

function Pokemon() {
  const { pokemon } = useContext(PokemonContext);
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    if (pokemon.results) {
      setPokemonList(pokemon.results);
    }
  });

  return pokemon ? (
    <main className="main-pokemon">
      <section className="pokemon-cards-section">
        {pokemonList.map(({ name }, index) => (
          <PokemonCard key={index} name={name} />
        ))}
      </section>
    </main>
  ) : null;
}

export default Pokemon;
