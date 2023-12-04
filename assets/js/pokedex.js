
const right = document.querySelector('.middle-row .right');
const left = document.querySelector('.middle-row .left');

let pokeID = 1;

description.innerHTML = "<div class=loading></div>";




function getPokemon(pokemon) {
    // AJAX Request
    // STEP 1
    const xhr = new XMLHttpRequest();
    // STEP 2


    xhr.open("GET", `https://pokeapi.co/api/v2/pokemon/${pokemon}`); // TODO: add url
    // STEP 4
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.response);
            // TODO: do something with the response
            pokemonName.textContent = response.name;
            nameInput.value = response.name;
            id.textContent = response.id;

            height.textContent = ((response.height) / 10);
            weight.textContent = ((response.weight) / 10);
            sprite.src = sprite.src = response.sprites.versions["generation-v"]["black-white"]["animated"].front_default ?? response.sprites.front_default;
            // sprite.src = response.sprites.versions["generation-v"]["black-white"]["animated"].front_default;
            // if (response.sprites.versions["generation-v"]["black-white"]["animated"].front_default === null) {
            //     sprite.src = response.sprites.front_default;
            // } ?? nullish coalescing operator
            pokeID = id.textContent;


        }

        if (xhr.status != 200) {
            pokemonName.textContent = "";
            id.textContent = "";


            height.textContent = "";
            weight.textContent = "";
            sprite.src = "./assets/images/transferring.gif"
            pokeID = "";

        }
    })


    // STEP 3
    xhr.send(null);

}

function getPokemonDetails(pokemon) {
    // AJAX Request
    // STEP 1
    const xhr = new XMLHttpRequest();
    // STEP 2
    xhr.open("GET", `https://pokeapi.co/api/v2/pokemon-species/${pokemon}`); // TODO: add url
    // STEP 4
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.response);
            // TODO: do something with the response            
            // pokemonGenus.textContent = response.genera[7].genus.replace('Pokémon', '');
            if (id.textContent == '1010' || id.textContent == '1009') {
                description.textContent = "No description."
            } else {
                description.textContent = response.flavor_text_entries[1].flavor_text;
            }

            for (let i = 0; i < response.genera.length; i++) {
                if (response.genera[i].language.name === "en") {
                    pokemonGenus.textContent = response.genera[i].genus.replace(' Pokémon', '') //TODO: KEEP EYE ONN THIS
                    break;
                }
            }
            pokeID = id.textContent;
        }
        if (xhr.status != 200) {
            console.log("error message");
            pokemonGenus.textContent = "";
            description.textContent = `Error! \n Pokemon Not Found.`;
            pokemonName.textContent = "";
            id.textContent = "";

            height.textContent = "";
            weight.textContent = "";
            sprite.src = "./assets/images/transferring.gif"
            pokeID = "";

        }
    })


    // STEP 3
    xhr.send(null);

}

function goLeft() {
    left.addEventListener('click', (e) => {
        pokeID--;
        getPokemon(pokeID);
        getPokemonDetails(pokeID);

    });

}
function goRight() {
    right.addEventListener('click', (e) => {
        pokeID++;
        getPokemon(pokeID);
        getPokemonDetails(pokeID);

    });

}


function getID() {
    nameInput.addEventListener('input', (e) => {

        console.log(e.target.value);

        nameInput.addEventListener('keydown', (e) => {
            if (e.keyCode == '13') {
                pokeName = e.target.value;
                getPokemon(pokeName);
                getPokemonDetails(pokeName);

            }

        })
    })
};

getID();
getPokemon(pokeID);
getPokemonDetails(pokeID);

goRight();
goLeft();

