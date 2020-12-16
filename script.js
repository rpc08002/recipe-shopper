//Search input
var searchInput = "";
var currentIds = [];

//API related variables
let apiKey = "136d0432ae8248a6b2265361748198f2";
let recipeCount = 4;

function searchRecipe(searchInput) {
    currentIds = [];
    $(".searchResults").empty();

    let queryURL = `https://api.spoonacular.com/recipes/search?apiKey=${apiKey}&number=${recipeCount}&query=${searchInput}`;

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {

        for (var i = 0; i < response.results.length; i++) {

            //console.log("IDresponse", response.results[i].id); //to test API URL

            currentIds.push(response.results[i].id);

            //let id = response.results[i].id;          

        }
        renderTopRecipes();
    });
}

function renderTopRecipes() {

    //console.log("Ids", currentIds);

    let cardDeck = "";

    currentIds.forEach(function (element, i, arr) {
        console.log(element);
        let queryURL = `https://api.spoonacular.com/recipes/${element}/information?apiKey=${apiKey}`;
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            //console.log("foreach", response);

            $(".searchResults").append(

                `<div>
                        <article class="card cardCSS">
                             <img src="${response.image}" style="width: 100%;" >
                            <footer>
                            <hr>
                            <p style="font-size: 12px; font-weight:bold;">Prep Time: ${response.readyInMinutes}, Servings: ${response.servings}</p>
                            <h4> ${response.title}</h4><button class="button fas fa-cookie-bite" id="shopList" title="Add Ingredients to Shopping List"></button>
                            <p style="height: 10ch;">Description: ${response.summary}...</p>
                            </footer>
                            </article>
                            </div>`
            );

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

// Click Function for Generating Random Photos of Food
$('.fa-dice').click(function () {
    $('.randomResults').slideToggle(700); // Toggles the slide motion of the box
});

$('.fa-cookie-bite').click(function () {
    `${response.extendedIngredients.name}`.append(".shoppingList")})


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

