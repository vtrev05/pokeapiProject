'use strict';

//PINTAR EN HTML UNA LISTA DE LOS PRIMEROS 150 POKEMON CON SUS FOTOS.

const ulTotalPokemon = document.querySelector('.totalPokemonList');
const totalPokemonButton = document.querySelector('.allButton');

const getAllPokemons= async ()=>{
    ulTotalPokemon.innerHTML = ''
    const pokemonList = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=150")
    const pokemonsToJson = await pokemonList.json();
    const pokemonInfo = pokemonsToJson.results.map((pokemon,id)=>(
        {
        name:pokemon.name,
        image:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id+1}.png`
        }
    ))
    paintPokemon(pokemonInfo)
}
const paintPokemon = pokemons => {
    const totalInfo = pokemons.map(
        (pokemon) =>
        `<li class="pokeList"><h1>${pokemon.name}</h1>
        <img src="${pokemon.image}" alt="${pokemon.name}"/></li>`
    ).join('');
    ulTotalPokemon.innerHTML = totalInfo
}

totalPokemonButton.addEventListener('click', getAllPokemons)

//BUSCADOR ÚNICO DE POKEMON

const typeYourPokemon = document.querySelector('.typePokemon')
const searchPokemonButton = document.querySelector('.searchPokemon')
const OnePokemonInfo = document.querySelector('.onlyOne')

const getOnlyOne = async () => {
    const typeValue = typeYourPokemon.value
    
    const pokemonList = await fetch(`https://pokeapi.co/api/v2/pokemon/${typeValue}/`)
    const pokemonsToJson = await pokemonList.json();
    const pokemonInfo = 
        {
        name:pokemonsToJson.name,
        image:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${typeValue}.png`
        }
    OnePokemonInfo.innerHTML = `<li class="search"><h1>${pokemonInfo.name}</h1><img src="${pokemonInfo.image}"/></li>`
}

searchPokemonButton.addEventListener('click', getOnlyOne)

//ALERTA AL INTRODUCIR VALORES ERRÓNEOS

const alertFunction = (e) =>{
    e.target.removeEventListener(e.type, alertFunction)
    swal('Recuerda que los pokemon no son infinitos...',)
}

const alertError = (e) => {
    if (typeYourPokemon.value > 898){
        e.target.removeEventListener(e.type, alertFunction)
        swal('Recuerda que los pokemon no son infinitos...', 'Has introducido un número no válido', 'error')
    } 
}

typeYourPokemon.addEventListener('change', alertError)

//GENERAR RANDOM


const  getRandomArbitrary = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
    }

const generatePokemonRandom = document.querySelector('.generateRandom')
const randomList = document.querySelector('.randomList')

const getRandomPokemon = async () => {
    const random = getRandomArbitrary(0, 898)

    const pokemonList = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}/`)
    const pokemonsToJson = await pokemonList.json();
    const pokemonInfo = 
        {
        name:pokemonsToJson.name,
        image:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${random}.png`,
        power: pokemonsToJson.abilities.map(ab => ab.ability.name)
        }
    randomList.innerHTML = `<li class="searcherli"><h1>${pokemonInfo.name}</h1><img src="${pokemonInfo.image}"/><h3>Habilidades</h3><ul><li class="searcher">${pokemonInfo.power[0]}</li><li class="searcher">${pokemonInfo.power[1]}</li><li class="searcher">${pokemonInfo.power[2]}</li></ul>`
}

generatePokemonRandom.addEventListener('click', getRandomPokemon)