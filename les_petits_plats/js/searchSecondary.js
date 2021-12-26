import recipe from "./utilities/recipes.js";
import Recette from "./recette";

const recette = recipe;

let getAllOptions = [];
let showResultOption = [];
let arrayOptions = [];

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


        this.addListResult(btn, result, search, arr, tag, ulList, divList)
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

        this.addGetAllOptions(search);

        this.tagClose(btn, search, tag, showResultOption);

    }

    addGetAllOptions(search) {
        if (search.id === "searchIngredient") {
            getAllOptions.push(search.value);
        }
        if (search.id === "searchAppareil") {
            getAllOptions.push(search.value);
        }
        if (search.id === "searchUstensile") {
            getAllOptions.push(search.value);
        }
        console.log(getAllOptions);

        let resultAllDatas = Object.entries(getAllOptions).map(([id, set]) => [id, [...set]]);

        // resultRes.filter((resultSearch) => {
            recette.filter((type) => {
                console.log(search.value);
                type.ingredients.filter((ingredients) => {
                    if (ingredients.ingredient.toLowerCase().includes(search.value.toLowerCase())) {
                        showResultOption.push(type.name);
                    }
                })
                if (type.appliance.toLowerCase().includes(search.value.toLowerCase())) {
                    showResultOption.push(type.name);
                }
                type.ustensils.filter((ustensil) => {
                    if (ustensil.includes(search.value.toLowerCase())) {
                        showResultOption.push(type.name);
                    }
                })
            })
        // })

        console.log(showResultOption);

        let arrayNoSort = [...new Set(showResultOption)];
        let arraySort = arrayNoSort.sort();
        console.log(arraySort)

        arraySort.map((name) => {
            recette
                .filter((type) => {
                    if (type.name === name) {
                        new Recette(type, document.querySelector("#app"));
                    }
                })
        })
    }

    closeSearch(closeFilter, btn, divResult) {
        btn.classList.toggle("btn-actived");
        divResult.classList.toggle("divResult-actived");
    }

    tagClose(btn, search, tag, showResultOption) {
        tag.addEventListener("click", function (e) {
            if (tag.id === "tagIngredient") {
                showResultOption.splice(showResultOption.indexOf(e.target.textContent), 1);
                // searchIngredients(inp);
            }
            if (tag.id === "tagAppareil") {
                showResultOption.splice(showResultOption.indexOf(e.target.textContent), 1);
                // searchAppareils(inp);
            }
            if (tag.id === "tagUstensile") {
                showResultOption.splice(showResultOption.indexOf(e.target.textContent), 1);
                // searchUstensiles(inp);
            }
            // console.log(showResult);
            tag.textContent = "";
            tag.classList.remove("tag-actived");
            search.value = "";

            document.querySelector("#app").innerHTML = "";
            recette.map((ele) => {
                new Recette(ele, document.querySelector("#app"));
            })
        })
    }
}