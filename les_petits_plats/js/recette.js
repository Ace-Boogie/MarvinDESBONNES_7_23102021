export default class Recette {
    constructor(rawData, targetNode) {
        this.rawData = rawData;
        this.targetNode = targetNode;

        this.init();
    }

    init() {
        this.buildContainAll();
        this.buildImageRecette();
        this.buildContentRecette();
        this.buildNameAndTimeRecette();
        this.buildIngredientAndDescritionRecette();

        if (this.targetNode) {
            this.append(this.targetNode);
        }
    }

    buildContainAll() {
        this.articleContain = document.createElement("article");
        this.articleContain.classList.add("card");
        this.articleContain.tabIndex = 0;
        this.articleContain.id = this.rawData.id;
    }

    buildImageRecette() {
        this.image = document.createElement("img");
        this.image.classList.add("card-img-top")
        this.image.src = "../img/logo-les-petits-plats.png"
        this.image.alt = this.rawData.name;
    }

    buildContentRecette() {
        this.divContentRecette = document.createElement("div");
        this.divContentRecette.classList.add("card-body")
        this.divContentRecette.style.display = "flex";
        this.divContentRecette.style.flexDirection = "column"
    }

    buildNameAndTimeRecette() {
        this.divNameAndTime = document.createElement("div");
        this.divNameAndTime.classList.add("card-body-title");
        // this.divNameAndTime.style.display = "flex";
        // this.divNameAndTime.style.justifyContent = "space-between";
        /* Nom de la recette */
        this.nameRecette = document.createElement("h4");
        this.nameRecette.classList.add("card-title");
        this.nameRecette.textContent = this.rawData.name;

        /* Temps de préparation de la recette */
        this.timeForPrepartion = document.createElement("span");
        this.timeForPrepartion.classList.add("card-duration");
        this.timeForPrepartion.innerHTML = this.rawData.time + " minutes";

    }

    buildIngredientAndDescritionRecette() {
        this.divIngredientsAndDescription = document.createElement("div");
        this.divIngredientsAndDescription.classList.add("card-body-info");

        /* Ingredients */
        this.divIngredients = document.createElement("div");
        this.divIngredients.classList.add("card-body-ingredients");
        this.rawData.ingredients.map((element) => {
            this.ingredient = document.createElement("p");
            if (element.unit) {
                this.ingredient.textContent = element.ingredient + " : " +
                    element.quantity + " " + element.unit;
                this.divIngredients.append(this.ingredient);
            } else if (element.quantity) {
                this.ingredient.textContent = element.ingredient + " : " +
                    element.quantity;
                this.divIngredients.append(this.ingredient);
            } else {
                this.ingredient.textContent = element.ingredient;
                this.divIngredients.append(this.ingredient);
            }


        }).join("")

        /* Description de la recette */
        this.divDescription = document.createElement("div");
        this.divDescription.classList.add("card-body-preparation");
        this.description = document.createElement("p");
        this.description.textContent = this.rawData.description;
    }

    append(domNode) {
        this.articleContain.append(this.image);
        // this.articleContain.append(this.divContentRecette);

        this.divNameAndTime.append(this.nameRecette);
        this.divNameAndTime.append(this.timeForPrepartion);
        this.articleContain.append(this.divNameAndTime);

        this.divIngredientsAndDescription.append(this.divIngredients);
        this.divDescription.append(this.description);
        this.divIngredientsAndDescription.append(this.divDescription);
        this.articleContain.append(this.divIngredientsAndDescription);

        domNode.append(this.articleContain);
    }
}