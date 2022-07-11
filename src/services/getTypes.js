export default async function () {
  const result = await fetch('https://pokeapi.co/api/v2/type/');
  return (await result.json()).results.filter(
    (type) => type.name !== 'unknown' && type.name !== 'shadow'
  );
}
