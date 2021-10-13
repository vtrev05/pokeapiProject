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
    OnePokemonInfo.innerHTML = `<li class="search"><h1 class="onePokemonTitle">${pokemonInfo.name}</h1><img src="${pokemonInfo.image}"/></li>`
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
        power: recoverAbility(pokemonsToJson.abilities)
        
        }
        debugger
        const totalAbilities = pokemonInfo.power.map((ab) => {
            return `<li class="searcher">${ab}</li>`
        }).join('')
        debugger
    randomList.innerHTML = `<li class="searcherli"><h1 class="onePokemonTitle">${pokemonInfo.name}</h1><img src="${pokemonInfo.image}"/><h3>Habilidades</h3><ul>${totalAbilities}</ul>`
}
const recoverAbility = (abilities) => {
    let abilitiesArray = [];
    abilities.forEach(element => {
        abilitiesArray.push(element.ability.name)
    })
    return abilitiesArray
}
generatePokemonRandom.addEventListener('click', getRandomPokemon)


//COMBATE POKEMON

const gen1 = document.querySelector('.generateRandom1')
const gen2 = document.querySelector('.generateRandom2')

const ulrandom1 = document.querySelector('.randomPoke1')
const ulrandom2 = document.querySelector('.randomPoke2')

let health1 = 10;
let health2 = 10;

const getRandomPokemon1 = async () => {
    const random = getRandomArbitrary(0, 898)
    const randomDamage = getRandomArbitrary(0, 15)

    const pokemonList = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}/`)
    const pokemonsToJson = await pokemonList.json();
    const pokemonInfo = 
        {
        name:pokemonsToJson.name,
        image:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${random}.png`,
        power: pokemonsToJson.abilities.map(ab => ab.ability.name)
        }
    ulrandom1.innerHTML = `<li class="searcherli"><h1 class="onePokemonTitle firstRandom">${pokemonInfo.name}</h1><img src="${pokemonInfo.image}"/><h3>Habilidades</h3><ul><li class="searcher"><button class="ability11">${pokemonInfo.power[0]}</button></li><li class="searcher"><button class="ability12">${pokemonInfo.power[1]}</button></li><li class="searcher"><button class="ability13">${pokemonInfo.power[2]}</button></li></ul><h3>EL primer pokemon elegido es ${pokemonInfo.name} que cuenta con ${health1} ph de vida</h3><h4>Selecciona alguna de sus habilidades para atacar. Recuerda que ${pokemonInfo.name} ataca en primer lugar</h4>`

    //FIRST ROUND
    let updatedHealth = health2-randomDamage
    const ab11 = document.querySelector('.ability11')
    const ab12 = document.querySelector('.ability12')
    const ab13 = document.querySelector('.ability13')
    const firstAttack = () => {
        
        if (randomDamage < 7) {
            ulrandom1.innerHTML += `<h3>Has seleccionado la habilidad ${pokemonInfo.power[0]} que hace ${randomDamage} hp de daño. No es muy efectivo. La salud actual del pokemon rival es <span class="finalHp1">${updatedHealth}</span></h3>`
        } else if (randomDamage >= 10){
            updatedHealth = 0;
            ulrandom1.innerHTML += `<h3>Has seleccionado la habilidad ${pokemonInfo.power[0]} que hace ${randomDamage} hp de daño. Has dado un golpe crítico!. La salud actual del pokemon rival es <span class="finalHp1">${updatedHealth}</span></h3>`
        } else {
            ulrandom1.innerHTML += `<h3>Has seleccionado la habilidad ${pokemonInfo.power[0]} que hace ${randomDamage} hp de daño. La salud actual del pokemon rival es <span class="finalHp1"">${updatedHealth}</span></h3>`
        }
    } 
    const secondAttack = () => {

        if (randomDamage < 7) {
            ulrandom1.innerHTML += `<h3>Has seleccionado la habilidad ${pokemonInfo.power[1]} que hace ${randomDamage} hp de daño. No es muy efectivo. La salud actual del pokemon rival es <span class="finalHp1"">${updatedHealth}</span></h3>`
        } else if (randomDamage >= 10){
            updatedHealth = 0;
            ulrandom1.innerHTML += `<h3>Has seleccionado la habilidad ${pokemonInfo.power[0]} que hace ${randomDamage} hp de daño. Has dado un golpe crítico!. La salud actual del pokemon rival es <span class="finalHp1"">${updatedHealth}</span></h3>`
        }else {
            ulrandom1.innerHTML += `<h3>Has seleccionado la habilidad ${pokemonInfo.power[1]} que hace ${randomDamage} hp de daño. La salud actual del pokemon rival es <span class="finalHp1"">${updatedHealth}</span></h3>`
        }
    }
    const thirdAttack = () => {

        if (randomDamage < 7) {
            ulrandom1.innerHTML += `<h3>Has seleccionado la habilidad ${pokemonInfo.power[2]} que hace ${randomDamage} hp de daño. No es muy efectivo. La salud actual del pokemon rival es <span class="finalHp1"">${updatedHealth}</span></h3>`
        } else if (randomDamage >= 10){
            updatedHealth = 0;
            ulrandom1.innerHTML += `<h3>Has seleccionado la habilidad ${pokemonInfo.power[0]} que hace ${randomDamage} hp de daño. Has dado un golpe crítico!. La salud actual del pokemon rival es <span class="finalHp1"">${updatedHealth}</span></h3>`
        }else {
            ulrandom1.innerHTML += `<h3>Has seleccionado la habilidad ${pokemonInfo.power[2]} que hace ${randomDamage} hp de daño. La salud actual del pokemon rival es <span class="finalHp1"">${updatedHealth}</span></h3>`
        }
        
    }

    ab11.addEventListener('click', firstAttack)
    ab12.addEventListener('click', secondAttack)
    ab13.addEventListener('click', thirdAttack)
}

//GENERAR SEGUNDO POKEMON PARA LUCHAR

const getRandomPokemon2 = async () => {
    const random = getRandomArbitrary(0, 898)
    let randomDamage2 = getRandomArbitrary(0, 15)

    const pokemonList = await fetch(`https://pokeapi.co/api/v2/pokemon/${random}/`)
    const pokemonsToJson = await pokemonList.json();
    const pokemonInfo = 
        {
        name:pokemonsToJson.name,
        image:`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${random}.png`,
        power: pokemonsToJson.abilities.map(ab => ab.ability.name)
        }
    ulrandom2.innerHTML = `<li class="searcherli"><h1 class="onePokemonTitle secondRandom">${pokemonInfo.name}</h1><img src="${pokemonInfo.image}"/><h3>Habilidades</h3><ul><li class="searcher"><button class="ability21">${pokemonInfo.power[0]}</button></li><li class="searcher"><button class="ability22">${pokemonInfo.power[1]}</button></li><li class="searcher"><button class="ability23">${pokemonInfo.power[2]}</button></li></ul><h3>EL segundo pokemon elegido es ${pokemonInfo.name} que cuenta con ${health2} ph de vida</h3><h4>Selecciona alguna de sus habilidades para atacar. Recuerda que ${pokemonInfo.name} ataca en segundo lugar</h4>`

//FIRS ROUND
    const ab21 = document.querySelector('.ability21')
    const ab22 = document.querySelector('.ability22')
    const ab23 = document.querySelector('.ability23')
    let updatedHealth2 = health1-randomDamage2
    const firstAttack2 = () => {
        
        if (randomDamage2 < 7) {
            ulrandom2.innerHTML += `<h3>Has seleccionado la habilidad ${pokemonInfo.power[0]} que hace ${randomDamage2} hp de daño. No es muy efectivo. La salud actual del pokemon rival es <span class="finalHp2"">${updatedHealth2}</span></h3>`
        } else if (randomDamage2 >= 10){
            updatedHealth2 = 0;
            ulrandom2.innerHTML += `<h3>Has seleccionado la habilidad ${pokemonInfo.power[0]} que hace ${randomDamage2} hp de daño. Has dado un golpe crítico!. La salud actual del pokemon rival es <span class="finalHp2"">${updatedHealth2}</span></h3>`
        } else {
            ulrandom2.innerHTML += `<h3>Has seleccionado la habilidad ${pokemonInfo.power[0]} que hace ${randomDamage2} hp de daño. La salud actual del pokemon rival es <span class="finalHp2"">${updatedHealth2}</span></h3>`
        }
        
    }
    const secondAttack2 = () => {

        if (randomDamage2 < 7) {
            ulrandom2.innerHTML += `<h3>Has seleccionado la habilidad ${pokemonInfo.power[1]} que hace ${randomDamage2} hp de daño. No es muy efectivo. La salud actual del pokemon rival es <span class="finalHp2"">${updatedHealth2}</span></h3>`
        } else if (randomDamage2 >= 10){
            updatedHealth2 = 0;
            ulrandom2.innerHTML += `<h3>Has seleccionado la habilidad ${pokemonInfo.power[0]} que hace ${randomDamage2} hp de daño. Has dado un golpe crítico!. La salud actual del pokemon rival es <span class="finalHp2"">${updatedHealth2}</span></h3>`
        }else {
            ulrandom2.innerHTML += `<h3>Has seleccionado la habilidad ${pokemonInfo.power[1]} que hace ${randomDamage2} hp de daño. La salud actual del pokemon rival es <span class="finalHp2"">${updatedHealth2}</span></h3>`
        }
    }
    const thirdAttack2 = () => {

        if (randomDamage2 < 7) {
            ulrandom2.innerHTML += `<h3>Has seleccionado la habilidad ${pokemonInfo.power[2]} que hace ${randomDamage2} hp de daño. No es muy efectivo. La salud actual del pokemon rival es <span class="finalHp2"">${updatedHealth2}</span></h3>`
        } else if (randomDamage2 >= 10){
            updatedHealth2 = 0;
            ulrandom2.innerHTML += `<h3>Has seleccionado la habilidad ${pokemonInfo.power[0]} que hace ${randomDamage2} hp de daño. Has dado un golpe crítico!. La salud actual del pokemon rival es <span class="finalHp2"">${updatedHealth2}</span></h3>`
        } else {
            ulrandom2.innerHTML += `<h3>Has seleccionado la habilidad ${pokemonInfo.power[2]} que hace ${randomDamage2} hp de daño. La salud actual del pokemon rival es <span class="finalHp2">${updatedHealth2}</span></h3>`
        }
        
    }
    
    ab21.addEventListener('click', firstAttack2)
    ab22.addEventListener('click', secondAttack2)
    ab23.addEventListener('click', thirdAttack2)


}

gen1.addEventListener('click', getRandomPokemon1)
gen2.addEventListener('click', getRandomPokemon2)

//MOSTRAR RESULTADO FINAL

const container = document.querySelector('.pokemonfight')
const finalBtn = document.querySelector('.result')

const printResult = () => {
    const spanValue = document.querySelector('.finalHp1')
    const spanValue2 = document.querySelector('.finalHp2')
    let numberResult1 = parseInt(spanValue.textContent)
    let numberResult2 = parseInt(spanValue2.textContent)


    if (numberResult1 > numberResult2) {
        container.innerHTML += `<h3>Ha ganado el Pokemon 2, que se ha quedado a ${numberResult1} HP de vida frente a los ${numberResult2} HP del Pokemon 1. ENHORABUENA AL GANADOR!</h3>`
        
    } else if (numberResult1 === numberResult2) {
        container.innerHTML += `<h3>Ha El resultado ha sido EMPATE. Ambos pokemon se han quedado con ${numberResult1} HP de vida. GRACIAS POR PARTICIPAR!</h3>`
    } else {
        container.innerHTML += `<h3>Ha ganado el Pokemon 1, que se ha quedado a ${numberResult2} HP de vida frente a los ${numberResult1} HP del Pokemon 2. ENHORABUENA AL GANADOR!</h3>`
    }
}


finalBtn.addEventListener('click', printResult)


