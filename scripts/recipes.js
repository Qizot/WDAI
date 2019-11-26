
// add recipie form
var imageUrlPattern = /https?:[/|.|\w|\s|-]*\.(?:jpg|gif|png).*/g;
var focusedFoodItem = undefined;
var previousFocusedFoodItem = undefined;

function cleanForm() {
    ["dish-name", "ingredients", "preparation", "primary-image", "secondary-image"]
    .map(el => "#" + el)
    .forEach(id => {
        $(id).val("");
        $(id).removeClass("invalid-input");
        $(id).removeClass("valid-input");
    });
}

function setupAddItemForm() {
    let addItemButton = $("#add-item-button");
    let addItemForm = $("#add-item-container");
    let openForm = () => addItemForm.css("left", "0");
    let closeForm = () => addItemForm.css("left", "-350px");

    let closeAndClean = () => {
        closeForm();
        setTimeout(() => {
            cleanForm();
        }, 1000);
    };

    addItemButton.click(openForm)

    addItemForm.find("i.close-item-form").click(closeAndClean);

    addItemForm.find("button").on("click", (event) => {
        handleAddItemFormSubmit(closeAndClean);
    });

    for (let id of ["#primary-image", "#secondary-image"]) {
        let image = $(id);
        let changeStyle = () => {
            if (!image.val().match(imageUrlPattern)) {
                image.addClass("invalid-input");
            } else {
                image.removeClass("invalid-input");
                image.addClass("valid-input");
            }
        }

        image.focusout(changeStyle);
        image.focusout(changeStyle);
    }

    for (let id of ["#dish-name", "#ingredients", "#preparation"]) {
        let image = $(id);
        image.focusout(() => {
            if (image.val() === "") {
                image.addClass("invalid-input");
            } else {
                image.removeClass("invalid-input");
                image.addClass("valid-input");
            }
        });
    }
}

setupAddItemForm();


function handleAddItemFormSubmit(callback) {
    let dishName = $("#dish-name").val();
    let ingredients = $("#ingredients").val();
    let preparation = $("#preparation").val();
    let firstImage = $("#primary-image").val();
    let secondImage = $("#secondary-image").val();

    if ([dishName, ingredients, preparation, firstImage, secondImage].some(s => s === "")) return;

    let errorOccured = !firstImage.match(imageUrlPattern) || !secondImage.match(imageUrlPattern);
    if (errorOccured) return;

    addItem({dishName, ingredients, preparation, firstImage, secondImage});
    callback();
}

function createRandomId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function addItem({dishName, ingredients, preparation, firstImage, secondImage}) {
    let id = createRandomId();
    let ingredientsList = ingredients.split("\n").map(el => `<li>${el}</li>`).join("\n");

    let template = `
    <article id="${id}" class="food-item hvr-grow">
        <div class="food-item-content">
        <figure>
            <img class="animate-opacity" src="${firstImage}" />
            <figcaption>${dishName}</figcaption>
        </figure>
        <div class="recipe-details">
            <div class="ingredients">
                <h3>Ingredients:</h3>
                <ul>
                    ${ingredientsList}
                </ul>
            </div>
            <div class="preparation">
                <h3>Preparation</h3>
                <p>
                    ${preparation}
                </p>
            </div>
        </div>
        </div>
        <div class="remove-food-item">
            <i class="fa fa-close"></i>
        </div>
    </article>
    `;

    $("#recipes-grid").append(template);

    registerRecipe(id, {[firstImage]: secondImage, [secondImage]: firstImage});
}

// id => photos
var recipes = {

}

var staticRecipies = [{
    dishName: "Ramen",
    ingredients: ["Broth", "Noodles", "Meat (Beef)", "Spicies"],
    preparation: "Throw everything into the pot and boil for 5 hours",
    firstImage: "assets/ramen1.jpg",
    secondImage: "assets/ramen2.jpg"
}]

function preloadStaticRecipes() {
    staticRecipies.forEach(recipe => {
        addItem({
            dishName: recipe.dishName,
            ingredients: recipe.ingredients.join("\n"),
            preparation: recipe.preparation,
            firstImage: recipe.firstImage,
            secondImage: recipe.secondImage
        });
    })
}


preloadStaticRecipes()

registerRecipe("raw_fish", {
    "assets/raw_fish1.jpg": "assets/raw_fish2.jpg",
    "assets/raw_fish2.jpg": "assets/raw_fish1.jpg"
});

registerRecipe("random_bowls", {
    "assets/random_bowls1.jpg": "assets/random_bowls2.jpg",
    "assets/random_bowls2.jpg": "assets/random_bowls1.jpg"
});

function registerRecipe(id, photos) {
    recipes[id] = {photos: photos};

    for (let image of Object.values(photos)) {
        var img = new Image ();
        img.src = image;
    }
    
    let recipe = $(`#${id}`);
    recipe.find("img").on('click', () => {
        toggleRecipeDetails(id);`#{id}`
    });

    recipe.find("i").on("click", () => {
        unregisterRecipe(id);
        recipe.fadeOut("slow", () => recipe.remove());
    })

}

function unregisterRecipe(id) {
    delete recipes[id];
}

function replaceRecipePhoto(id) {
    let recipeImg = $(`#${id}`).find("img");
    let currentImageSrc = recipeImg.attr("src");

    const img  = recipeImg[0];

    recipeImg.css("opacity", "0");
    setTimeout(() => {
        if (focusedFoodItem === id && focusedFoodItem !== previousFocusedFoodItem) {
            previousFocusedFoodItem = focusedFoodItem;
            recipeImg.addClass("blured-image");
        } else {
            recipeImg.removeClass("blured-image");
        }
        recipeImg.attr("src", recipes[id].photos[currentImageSrc]);
        recipeImg.css("opacity", "1");
    }, 600);
}

function toggleRecipeDetails(id) {
    let details = $(`#${id}`).find("div.recipe-details");
    let currentDisplay = details.css("display");
    
    if (focusedFoodItem !== id) {
        if (focusedFoodItem) {
            let focusedDetails = $(`#${focusedFoodItem}`).find("div.recipe-details");
            focusedDetails.css("opacity", "0");
            setTimeout(() => focusedDetails.css("display", "none"), 600);
            replaceRecipePhoto(focusedFoodItem);
        }
        focusedFoodItem = id;
    }

    replaceRecipePhoto(id);
    if (currentDisplay === "none") {
        details.css("display", "inline-block");
        details.css("opacity", "0");
        setTimeout(() => details.css("opacity", "1"), 50);        
    } else {
        details.css("opacity", "0");
        setTimeout(() => details.css("display", "none"), 600);
    }

}