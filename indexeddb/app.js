import Dexie from "https://cdn.jsdelivr.net/npm/dexie@3.0.3/dist/dexie.mjs";

const db = new Dexie("pokemonDB");

db.version(1).stores({
  pokemon: "++id,name",
});

db.on("populate", async () => {
  await db.pokemon.bulkPut([
    {
      name: "Bulbasaur",
      picture: await downloadImage(buildUrl(1)),
    },
    {
      name: "Charmander",
      picture: await downloadImage(buildUrl(4)),
    },
    {
      name: "Squirtle",
      picture: await downloadImage(buildUrl(7)),
    },
    {
      name: "Pikachu",
      picture: await downloadImage(buildUrl(25)),
    },
  ]);
});

db.open();

function buildUrl(pokeNumber) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeNumber}.png`;
}

function byChar(char) {
  return function (poke) {
    console.log(poke.name);
    return poke.name.includes(char);
  };
}

const pokemonList = await db.pokemon
  // .where("name")
  // .startsWithIgnoreCase("c")
  // .filter(byChar("a"))
  .toArray();

console.log(pokemonList);
const section = document.createElement("section");
const pokeHTML = pokemonList.map(toHTML).join("");
section.innerHTML = pokeHTML;
document.body.appendChild(section);

function toHTML(poke) {
  return `
      <a href="#" class="card-wrapper">
        <div class="card" style="border-color: var(--grass);">
          <div class="card-id" style="color: var(--grass);">${poke.id}</div>
          <div class="card-image">
            <img alt="${poke.name}" src="${URL.createObjectURL(poke.picture)}">
          </div>
        </div>
        <div class="card-name" style="background-color: var(--grass);">
          ${poke.name}
        </div>
      </a>
  `;
}

// Download and store an image
async function downloadImage(imageUrl) {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  return blob;
}

function saveFormData(event) {
  event.preventDefault();
  const form = event.target;
  console.log(form.name.value);
  console.log(form.pokeNumber.value);
  return false;
}

const form = document.querySelector('form');
form.addEventListener("submit", saveFormData);

