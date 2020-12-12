//Search input
var searchInput = "";

//API related variables
let apiKey = "2ba2c982b41349dab1c118f2767a1cd1";

function searchRecipe(searchInput) {
    let queryURL = `https://api.spoonacular.com/recipes/search?apiKey=${apiKey}&number=4&query=${searchInput}`;

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {
        console.log(response.results[0].image); //to test API URL

        $(".searchResults").html(
            `<div class="column medium-3">
             <div class="card">
             <img src="https://spoonacular.com/recipeImages/${response.results[0].image}" width="100" >
            <div class="card-devider">
            <p>Prep Time: ${response.results[0].readyInMinutes}, Servings: ${response.results[0].servings}</p>
            </div>
            <div class="card-section">
            <h6> ${response.results[0].title}</h6>
            <p>Description: </p>
            </div>
            </div>
            </div>`

        );


    });
}

// Hide shopping list using close button
$(".close-button").on("click", function () {
    $("aside").hide();
});


//Click Handler When Search is Submitted
$(".button").on("click", function (event) {
    event.preventDefault();

    var searchInput = $(".searchRecipe").val();
    console.log(searchInput)
    //if input is blank, return from funciton
    if (searchInput === "") {
        return;
    }

    searchRecipe(searchInput);
});

// Click Function for hiding/showing diet restrictions
$(document).ready(function(){
        $('#btnSlideTog').click(function() {
            $('.dietBox').slideToggle(500); // Toggles the slide motion of the box
    });
})
