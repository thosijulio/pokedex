import { useEffect, useState } from 'react';
import getFourRandomPokemon from '../services/getFourRandomPokemon';
import upperFirstLetter from '../helpers/upperFirstLetter';
import './WhosThatPokemon.css';

function WhosThatPokemon() {
  const [options, setOptions] = useState([]);
  const [correctPokemon, setCorrectPokemon] = useState({});
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);

  useEffect(() => {
    getFourRandomPokemon().then((data) => setOptions(data));
  }, []);

  useEffect(() => {
    if (options.length === 4) setCorrectPokemon(options[Math.floor(Math.random() * (3 - 1) + 1)]);
  }, [options]);

  const handleGame = (choisedName) => {
    if (choisedName === correctPokemon.name) {
      setHits(hits + 1);
    } else setMisses(misses + 1);

    getFourRandomPokemon().then((data) => setOptions(data));
  };

  return (
    <main className="whos-pokemon-main">
      <section className="whos-pokemon-hidden">
        {correctPokemon.name && (
          <img
            alt="hidden-pokemon"
            src={correctPokemon.sprites.other['official-artwork'].front_default}
          />
        )}
      </section>
      <section className="whos-pokemon-options">
        <div className="options">
          {options.map((pokemon, index) => (
            <div key={index} onClick={() => handleGame(pokemon.name)}>
              {upperFirstLetter(pokemon.name)}
            </div>
          ))}
        </div>
        <div className="results">
          <h1>Results</h1>
          <i className="fa-solid fa-circle-check" />
          <p>{hits}</p>
          <i className="fa-solid fa-circle-xmark" />
          <p>{misses}</p>
        </div>
      </section>
    </main>
  );
}

export default WhosThatPokemon;
