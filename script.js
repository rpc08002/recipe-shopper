//Search input
var searchInput = "";

//API related variables
let apiKey = "2ba2c982b41349dab1c118f2767a1cd1";

function searchRecipe () {
    let queryURL = `https://api.spoonacular.com/recipes/search?apiKey=${apiKey}&number=4&query=${searchInput}`
    
    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response){
        console.log(response);
    });
}

// Hide shopping list using close button
$(".close-button").on("click", function() {
    $("aside").hide();
});


//Click Handler When Search is Submitted
$(".searchRecipe").on("click", function(event){
    event.preventDefault();

    var searchInput = (document.querySelector(".searchRecipe")).value.trim();
    //if input is blank, return from funciton
    if (searchInput == "") {
        return;
    }

    searchInput.text = "";

    searchRecipe ();
});

