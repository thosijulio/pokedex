async function getPokemonByNameOrId(nameOrId) {
  const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
  return result.json();
}

export default getPokemonByNameOrId;
