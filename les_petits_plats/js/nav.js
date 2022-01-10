import '../sass/main.scss';
import recipe from "./utilities/recipes.js";
import Recette from "./recette.js";
import SearchPrimary from "./searchPrimary";
import SearchSecondary from "./searchSecondary";

const main = document.querySelector('#app');
const recette = recipe;
const searchSecondary = new SearchSecondary();

document.querySelector("#nav").innerHTML = `
<div class="input-group flex-nowrap">
  <input id="search" type="text" class="form-control" placeholder="Rechercher un ingrédient, appareil, ustensile, ou recette" aria-label="search" aria-describedby="basic-addon1">
  <div class="input-group-prepend">
    <span class="input-group-text" id="basic-addon1">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
    </span>
  </div>
</div>

<section class="tagShow">
<span id="tagIngredient" class="tagIngredient"></span>
<span id="tagAppareil" class="tagAppareil"></span>
<span id="tagUstensile" class="tagUstensile"></span>
</section>

<div id="divFilter">
    <div id="divIngredients">
        <button id="btn-searchIngredient" class="btn-searchIngredient">
        Ingredients
    <!--    <i class="fas fa-chevron-down" ></i>-->
        </button>
        <div id="resultIngredient" class="resultIngredient">
            <label for="searchIngredient"></label>
            <input type="text" id="searchIngredient" 
            placeholder="Recherche un ingredient">
            <i class="fas fa-chevron-up" id="closeIngredientsFilter"></i>
        </div>
    </div>

    <div id="divAppareil">
        <button id="btn-searchAppareil" class="btn-searchAppareil">
        Appareils
    <!--    <i class="fas fa-chevron-down" ></i>-->
        </button>
        <div id="resultAppareil" class="resultAppareil">
            <label for="searchAppareil"></label>
            <input type="text" id="searchAppareil"
           placeholder="Recherche un Appareils">
           <i class="fas fa-chevron-up" id="closeAppareilsFilter"></i>
        </div>
    </div>

    <div id="divUstensile">
        <button id="btn-searchUstensile" class="btn-searchUstensile">
        Ustensiles
    <!--    <i class="fas fa-chevron-down" ></i>-->
        </button>
        <div id="resultUstensile" class="resultUstensile">
            <label for="searchUstensile"></label>
            <input type="text" id="searchUstensile"
            placeholder="Recherche un ustensiles">
            <i class="fas fa-chevron-up" id="closeUstensilesFilter"></i>
        </div>
    </div>
</div>
`

/* Ingredients html */
const btnIngredient = document.querySelector("#btn-searchIngredient");
const closeIngredientsFilter = document.querySelector("#closeIngredientsFilter");
const searchIngredient = document.getElementById("searchIngredient");
const resultIngredient = document.getElementById("resultIngredient");
const tagIngredient = document.getElementById("tagIngredient");

/* Appareils html */
const btnAppareil = document.querySelector("#btn-searchAppareil");
const closeAppareilsFilter = document.querySelector("#closeAppareilsFilter");
const searchAppareil = document.getElementById("searchAppareil");
const resultAppareil = document.getElementById("resultAppareil");
const tagAppareil = document.getElementById("tagAppareil");

/* Usstensile html */
const btnUstensile = document.querySelector("#btn-searchUstensile");
const closeUstensilesFilter = document.querySelector("#closeUstensilesFilter");
const searchUstensile = document.getElementById("searchUstensile");
const resultUstensile = document.getElementById("resultUstensile");
const tagUstensile = document.getElementById("tagUstensile");


/* Récupation des datas pour les inputs annexes */

const res = Object.fromEntries(['ingredients', 'appliances', 'ustensils'].map((id) => [id, new Set()]));
recette.map((type) => {
    type.ingredients.map((ingredients) => {
        res.ingredients.add(ingredients.ingredient);
    })
    res.appliances.add(type.appliance);
    type.ustensils.map((ustensil) => {
        res.ustensils.add(ustensil);
    })
})
const resultRes = Object.entries(res).map(([id, set]) => [id, [...set]]);


/* Choix des options pour afficher la ou les recettes */
btnIngredient.addEventListener("click", function (e) {
    searchSecondary.checkBtnActived(btnIngredient, resultIngredient, searchIngredient, resultRes[0][1].sort(), tagIngredient);

    /* Désactive une option si celle-ci est actived */
    if (btnAppareil.classList.contains("btn-actived")) {
        closeSearch(e, btnAppareil, resultAppareil, searchAppareil);
    }
    if (btnUstensile.classList.contains("btn-actived")) {
        closeSearch(e, btnUstensile, resultUstensile, searchUstensile);
    }
})

btnAppareil.addEventListener("click", function (e) {
    searchSecondary.checkBtnActived(btnAppareil, resultAppareil, searchAppareil, resultRes[1][1].sort(), tagAppareil);

    /* Désactive une option si celle-ci est actived */
    if (btnIngredient.classList.contains("btn-actived")) {
        closeSearch(e, btnIngredient, resultIngredient, searchIngredient);
    }
    if (btnUstensile.classList.contains("btn-actived")) {
        closeSearch(e, btnUstensile, resultUstensile, searchUstensile);
    }
})

btnUstensile.addEventListener("click", function (e) {
    searchSecondary.checkBtnActived(btnUstensile, resultUstensile, searchUstensile, resultRes[2][1].sort(), tagUstensile);

    /* Désactive une option si celle-ci est actived */
    if (btnIngredient.classList.contains("btn-actived")) {
        closeSearch(e, btnIngredient, resultIngredient, searchIngredient);
    }
    if (btnAppareil.classList.contains("btn-actived")) {
        closeSearch(e, btnAppareil, resultAppareil, searchAppareil);
    }
})

/* Fermerture des options searchSecondary via click sur la flèche */
closeIngredientsFilter.addEventListener("click", function (e) {
    closeSearch(e, btnIngredient, resultIngredient, searchIngredient);
})

closeAppareilsFilter.addEventListener("click", function (e) {
    closeSearch(e, btnAppareil, resultAppareil, searchAppareil);
})

closeUstensilesFilter.addEventListener("click", function (e) {
    closeSearch(e, btnUstensile, resultUstensile, searchUstensile);
})

const closeSearch = (e, btn, result, search) => {
    btn.classList.toggle("btn-actived");
    result.classList.toggle("divResult-actived");
    search.classList.toggle("searchInput-actived");
}