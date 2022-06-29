import getPokemonByNameOrId from './getPokemonByNameOrId';

export default async function (region) {
  const result = await fetch(`https://pokeapi.co/api/v2/generation/${region}`);
  const { pokemon_species: pokemonSpecies } = await result.json();
  const idFromRegion = pokemonSpecies.map((pokemon) =>
    pokemon.url.substring(42, pokemon.url.length - 1)
  );

  const pokemonFromRegion = [];

  pokemonFromRegion.sort();

  idFromRegion.forEach(async (id) => {
    const pokemon = await getPokemonByNameOrId(id);
    pokemonFromRegion.push(pokemon);
  });

  return pokemonFromRegion;
}
