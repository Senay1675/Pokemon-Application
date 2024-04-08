const showPokemonBtn = document.querySelector("#showPokemon");


async function fetchPokemonList() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await response.json();
    console.log(data.results);
    return data.results;
}

fetchPokemonList()

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
