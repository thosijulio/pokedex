import getPokemonByNameOrId from './getPokemonByNameOrId';

async function getFourRandomPokemon() {
  const pokemon = [];

  while (pokemon.length < 4) {
    const data = await getPokemonByNameOrId(Math.floor(Math.random() * (900 - 1) + 1));
    pokemon.push(data);
  }

  return pokemon;
}

export default getFourRandomPokemon;
