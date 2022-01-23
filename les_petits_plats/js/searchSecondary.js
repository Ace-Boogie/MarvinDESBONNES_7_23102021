import recipe from "./utilities/recipes.js";
import Recette from "./recette";
import SearchPrimary from "./searchPrimary";

const recette = recipe;
const main = document.querySelector('#app');

let getAllOptions = [];
let recetteFilter;
let searchTerm = "";
let showResult = [];
/* Récupation des datas pour les inputs annexes */

export default class SearchSecondary {

    checkBtnActived(btn, result, search, arr, tag) {
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
        main.innerHTML = "";
        search.value = "";
        search.value = e.target.textContent;
        if (search.id === "searchIngredient") {
            this.addTag("tagIngredient", e);
        }
        if (search.id === "searchAppareil") {
            this.addTag("tagAppareil", e);
        }
        if (search.id === "searchUstensile") {
            this.addTag("tagUstensile", e);
        }

        btn.classList.toggle("btn-actived");
        result.classList.toggle("divResult-actived");
        search.classList.toggle("searchInput-actived");

        this.addGetAllOptions(search);

        this.tagClose(btn, search);

    }

    addGetAllOptions(search) {
        getAllOptions.push({type: search.id, option: search.value});
        console.log(getAllOptions);
        this.showRecetteWithOption();
    }

    showRecetteWithOption() {
        let accumulateFilterRecette = recette;
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
        if (getAllOptions.length === 0) {

            main.innerHTML = "";

            searchTerm = document.getElementById("search").value;
            if (searchTerm.length > 2) {
                const searchPrimary = new SearchPrimary();
                searchPrimary.filterVersion();
                searchPrimary.addResultSearch();
                searchPrimary.showResultSearch();
            } else {
                recette.map((ele) => {
                    new Recette(ele, main);
                })
            }
        } else {
            recetteFilter.map((ele) => {
                new Recette(ele, main);
            })
        }
    }

    tagClose() {
        const tagRemoveArray = document.querySelectorAll("span.tag-actived");
        let tagRemove;
        tagRemoveArray.forEach(tag => tagRemove = tag)
        tagRemove.addEventListener("click", (e) => {
            tagRemove.textContent = e.target.textContent
            getAllOptions = getAllOptions.filter((options) => options.option !== tagRemove.textContent)
            tagRemove.classList.remove("tag-actived");
            main.innerHTML = "";
            this.showRecetteWithOption();
        })
    }

    addTag(tagType, e) {
        const newTag = document.createElement("span");
        newTag.textContent = e.target.textContent;
        newTag.classList.add(tagType, "tag-actived");
        const tagShow = document.querySelector(".tagShow");
        tagShow.append(newTag);
    }
}
