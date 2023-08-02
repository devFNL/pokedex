import { fetchPokemon, fetchPokemonList } from "./pokemon.service.js";

const $name = document.querySelector("#name");
const $pic = document.querySelector("#pic");
const $type = document.querySelector("#type");
const $weight = document.querySelector("#weight");
const $height = document.querySelector("#height");
const $input = document.querySelector("#search");
const $go = document.querySelector("#go");
const $listContainer = document.querySelector("#listCont");
const $nextButton = document.querySelector("#next");
const $previousButton = document.querySelector("#previous");

function printPokemonDetails(pokemon) {
  $name.innerText = pokemon.name.toUpperCase();
  $pic.src = pokemon.sprites.front_default;

  let tipos = "";
  for (let i = 0; i < pokemon.types.length; i++) {
    if (i > 0) {
      tipos += ", ";
    }
    tipos += pokemon.types[i].type.name.toUpperCase();
  }

  $type.innerText = "TYPE: " + tipos;
  $height.innerText = "Height: " + pokemon.height;
  $weight.innerText = "Weight: " + pokemon.weight;
}

function mapPokemonToButton(pokemon) {
  const button = document.createElement("button");
  button.innerText = pokemon.name;
  //  button.dataset.link = pokemon.url;
  console.log(pokemon);
  button.onclick = async () => {
    const pokemonResult = await fetchPokemon(pokemon.name);
    printPokemonDetails(pokemonResult);
  };
  return button;
}

async function renderButtons(page) {
  const buttons = page.results.map(mapPokemonToButton);

  $listContainer.innerHTML = "";

  buttons.forEach((element) => {
    $listContainer.appendChild(element);
  });
}

//---------------

let page = 0;

async function handlePageChange(e) {
  const direction = e.currentTarget.id;
  console.log(direction);
  $listContainer.innerHTML = '<div class="loader"></div>';

  let pageOffset;

  if (direction === "next") {
    page++;
    pageOffset = page * 10;
  } else {
    page--;
    pageOffset = page * 10;
  }

  const pokemonList = await fetchPokemonList(pageOffset);
  await renderButtons(pokemonList);
}

$nextButton.onclick = handlePageChange;
$previousButton.onclick = handlePageChange;

$go.onclick = async () => {
  const pokeRes = await fetchPokemon($input.value.toLowerCase());
  printPokemonDetails(pokeRes);
};
