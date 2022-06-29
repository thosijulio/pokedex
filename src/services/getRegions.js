export default async function () {
  const result = await fetch('https://pokeapi.co/api/v2/generation/');
  const { results } = await result.json();

  const idsFromRegion = results.map(({ url }) => url.substring(37, url.length - 1));

  const regions = await Promise.all(
    idsFromRegion.map(async (id) => {
      const result = await fetch(`https://pokeapi.co/api/v2/generation/${id}`);
      const {
        main_region: { name }
      } = await result.json();
      return { id, name };
    })
  );
  console.log(regions);
  return regions;
}
