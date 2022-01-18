import recipe from "./utilities/recipes.js";
import Recette from "./recette";
import SearchSecondary from "./searchSecondary";

const main = document.querySelector('#app');
const recette = recipe;
const searchInput = document.querySelector("#search");
const searchSecondary = new SearchSecondary();
let searchTerm = "";
let showResult = [];

/* Récupation des datas pour les inputs annexes */
let resAllDatas = Object.fromEntries(['allDatas'].map((id) => [id, new Set()]));

export default class SearchPrimary {

    searchEvent(e){
        searchTerm = e.target.value;
            if (searchTerm.length > 2) {
                main.innerHTML = "";
                this.filterVersion();
                this.addResultSearch();
                this.showResultSearch();
            }
            else {
                main.innerHTML = "";
                searchSecondary.showRecetteWithOption();
                // recette.map((ele) => {
                //     new Recette(ele, main);
                // })
            }
    }

    //Version de recherche avec le filter ---------------------------------------------
    filterVersion() {
        recette.filter((type) => {
            if (type.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                // new Recette(type, main);
                console.log(type.name)
                resAllDatas.allDatas.add(type.name);
            }
            type.ingredients.filter((ingredients) => {
                // console.log(ingredients.ingredient);
                if (ingredients.ingredient.toLowerCase().includes(searchTerm.toLowerCase())) {
                    resAllDatas.allDatas.add(ingredients.ingredient);
                }
            })
            if (type.appliance.toLowerCase().includes(searchTerm.toLowerCase())) {
                // new Recette(type, main)
                resAllDatas.allDatas.add(type.appliance);
            }
            type.ustensils.filter((ustensil) => {
                if (ustensil.includes(searchTerm.toLowerCase())) {
                    resAllDatas.allDatas.add(ustensil);
                }
            })
        }).join("")
    }

    //Version de recherche avec la boucle for --------------------------------------------
    forVersion() {
        for (let recetteElement of recette) {

            if (recetteElement.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                // console.log(recetteElement.name);
                resAllDatas.allDatas.add(recetteElement.name);
            }
            for (let ingredients of recetteElement.ingredients) {
                if (ingredients.ingredient.toLowerCase().includes(searchTerm.toLowerCase())) {
                    // console.log(ingredients.ingredient);
                    resAllDatas.allDatas.add(ingredients.ingredient);
                }
            }
            if (recetteElement.appliance.toLowerCase().includes(searchTerm.toLowerCase())) {
                // console.log(recetteElement.appliance);
                resAllDatas.allDatas.add(recetteElement.appliance);
            }

            for (let ustensils of recetteElement.ustensils) {
                // console.log(ustensils);
                if (ustensils.includes(searchTerm.toLowerCase())) {
                    resAllDatas.allDatas.add(ustensils);
                }
            }
        }
    }

    // Ajoute le résultat de la recherche dans un tableau
    addResultSearch() {
        /* Tableau qui contiendra le résultat de la recherche */
        let resultAllDatas = Object.entries(resAllDatas).map(([id, set]) => [id, [...set]]);

        resultAllDatas[0][1].filter((resultSearch) => {
            recette.filter((type) => {
                if (type.name.toLowerCase().includes(resultSearch.toLowerCase())) {
                    showResult.push(type.name);
                }
                type.ingredients.filter((ingredients) => {
                    if (ingredients.ingredient.toLowerCase().includes(resultSearch.toLowerCase())) {
                        showResult.push(type.name);
                    }
                })
                if (type.appliance.toLowerCase().includes(resultSearch.toLowerCase())) {
                    showResult.push(type.name);
                }
                type.ustensils.filter((ustensil) => {
                    if (ustensil.includes(resultSearch.toLowerCase())) {
                        showResult.push(type.name);
                    }
                })
            })
        })

        console.log(showResult);
    }

    // Affichage des recettes après filtrage du tableau
    showResultSearch() {
        let arrayNoSort = [...new Set(showResult)];
        let arraySort = arrayNoSort.sort();
        console.log(arraySort)

        arraySort.map((name) => {
            recette
                .filter((type) => {
                    if (type.name === name) {
                        new Recette(type, main);
                    }
                })
        })
    }

}