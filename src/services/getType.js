export default async function (name) {
  const result = await fetch(`https://pokeapi.co/api/v2/type/${name}`);
  return await result.json();
}
