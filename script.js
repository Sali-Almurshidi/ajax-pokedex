// function to put the input from the user in fetch
function getArray(userInput){
    fetch("https://pokeapi.co/api/v2/pokemon/"+ userInput+"/")
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            console.log(myJson);
            getInformation(myJson);
        });
}
// get information from  getArray function
function getInformation (infoArray){
    let pokemonArray = infoArray;
    // let to get the pokemon id
    let inputID = pokemonArray.id ;
    // let to get the pokemon name
    let inputName = pokemonArray.name;
    // let to crate array for the 4 moves
    let movesArray = [];
    // let to get the img just the front default
    let imgSprite = pokemonArray.sprites.front_default ;
    //for loop to get 4 moves name random from the moves array
    for(i=0 ; i<4 ; i++){
        movesArray[i] = pokemonArray.moves[Math.floor(Math.random()*pokemonArray.moves.length)].move.name;
    }
    // to send the data to printInfo
    printInfo(inputID,inputName,imgSprite,movesArray);
}
// function to print the data on the screen
function printInfo(inputID,inputName,imgSprite,movesArray){
    document.getElementById("pokemonId").innerHTML = inputID;
    document.getElementById("pokemonImage").innerHTML = imgSprite;
    document.getElementById("pokemonMoves").innerHTML = movesArray;
}
//addEventListener to the button to get the value from the user
document.getElementById("callApi").addEventListener("click" , function () {
    let userInput = document.getElementById("PokemonName").value;
    getArray(userInput);
});

