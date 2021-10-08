'use strict'
let favouriteNumber = 4;



const getRickAndMortyCharacter = async () => {
    const result = await fetch(`https://rickandmortyapi.com/api/character/`);
    const resultToJson = await result.json();
    let allCharacters = resultToJson.results
    console.log(allCharacters)

    const ul = document.querySelector('.ul');
    let ulContent = '';
    allCharacters.map(character => {
        const characterList = 
        `<li><h1>${character.name}</h1> 
        <img src="${character.image}" alt="${character.name}"/></li>`
        ;
        ulContent += characterList;
    })

    ul.innerHTML = ulContent;
};





getRickAndMortyCharacter()
