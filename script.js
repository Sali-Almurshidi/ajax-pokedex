let userInput ;
fetch("https://pokeapi.co/api/v2/"+ userInput)
    .then((response) => {
        return response.json();
    })
    .then((myJson) => {
        console.log(myJson);
    });

document.getElementById("").addEventListener("click" , function () {
    //userInput =
});