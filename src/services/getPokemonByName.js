function getPokemonByName(name) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`).then((result) => result.json());
}

export default getPokemonByName;
