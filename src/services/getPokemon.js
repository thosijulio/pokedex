export default async function (limit = 20) {
  const result = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}`);
  return await result.json();
}
