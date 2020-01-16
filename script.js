let elementsFatherDiv  = null;
// function to put the input from the user in fetch
function getArray(userInput, countID) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + userInput + "/")
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {

            getInformation(myJson, countID);
        });
}

// get information from  getArray function
function getInformation(pokemonArray, countID) {
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
    printInfo(inputID, inputName, imgSprite, movesArray, countID);
    // send the URL to the fetch to get the previous evolution
    sendURL(speciesURL, countID);
}

// function to print the data on the screen
function printInfo(inputID, inputName, imgSprite, movesArray, countID) {

    // create a new div element
    let elementsDiv = document.createElement("div");
    let idDiv = "div" + countID;
    elementsDiv.setAttribute("id", idDiv);

    //create a h2 for ID
    let pokemonID = document.createElement("h2");
    let idID = "h2ID" + countID;
    pokemonID.setAttribute("id", idID);
    pokemonID.innerHTML = "Pokemon ID " + inputID;
    elementsDiv.appendChild(pokemonID);

    // creat h2 for the name
    let pokemonName = document.createElement("h2");
    let idName = "h2Name" + countID;
    pokemonName.setAttribute("id", idName);
    pokemonName.innerHTML = "Pokemon Name " + inputName;
    elementsDiv.appendChild(pokemonName);

    // creat img element
    let pokemonImg = document.createElement("img");
    let idImg = "pokemonImg" + countID;
    pokemonImg.setAttribute("id", idImg);
    pokemonImg.src = imgSprite;
    console.log(imgSprite);
    elementsDiv.appendChild(pokemonImg);

    // creat element for the moves
    let movesUl = document.createElement("ul");
    let idUl = "movesUl" + countID;
    movesUl.setAttribute("id", idUl);
    movesUl.innerHTML = "The moves for this pokemon ";
    // creat the moves in ul
    for (i = 0; i < 4; i++) {
        let moveLi = document.createElement("li");
        let idLi = "moveLi" + countID + i;
        moveLi.setAttribute("id", idLi);
        moveLi.innerHTML = movesArray[i];
        movesUl.appendChild(moveLi);
    }
    elementsDiv.appendChild(movesUl);

    // creat hr
    let hr = document.createElement("hr");
    elementsDiv.appendChild(hr);
    // add this div to the body
    elementsFatherDiv.appendChild(elementsDiv);
}

// function to get the previous evolve if there is one
function sendURL(speciesURL, countID) {
    fetch(speciesURL)
        .then((response) => {
            return response.json();
        })
        .then((mySecondJson) => {
            //console.log(mySecondJson.evolves_from_species.name);
            if (mySecondJson.evolves_from_species == null) {
                console.log("done");
                /*                // create a new div element
                                let elementsDivForEnd = document.createElement("div");
                                elementsDivForEnd.setAttribute("id", "divEnd");

                                //create a h2 for end
                                let pokemonEnd = document.createElement("h2");
                                pokemonEnd.innerHTML = "There is no e ";
                                elementsDivForEnd.appendChild(pokemonEnd);

                                document.body.appendChild(elementsDivForEnd);*/
                countID = 0;
            } else {
                countID++;
                getArray(mySecondJson.evolves_from_species.name, countID);
            }
        });
}

//addEventListener to the button to get the value from the user
document.getElementById("callApi").addEventListener("click", function () {
    let countID = 0;
    removeElement();
    let userInput = document.getElementById("PokemonName").value;
    addFatherDiv();
    getArray(userInput, countID);
});

function addFatherDiv() {
    elementsFatherDiv = document.createElement("div");
    elementsFatherDiv.setAttribute("id", "fatherDiv");
    document.body.appendChild(elementsFatherDiv);
}

// function to remove the father div
function removeElement() {
    if (elementsFatherDiv != null){
        let element = document.getElementById("fatherDiv");
        element.parentNode.removeChild(element);
    }
}

