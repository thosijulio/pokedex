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

  const handleGame = (target) => {
    const btnOptions = document.getElementsByClassName('option-btn');
    const image = document.getElementById('hidden-pokemon');
    image.style.filter = 'brightness(100%)';
    if (target.innerText === upperFirstLetter(correctPokemon.name)) {
      setHits(hits + 1);
    } else setMisses(misses + 1);

    for (let index = 0; index < btnOptions.length; index += 1) {
      if (btnOptions[index].innerText == upperFirstLetter(correctPokemon.name)) {
        btnOptions[index].style.backgroundColor = '#80FF72';
      } else {
        btnOptions[index].style.backgroundColor = '#EF5350';
      }
    }

    setTimeout(() => {
      getFourRandomPokemon().then((data) => setOptions(data));
      image.style.filter = 'brightness(0%)';
      for (let index = 0; index < btnOptions.length; index += 1) {
        btnOptions[index].style.backgroundColor = '#FFCC00';
      }
    }, 3000);
  };

  return (
    <main className="whos-pokemon-main">
      <section className="whos-pokemon-hidden">
        {correctPokemon.name && (
          <img
            alt="hidden-pokemon"
            id="hidden-pokemon"
            src={correctPokemon.sprites.other['official-artwork'].front_default}
          />
        )}
      </section>
      <section className="whos-pokemon-options">
        <div className="options">
          {options.map((pokemon, index) => (
            <div className="option-btn" key={index} onClick={({ target }) => handleGame(target)}>
              {upperFirstLetter(pokemon.name)}
            </div>
          ))}
        </div>
        <h1>Results:</h1>
        <div className="results">
          <div className="hits-results">
            <i className="fa-solid fa-circle-check fa-2xl" />
            <h2>{hits}</h2>
          </div>
          <div className="misses-results">
            <i className="fa-solid fa-circle-xmark fa-2xl" />
            <h2>{misses}</h2>
          </div>
        </div>
      </section>
    </main>
  );
}

export default WhosThatPokemon;
