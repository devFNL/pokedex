// "servicio. buscar data"
async function fetchApi(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function fetchPokemon(pokemonName) {
  return fetchApi("https://pokeapi.co/api/v2/pokemon/" + pokemonName);
}

function fetchPokemonList(pageNumber) {
  return fetchApi(
    "https://pokeapi.co/api/v2/pokemon?limit=10&offset=" + pageNumber
  );
}

export { fetchPokemon, fetchPokemonList };
