
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
    
    let recipe = $(`#${id}`);
    recipe.find("img").on('click', () => {
        toggleRecipeDetails(id);`#{id}`
    });

    recipe.find("i").on("click", () => {
        console.log("should delete recipie");
        unregisterRecipe(id);
        recipe.fadeOut("slow", () => recipe.remove());
        // recipe.remove();
    })

}

function unregisterRecipe(id) {
    delete recipes[id];
}

function replaceRecipePhoto(id) {
    let recipeImg = $(`#${id}`).find("img");
    let currentImageSrc = recipeImg.attr("src");
    recipeImg
        .fadeOut("slow", () => {
            recipeImg.attr("src", recipes[id][currentImageSrc]);
            recipeImg.fadeIn("slow");
        });


}

function toggleRecipeDetails(id) {
    let preparation = $(`#${id}`).find("div.preparation");
    let currentDisplay = preparation.css("display");

    if (currentDisplay === "none") {
        preparation.fadeIn("slow");
    } else {
        preparation.fadeOut("slow");
    }

    replaceRecipePhoto(id);
}