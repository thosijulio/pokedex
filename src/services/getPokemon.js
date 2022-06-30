export default async function (limit = 20, offset = 0) {
  const result = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);
  return (await result.json()).results;
}
