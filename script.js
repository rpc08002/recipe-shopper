document.getElementById("displayJsDate").textContent = moment().format('dddd, MMMM Do YYYY');

// Trivia Banner
function setBanner() {

    let getTrivia = `https://jservice.io/api/category?id=49`;

    $.ajax({

        url: getTrivia,
        method: "GET"

    }).then(function(response) {
        
        let spot = Math.floor(Math.random() * 215) + 1;

        // Loop to weed out empty entries
        if(response.clues[spot].question === "" || response.clues[spot].answer === "") {
            setBanner();
        }
        else {
            var triviaValue = response.clues[spot].answer;
            $(".triviaBanner").append(`${response.clues[spot].question}? <button class="triviaReveal" value=${response.clues[spot].answer}>Reveal Answer</button>`);
        }

        $(".triviaReveal").on("click", function() {
            $(".triviaReveal").text(triviaValue);
        })
    })}
setBanner();

//Search input
var searchInput = "";
var currentIds = [];

//API related variables
let apiKey = "fff75352e87a4053a01dfc5c9c2d9545";
let recipeCount = 4;

function searchRecipe(searchInput) {
    currentIds = [];
    $(".searchResults").empty();

    let queryURL = `https://api.spoonacular.com/recipes/search?apiKey=${apiKey}&number=${recipeCount}&query=${searchInput}`;

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {

        var local = localStorage.setItem(recipeCount, searchInput)

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
                             <a href="${response.sourceUrl}" title="full recipe"><img src="${response.image}" style="width: 100%;" ></a>
                            <footer>
                            <hr>
                            <p style="font-size: 12px; font-weight:bold;">Prep Time: ${response.readyInMinutes}, Servings: ${response.servings}</p>
                            <h4> ${response.title}</h4>
                            <button class="button fas fa-cookie-bite" value="${response.id}" title="Add Ingredients to Shopping List"></button>
                            <p style="height: 10ch;">Description: ${response.summary}</p>
                            </footer>
                            </article>
                            </div>`
            );

            getIngredients(response);
            
        });

    });

}

var ingredientID = "";
var ingredientList = [];

var getIngredients = function(recipe) {

$(".fa-cookie-bite").on("click", function (event) {
console.log("ingredients",recipe);
//      = event.target.value;
//     //ingredientList = event.target;
//     console.log(ingredientID);

//     foodItem = `https://api.spoonacular.com/recipes/${ingredientID}/ingredientWidget.json`;

// //     for (var i = 0; i < ingredientID.length; i++) {ingredientID
// //         console.log(ingredientID)
// //     }

})
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
$(".closeBanner").on("click",function(){
    $(".triviaBanner").hide();
})

// Click Function for hiding/showing diet restrictions
$('.fa-sliders-h').click(function () {
    $('.filters').slideToggle(700); // Toggles the slide motion of the box
});

//Click Handler When Search is Submitted
$(".fa-search").on("click", function (event) {
    event.preventDefault();

    var searchInput = $(".searchRecipe").val();
    //console.log(searchInput)
    //if input is blank, return from funciton
    if (searchInput === "") {
        return;
    }

    searchRecipe(searchInput);
});