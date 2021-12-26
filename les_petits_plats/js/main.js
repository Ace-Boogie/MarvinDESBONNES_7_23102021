import '../sass/main.scss';
import recipe from "./utilities/recipes.js";
import Recette from "./recette.js";
import SearchPrimary from "./searchPrimary";
import SearchSecondary from "./searchSecondary";

const main = document.querySelector('#app');
const recette = recipe;
const searchPrimary = new SearchPrimary();
const searchInput = document.querySelector("#search");


searchInput.addEventListener("input", debounce((e) => {
    searchPrimary.searchEvent(e);
}, 500))

function debounce(callback, delay) {
    var timer;
    return function () {
        var args = arguments;
        var context = this;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, delay)
    }
}

recette.map((ele) => {
    new Recette(ele, main);
})