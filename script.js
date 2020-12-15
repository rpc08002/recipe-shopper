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
        console.log(response.results[0].id); //to test API URL

        var recipeResponse = response

        let id = response.results[0].id

        queryURL = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var shoppingResponse = response;
            //console.log("res2", shoppingResponse); //to test for response

            renderTopRecipes(recipeResponse, shoppingResponse);

        });

    });
}

function renderTopRecipes(response1, response2) {


    $(".searchResults").html(
        `<div>
        <article class="card">
             <img src="https://spoonacular.com/recipeImages/${response1.results[0].image}" width="100" >
            <footer>
            <hr>
            <p>Prep Time: ${response1.results[0].readyInMinutes}, Servings: ${response1.results[0].servings}</p>
            <h1> ${response1.results[0].title}</h1>
            <p>Description: ${response2.summary}</p>
            </footer>
            </article>
            </div>`
    );
}

// Show and hide shopping list using close button
$(".fa-shopping-basket").on("click", function() {
    $(".listPopup").show();});

$(".fa-users").on("click", function() {
    $(".aboutUs").show();});

$(".closeList").on("click", function () {
    $(".listPopup").hide();});

$(".closeDev").on("click", function () {
    $(".aboutUs").hide();});


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
$(document).ready(function () {
    $('#btnSlideTog').click(function () {
        $('.allergens').slideToggle(500); // Toggles the slide motion of the box
    });
})
