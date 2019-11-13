
// id => photos
var recipes = {

}

registerRecipe("raw_fish", {
    "assets/raw_fish1.jpg": "assets/raw_fish2.jpeg",
    "assets/raw_fish2.jpeg": "assets/raw_fish1.jpg"
});

registerRecipe("ramen", {
    "assets/ramen1.jpg": "assets/ramen1.jpg"
});

registerRecipe("random_bowls", {
    "assets/random_bowls1.jpg": "assets/random_bowls1.jpg"
});

function registerRecipe(id, photos) {
    recipes[id] = photos;
    
    $(`#${id}`).find("img").on('click', () => {
        toggleRecipeDetails(id);`#{id}`
    });
}

function unregisterRecipe(id) {
    delete recipes[id];
}

function replaceRecipePhoto(id) {
    let recipesImg = $(`#${id}`).find("img");
    let currentImageSrc = recipesImg.attr("src");
    console.log(currentImageSrc);
    recipesImg.attr("src", recipes[id][currentImageSrc]);
}

function toggleRecipeDetails(id) {
    let preparation = $(`#${id}`).find("div.preparation");
    let nextDisplay = {"none": "block", "block": "none"};
    let currentDisplay = preparation.css("display");

    preparation.css("display", nextDisplay[currentDisplay]);
    replaceRecipePhoto(id);
}