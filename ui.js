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

const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

function setCardBackgroundColor(type) {
  const card = document.querySelector(".card");
  const color = typeColors[type];
  if (color) {
    card.style.backgroundColor = color;
  } else {
    card.style.backgroundColor = "white";
  }
}

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
  $height.innerText = "Height: " + pokemon.height + " ft.";
  $weight.innerText = "Weight: " + pokemon.weight + " lbs.";

  setCardBackgroundColor(pokemon.types[0].type.name.toLowerCase());
}

function mapPokemonToButton(pokemon) {
  const button = document.createElement("button");
  button.innerText = pokemon.name;
  button.onclick = async () => {
    const pokemonResult = await fetchPokemon(pokemon.name);
    printPokemonDetails(pokemonResult);
  };
  return button;
}

async function renderButtons(page) {
  const pokemonList = await fetchPokemonList(page * 10);
  const buttons = pokemonList.results.map(mapPokemonToButton);

  $listContainer.innerHTML = "";

  buttons.forEach((element) => {
    $listContainer.appendChild(element);
  });
}

let currentPage = 0;

async function handlePageChange(e) {
  const direction = e.currentTarget.id;
  $listContainer.innerHTML = '<div class="loader"></div>';

  if (direction === "next") {
    currentPage++;
  } else {
    currentPage--;
  }

  await renderButtons(currentPage);
}

$nextButton.onclick = handlePageChange;
$previousButton.onclick = handlePageChange;

$go.onclick = async () => {
  const pokeRes = await fetchPokemon($input.value.toLowerCase());
  printPokemonDetails(pokeRes);
};

document.addEventListener("DOMContentLoaded", async () => {
  const pikachu = await fetchPokemon("pikachu");
  printPokemonDetails(pikachu);
  await renderButtons(currentPage);
});
