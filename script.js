//Search input
var searchInput = "";
var currentIds = [];

//API related variables
let apiKey = "908fa13543d44e09a8394d63af4bb148";
let recipeCount = 4;

function searchRecipe(searchInput) {

    let queryURL = `https://api.spoonacular.com/recipes/search?apiKey=${apiKey}&number=${recipeCount}&query=${searchInput}`;

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {

        for (var i = 0; i < recipeCount; i++) {

            //console.log(response.results[i].id); //to test API URL

            currentIds.push(response.results[i].id);

            //let id = response.results[i].id;


            renderTopRecipes();
            //console.log("Ids", currentIds);

        }
    });
}

function renderTopRecipes() {

    currentIds.forEach(function (element) {
        let queryURL = `https://api.spoonacular.com/recipes/${element}/information?apiKey=${apiKey}`;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            $(".searchResults").empty();

            let cardDeck = "";

            //console.log ("foreach", response);

            cardDeck +=
                `<div>
                        <article class="card">
                             <img src="${response.image}" style="width: 100%;" >
                            <footer>
                            <hr>
                            <p>Prep Time: ${response.readyInMinutes}, Servings: ${response.servings}</p>
                            <h1> ${response.title}</h1>
                            <p style="height: 20ch;">Description: ${response.summary}...</p>
                            </footer>
                            </article>
                            </div>`;

        });

        $(".searchResults").append(cardDeck);

    });
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

$(".burger").on("click", function() {
    $(".menu").attr(transform, scaleX(0));});

$(".fa-sliders-h").on("click", function() {
    $("fieldset").attr(display, contents);});


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
