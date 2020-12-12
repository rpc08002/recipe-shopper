//Search input
var searchInput = "";

//API related variables
let apiKey = "2ba2c982b41349dab1c118f2767a1cd1";

function searchRecipe() {

    let queryURL = `https://api.spoonacular.com/recipes/search?apiKey=${apiKey}&number=4&query=${searchInput}`;

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {
        console.log(response.results[0].id); //to test API URL

        var recipeResponse = response

        let id = response.results[0].id

        queryURL =`https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var shoppingResponse = response;
            console.log("res2", shoppingResponse);


        });


    });
}

        // $(".searchResults").html(
        //     `<div class="column medium-3">
        //      <div class="card">
        //      <img src="https://spoonacular.com/recipeImages/${response.results[0].image}" width="100" >
        //     <div class="card-devider">
        //     <p>Prep Time: ${response.results[0].readyInMinutes}, Servings: ${response.results[0].servings}</p>
        //     </div>
        //     <div class="card-section">
        //     <h6> ${response.results[0].title}</h6>
        //     <p>Description: </p>
        //     </div>
        //     </div>
        //     </div>`

        // );


// Show and hide shopping list using close button
$(".fa-shopping-basket").on("click", function() {
    $("aside").show();
});

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
