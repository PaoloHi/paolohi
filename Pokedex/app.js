const pokemonContainer = document.querySelector('.pokemon-container')
const spinner = document.querySelector('#spinner')
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
const src3D = document.querySelector('#src3D');
const srcpiexeles = document.querySelector('#piexeles');

let isview3d = false;  

let offset = 1;
let limit = 8 ;

previous.addEventListener('click',() => {
    if(offset != 1){
        offset -= 9;
        removeChildNodes(pokemonContainer);
        if(isview3d === true ) {
            fetchPokemons3D(offset,limit);
        } else{
            fetchPokemons(offset,limit);
        }
    }
})


next.addEventListener('click',() => {
    offset += 9;
    removeChildNodes(pokemonContainer);
    if(isview3d === true ) {
        fetchPokemons3D(offset,limit);
    } else{
        fetchPokemons(offset,limit);
    }
})

src3D.addEventListener('click',()=>{
    isview3d = true;
    removeChildNodes(pokemonContainer);
    fetchPokemons3D(offset,limit);
})

srcpiexeles.addEventListener('click',()=>{
    isview3d = false;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset,limit);
})

async function fetchPokemon3D(id){
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    await fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        createPokemon3D(data);
        spinner.style.display = "none";
    })
    .catch(err=>console.log(err))  
}

async function fetchPokemon(id){
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;
    await fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        createPokemon(data);
        spinner.style.display = "none";
    })
    .catch(err=>console.log(err))  
}

function fetchPokemons3D(offset,limit) {
    spinner.style.display = "block"
    for(let i = offset; i<=offset+limit; i++){
        fetchPokemon3D(i)

    }
}


function fetchPokemons(offset,limit) {
    spinner.style.display = "block"
    for(let i = offset; i<=offset+limit; i++){
        fetchPokemon(i)
    }
}


function createPokemon(pokemon) {
    const flipCard = document.createElement('div');
    flipCard.classList.add("flip-card");
    
    const cardContainer = document.createElement('div');
    cardContainer.classList.add("card-container");

    flipCard.appendChild(cardContainer);
    
    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img-container');

    const sprite = document.createElement('img');
    sprite.src = pokemon.sprites.front_default;

    spriteContainer.appendChild(sprite);

    /*const number = document.createElement('p');
    number.textContent = `#${pokemon.id.toString().padStart(3,0)}`;*/


    const name = document.createElement('p');
    name.classList.add('name');
    name.textContent = pokemon.name

    card.appendChild(spriteContainer);
    /*card.appendChild(number);*/
    card.appendChild(name);

    
    
    const cardBack = document.createElement('div')
    cardBack.classList.add('pokemon-block-back');
    cardBack.appendChild(progressBars(pokemon.stats))

    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);
    pokemonContainer.appendChild(flipCard);

    flipCard.classList.add('col-12')
    flipCard.classList.add('col-lg-3')
    flipCard.classList.add('col-md-4')
    flipCard.classList.add('col-sm-6')
}


function createPokemon3D(pokemon) {
    const flipCard = document.createElement('div');
    flipCard.classList.add("flip-card");
    
    const cardContainer = document.createElement('div');
    cardContainer.classList.add("card-container");

    flipCard.appendChild(cardContainer);
    
    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img-container');


    const sprite = document.createElement('img');
    sprite.src = pokemon.sprites.other.home.front_default

    spriteContainer.appendChild(sprite);

    const number = document.createElement('p');
    number.textContent = `#${pokemon.id.toString().padStart(3,0)}`;


    const name = document.createElement('p');
    name.classList.add('name');
    name.textContent = pokemon.name

    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);

    
    
    const cardBack = document.createElement('div')
    cardBack.classList.add('pokemon-block-back');
    cardBack.appendChild(progressBars(pokemon.stats))

    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);
    pokemonContainer.appendChild(flipCard);

    flipCard.classList.add('col-12')
    flipCard.classList.add('col-lg-3')
    flipCard.classList.add('col-md-4')
    flipCard.classList.add('col-sm-6')
}


function progressBars(stats) {
    const statsContainer = document.createElement("div");
    statsContainer.classList.add("stats-container");

    for (let i = 0; i < 3; i++) {
        const stat = stats[i];

        const statPercent = stat.base_stat / 2 + "%";
        const statContainer = document.createElement("stat-container");
        statContainer.classList.add("stat-container");

        const statName = document.createElement("p");
        statName.textContent = stat.stat.name;

        const progress = document.createElement("div");
        progress.classList.add("progress");

        const progressBar = document.createElement("div");
        progressBar.classList.add("progress-bar");
        progressBar.setAttribute("aria-valuenow", stat.base_stat);
        progressBar.setAttribute("aria-valuemin", 0);
        progressBar.setAttribute("aria-valuemax", 200);
        progressBar.style.width = statPercent;

        progressBar.textContent = stat.base_stat;

        progress.appendChild(progressBar);
        statContainer.appendChild(statName);
        statContainer.appendChild(progress);

        statsContainer.appendChild(statContainer);} 

        return statsContainer;
}

function removeChildNodes(parent){
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


fetchPokemons(offset,limit);

