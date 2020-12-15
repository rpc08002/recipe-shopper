//Search input
var searchInput = "";
var currentIds = [];

//API related variables
let apiKey = "fff75352e87a4053a01dfc5c9c2d9545";
let recipeCount = 4;

function searchRecipe(searchInput) {

    $(".searchResults").empty();

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

    let cardDeck = "";

    currentIds.forEach(function (element) {
        console.log(element);
        let queryURL = `https://api.spoonacular.com/recipes/${element}/information?apiKey=${apiKey}`;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

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

            $(".searchResults").append(cardDeck);

        });

    });
}

// Show and hide shopping list using close button
$(".fa-shopping-basket").on("click", function () {
    $(".listPopup").show();
});

$(".fa-users").on("click", function () {
    $(".aboutUs").show();
});

$(".closeList").on("click", function () {
    $(".listPopup").hide();
});

$(".closeDev").on("click", function () {
    $(".aboutUs").hide();
});

$(".burger").on("click", function () {
    $(".menu").attr(transform, scaleX(0));
});

// Click Function for hiding/showing diet restrictions
    $('.fa-sliders-h').click(function () {
        $('.filters').slideToggle(700); // Toggles the slide motion of the box
    });

//Click Handler When Search is Submitted
$(".button").on("click", function (event) {
    event.preventDefault();

    var searchInput = $(".searchRecipe").val();
    //console.log(searchInput)
    //if input is blank, return from funciton
    if (searchInput === "") {
        return;
    }

    searchRecipe(searchInput);
});

