let countID = 0;

// function to put the input from the user in fetch
function getArray(userInput) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + userInput + "/")
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            getInformation(myJson);
            console.log(myJson);
        });
}

// get information from  getArray function
function getInformation(infoArray) {
    let pokemonArray = infoArray;
    // let to get the pokemon id
    let inputID = pokemonArray.id;
    // let to get the pokemon name
    let inputName = pokemonArray.name;
    // let to crate array for the 4 moves
    let movesArray = [];
    // let to get the img just the front default
    let imgSprite = pokemonArray.sprites.front_default;
    //for loop to get 4 moves name random from the moves array
    for (i = 0; i < 4; i++) {
        movesArray[i] = pokemonArray.moves[Math.floor(Math.random() * pokemonArray.moves.length)].move.name;
    }
    // get the url from species to check if there is previous evolution
    let speciesURL = pokemonArray.species.url;
    // to send the data to printInfo
    printInfo(inputID, inputName, imgSprite, movesArray);
    // send the URL to the fetch to get the previous evolution
    sendURL(speciesURL);
}

// function to print the data on the screen
function printInfo(inputID, inputName, imgSprite, movesArray) {
    console.log(inputID + inputName + imgSprite + movesArray);


    // create a new div element
    var elementsDiv = document.createElement("div");
    var idDiv = "div" + countID;
    elementsDiv.setAttribute("id", idDiv);
    //create a h2 for ID
    var pokemonID = document.createElement("h2");
    var idID = "h2ID" + countID;
    pokemonID.setAttribute("id", idID);
    pokemonID.innerHTML = inputID;
    elementsDiv.appendChild(pokemonID);
    // creat h2 for the name
    var pokemonName = document.createElement("h2");
    var idNAme = "h2Name" + countID;
    pokemonName.setAttribute("id", idID);
    pokemonName.innerHTML = inputName;
    elementsDiv.appendChild(pokemonName);

    document.body.appendChild(elementsDiv);

    /*  document.getElementById("pokemonId").innerHTML = inputID;
      document.getElementById("pokemonImage").innerHTML = imgSprite;
      document.getElementById("pokemonMoves").innerHTML = movesArray;*/
}

// function to get the previous evolve if there is one
function sendURL(speciesURL) {
    fetch(speciesURL)
        .then((response) => {
            return response.json();
        })
        .then((mySecondJson) => {
            //console.log(mySecondJson.evolves_from_species.name);
            if (mySecondJson.evolves_from_species == null) {
                console.log("this is the last evolve");
            } else {
                countID++;
                getArray(mySecondJson.evolves_from_species.name);
            }
        });
}

//addEventListener to the button to get the value from the user
document.getElementById("callApi").addEventListener("click", function () {
    let userInput = document.getElementById("PokemonName").value;
    getArray(userInput);
});

