import recipe from "./utilities/recipes.js";
import Recette from "./recette";

const recette = recipe;
const main = document.querySelector('#app');

let getAllOptions = [];
let showResultOption = [];
let arrayOptions = [];

let recetteFilter;
let recetteFilterTag;
let accumulateFilterRecette = recette;
/* Récupation des datas pour les inputs annexes */

export default class SearchSecondary {

    checkBtnActived(btn, result, search, arr, tag ) {
        if (btn.classList.contains("btn-actived")) {
            btn.classList.toggle("btn-actived");
            result.classList.toggle("divResult-actived");
            search.classList.toggle("searchInput-actived");
        }

        this.addClassListActived(btn, result, search, arr, tag);

    }

    addClassListActived(btn, result, search, arr, tag) {
        btn.classList.toggle("btn-actived");
        result.classList.toggle("divResult-actived");
        search.classList.toggle("searchInput-actived");
        const divList = document.createElement("div");
        divList.classList.add("active-input-div");
        const ulList = document.createElement("ul");
        ulList.classList.add("ulList");
        result.appendChild(divList);
        divList.appendChild(ulList);

        this.addListResult(btn, result, search, arr, tag, ulList, divList);

    }

    addListResult(btn, result, search, arr, tag, ulList, divList) {
        arr.map((type) => {
            const liList = document.createElement("li");
            liList.classList.add("liList");
            liList.textContent = type;
            ulList.appendChild(liList);

            liList.addEventListener("click", (e) => {

                this.clickOnLiList(btn, result, search, arr, tag, ulList, divList, e);
            });

        })
    }

    clickOnLiList(btn, result, search, arr, tag, ulList, divList, e) {
        result.removeChild(divList);
        document.querySelector('#app').innerHTML = "";
        search.value = "";
        search.value = e.target.textContent;
        tag.textContent = e.target.textContent;
        tag.classList.add("tag-actived");
        btn.classList.toggle("btn-actived");
        result.classList.toggle("divResult-actived");
        search.classList.toggle("searchInput-actived");

        this.addGetAllOptions(search, tag);

        this.tagClose(btn, search, tag, showResultOption);

    }

    addGetAllOptions(search, tag) {
        if (search.id === "searchIngredient") {
            getAllOptions.push({type: search.id, option: search.value});
            showResultOption.push({type: tag.id, option: tag.textContent});
            console.log({type: tag.id, option: tag.textContent})
        }
        if (search.id === "searchAppareil") {
            getAllOptions.push({type: search.id, option: search.value});
            showResultOption.push(tag.textContent);
        }
        if (search.id === "searchUstensile") {
            getAllOptions.push({type: search.id, option: search.value});
            showResultOption.push(tag.textContent);
        }

        console.log(getAllOptions);

        getAllOptions.forEach((options) => {
            recetteFilter = accumulateFilterRecette.filter((filterRecette) => {
                if (options.type === "searchIngredient") {
                    return filterRecette.ingredients.find(item => item.ingredient === options.option);
                }
                if (options.type === "searchAppareil") {
                    return filterRecette.appliance === options.option;
                }
                if (options.type === "searchUstensile") {
                    return filterRecette.ustensils.find(item => item === options.option);
                }
            })

            accumulateFilterRecette = recetteFilter;
        })


        recetteFilter.map((ele) => {
            new Recette(ele, main);
        })
    }

    tagClose(btn, search, tag, showResultOption) {
        tag.addEventListener("click", function (e) {
            if (tag.id === "tagIngredient") {
                console.log(showResultOption.indexOf(tag.id))
                // showResultOption.splice(showResultOption.indexOf(e.target.textContent), 1);
                // getAllOptions.splice(getAllOptions.indexOf({type: search.id, option : search.value}), 1);
                // searchIngredients(inp);
            }
            if (tag.id === "tagAppareil") {
                showResultOption.splice(showResultOption.indexOf(e.target.textContent), 1);
                // getAllOptions.splice(getAllOptions.indexOf({type: search.id, option : search.value}), 1);
                // searchAppareils(inp);
            }
            if (tag.id === "tagUstensile") {
                showResultOption.splice(showResultOption.indexOf(e.target.textContent), 1);
                // getAllOptions.splice(getAllOptions.indexOf({type: search.id, option : search.value}), 1);
                // searchUstensiles(inp);
            }
            // console.log(showResult);
            // tag.textContent = "";
            tag.classList.remove("tag-actived");
            // search.value = "";

            console.log(showResultOption);
            showResultOption.forEach((option) => {
                recetteFilterTag = accumulateFilterRecette.filter((filterRecette) => {
                    if (option === tag.textContent) {
                        console.log("ok il y a un ingredient")
                        return filterRecette.ingredients.find(item => item.ingredient === option);
                    }
                    if (option === tag.textContent) {
                        return filterRecette.appliance === option;
                    }
                    if (option === tag.textContent) {
                        return filterRecette.ustensils.find(item => item === option);
                    }
                })

                accumulateFilterRecette = recetteFilterTag;
            })


            recetteFilterTag.map((ele) => {
                new Recette(ele, main);
            })
        })
    }
}