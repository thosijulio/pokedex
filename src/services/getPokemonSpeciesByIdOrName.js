export default async function (idOrName) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${idOrName}`).then((result) =>
    result.json()
  );

  return data;
}
