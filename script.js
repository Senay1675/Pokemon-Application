const showPokemonBtn = document.querySelector("#showPokemon");
const showPokemonBtn2 = document.querySelector("#showPokemon-2");
const comparePokemons = document.querySelector("#comparePokemons");
let battleText = document.querySelector(".battle-text");
let pokemon1 = null;
let pokemon2 = null;
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
    
    // const stats = pokemon.stats.map(stat => `${stat.stat.name}: ${stat.base_stat}`).join(', ');
    const stats = pokemon.stats.map(stat => `${stat.stat.name}: ${parseInt(stat.base_stat)}`).join(', ');
    document.getElementById('pokemon-stats').textContent = `Stats: ${stats}`;

    document.getElementById('pokemon-details').style.display = 'block';
    console.log(stats);

    
}
//  Den här funktionen hämtar URL:en för den valda Pokémonen från dropdown-menyn,
//  använder sedan URL:en för att hämta detaljerad information om Pokémonen från API:et.

async function showPokemonDetails() {
    const select = document.getElementById('pokemon-select');
    const url = select.value;
    if (!url) return;
    
    const pokemonData = await fetch(url);
    let pokeData = await pokemonData.json();
    displayPokemonDetails(pokeData);
    console.log(pokeData);

     let pokeName = pokeData.name;
     let pokeType = pokeData.types;
     let pokeWeight = pokeData.weight;
     let pokeHeight = pokeData.height;
     let pokeAllStats = pokeData.stats;
     let stat = {};
     pokeAllStats.forEach((statOB)=>{
        stat[statOB.stat.name] = statOB.base_stat;

     });
     console.log(stat);
      pokemon1 = new Pokemon (pokeName, pokeType, pokeWeight, pokeHeight, stat)
      console.log(pokemon1);
     
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
    
   
    const stats = pokemon.stats.map(stat => `${stat.stat.name}: ${parseInt(stat.base_stat)}`).join(', ');
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
    
    let pokeName = pokeData.name;
    let pokeType = pokeData.types;
    let pokeWeight = pokeData.weight;
    let pokeHeight = pokeData.height;
    let pokeAllStats = pokeData.stats;
    
    let stat = {};
    pokeAllStats.forEach((statOB)=>{
       stat[statOB.stat.name] = statOB.base_stat;
    
    });
    console.log(stat);
     pokemon2 = new Pokemon (pokeName, pokeType, pokeWeight, pokeHeight, stat)
     console.log(pokemon2);
}

showPokemonBtn2.addEventListener('click', () => {
    console.log("hej");
    showPokemonDetails2();


});

class Pokemon{
    constructor(name, type, weight, height, stats){
        this.name = name;
        this.type = Array.isArray(type) ? type : [type];
        this.weight = weight;
        this.height = height;
        this.stats = stats;
        

    }
// jämför vikt, längd och stats

   static comparePokemonMethod(){
        battleText.innerHTML = "";
        let allPokeStats1 = 0;
        let allPokeStats2 = 0;
        let firstPokemon = 0;
        let secondPokemon = 0;

        console.log(pokemon1.stats);

        Object.keys(pokemon1.stats).forEach((stat)=>{
            console.log(pokemon1.stats[stat]);
            allPokeStats1 += pokemon1.stats[stat]
        });
        console.log(allPokeStats1);

        console.log(pokemon1.stats);

        Object.keys(pokemon2.stats).forEach((stat)=>{
            console.log(pokemon2.stats[stat]);
            allPokeStats2 += pokemon2.stats[stat]
        });
        console.log(allPokeStats2);
        //jämför height
        if (pokemon1.height > pokemon2.height) {
            firstPokemon++; 
            battleText.innerHTML = `${pokemon1.name} is taller than ${pokemon2.name} `;
            //pokemon document.querySelector()
            
        }
        else if(pokemon2.height > pokemon1.height){
            secondPokemon++;
            battleText.innerHTML = `${pokemon2.name} is taller than ${pokemon1.name} `;
        }
        else if (pokemon1.height === pokemon2.height) {
            battleText.innerHTML = `${pokemon2.name} Is equally tall as ${pokemon1.name} `
        }

        // jämför weight

        if (pokemon1.weight > pokemon2.weight) {
            firstPokemon++; 
            battleText.innerHTML = `${pokemon1.name} is heavier than ${pokemon2.name} `;
            
        }
        else if(pokemon2.weight > pokemon1.weight){
            secondPokemon++;
            battleText.innerHTML = `${pokemon2.name} is heavier than ${pokemon1.name} `;
        }
        else if (pokemon1.weight === pokemon2.weight){
            battleText.innerHTML = `${pokemon1.name} is equally heavy as ${pokemon2.name} `;
        }

        //jämför stats

   

        if (firstPokemon > secondPokemon) { 
            battleText.innerHTML += `${pokemon1.name} is stronger than ${pokemon2.name} `;

        }
        else if (firstPokemon < secondPokemon){
            battleText.innerHTML += `${pokemon2.name} is stronger than ${pokemon1.name}`;
        }
        else if (firstPokemon === secondPokemon){
            battleText.innerHTML += `${pokemon2.name} is equally strong as ${pokemon1.name}`;
        }
       //
       
    }

}
 
comparePokemons.addEventListener("click", () => {
    Pokemon.comparePokemonMethod()
});