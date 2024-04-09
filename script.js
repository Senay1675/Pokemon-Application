const showPokemonBtn = document.querySelector("#showPokemon");
const showPokemonBtn2 = document.querySelector("#showPokemon-2")

// Anropar en asyncron funktion för att hämta information 
async function fetchPokemonList() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await response.json();
    console.log(data.results);
    return data.results; // returnerar pokemon-listan
}

fetchPokemonList()

// Den här funktionen fyller dropdown listan med alla pokemon alternativ

async function populatePokemonDropdown() {
    const pokemonList = await fetchPokemonList();
    const select = document.getElementById('pokemon-select');
    pokemonList.forEach(pokemon => {
        const option = document.createElement('option');
        option.text = pokemon.name;
        option.value = pokemon.url;
        select.appendChild(option);
    });
}
populatePokemonDropdown();

// Denna funktion tar en Pokémon in som data och visar dess detaljer på sidan genom att 
// ändra innehållet i olika element baserat på Pokémon-informationen.

function displayPokemonDetails(pokemon) {
    console.log(pokemon);
    document.getElementById('pokemon-name').textContent = pokemon.name;
    document.getElementById('pokemon-image').src = pokemon.sprites.front_default;
    document.getElementById('pokemon-types').textContent = `Types: ${pokemon.types.map(type => type.type.name).join(', ')}`;
    document.getElementById('pokemon-weight').textContent = `Weight: ${pokemon.weight}`;
    document.getElementById('pokemon-height').textContent = `Height: ${pokemon.height}`;
    
    const stats = pokemon.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ');
    document.getElementById('pokemon-stats').textContent = `Stats: ${stats}`;

    document.getElementById('pokemon-details').style.display = 'block';
    console.log(stats);
    
}
//  Den hämtar URL:en för den valda Pokémonen från dropdown-menyn,
//  använder sedan URL:en för att hämta detaljerad information om Pokémonen från API:et.

async function showPokemonDetails() {
    const select = document.getElementById('pokemon-select');
    const url = select.value;
    if (!url) return;

    const pokemonData = await fetch(url);
    let pokeData = await pokemonData.json();
    displayPokemonDetails(pokeData);
}

showPokemonBtn.addEventListener('click', () => {
    console.log("hej");
    showPokemonDetails();


});



async function populatePokemonDropdown2() {
    const pokemonList = await fetchPokemonList();
    const select = document.getElementById('pokemon-select-2');
    pokemonList.forEach(pokemon => {
        const option = document.createElement('option');
        option.text = pokemon.name;
        option.value = pokemon.url;
        select.appendChild(option);
    });
}
populatePokemonDropdown2();




function displayPokemonDetails2(pokemon) {
    console.log(pokemon);
    document.getElementById('pokemon-name-2').textContent = pokemon.name;
    document.getElementById('pokemon-image-2').src = pokemon.sprites.front_default;
    document.getElementById('pokemon-types-2').textContent = `Types: ${pokemon.types.map(type => type.type.name).join(', ')}`;
    document.getElementById('pokemon-weight-2').textContent = `Weight: ${pokemon.weight}`;
    document.getElementById('pokemon-height-2').textContent = `Height: ${pokemon.height}`;
    
    const stats = pokemon.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ');
    document.getElementById('pokemon-stats-2').textContent = `Stats: ${stats}`;

    document.getElementById('pokemon-details-2').style.display = 'block';
    console.log(stats);
    
}


async function showPokemonDetails2() {
    const select = document.getElementById('pokemon-select-2');
    const url = select.value;
    if (!url) return;

    const pokemonData = await fetch(url);
    let pokeData = await pokemonData.json();
    displayPokemonDetails2(pokeData);
}

showPokemonBtn2.addEventListener('click', () => {
    console.log("hej");
    showPokemonDetails2();


});