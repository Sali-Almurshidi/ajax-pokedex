// function to put the input from the user in fetch
function getArray(userInput){
    fetch("https://pokeapi.co/api/v2/pokemon/"+ userInput+"/")
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            console.log(myJson);
        });
}
//addEventListener to the button to get the value from the user
document.getElementById("callApi").addEventListener("click" , function () {
    let userInput = document.getElementById("PokemonName").value;
    getArray(userInput);
    // console.log(userInput)
});