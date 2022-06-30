import getPokemonByNameOrId from './getPokemonByNameOrId';

export default async function (region) {
  const result = await fetch(`https://pokeapi.co/api/v2/generation/${region}`);
  const { pokemon_species: pokemonSpecies } = await result.json();
  const idFromRegion = pokemonSpecies.map((pokemon) =>
    parseInt(pokemon.url.substring(42, pokemon.url.length - 1))
  );

  idFromRegion.sort((a, b) => a - b);

  const pokemonFromRegion = await Promise.all(
    idFromRegion.map(async (id) => {
      return getPokemonByNameOrId(id);
    })
  );

  return pokemonFromRegion;
}
