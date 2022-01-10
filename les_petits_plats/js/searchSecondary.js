import recipe from "./utilities/recipes.js";
import Recette from "./recette";

const recette = recipe;
const main = document.querySelector('#app');

let getAllOptions = [];
let tagArray = [];
let arrayOptions = [];

let recetteFilter;
let recetteFilterTag;
let filterViaTag;
let indexArrayGetAllOptions;
let accumulateFilterRecette = recette;
let accumulateFilterRecette2 = recette;
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

        console.log(getAllOptions.length);
        console.log(getAllOptions);
        if (getAllOptions === null){
            console.log("personne")
        }
    }

    clickOnLiList(btn, result, search, arr, tag, ulList, divList, e) {
        result.removeChild(divList);
        main.innerHTML = "";
        search.value = "";
        search.value = e.target.textContent;
        tag.textContent = e.target.textContent;
        tag.classList.add("tag-actived");
        btn.classList.toggle("btn-actived");
        result.classList.toggle("divResult-actived");
        search.classList.toggle("searchInput-actived");

        this.addGetAllOptions(search, tag);

        this.tagClose(btn, search, tag);

    }

    addGetAllOptions(search) {
        // if (getAllOptions.length === 0) {
        //     main.innerHTML = "";
        // }

        const pushSearch = getAllOptions.push({type: search.id, option: search.value});
        if (search.id === "searchIngredient") {
            pushSearch;
        }
        if (search.id === "searchAppareil") {
            pushSearch;
        }
        if (search.id === "searchUstensile") {
            pushSearch;

        }

        console.log(getAllOptions);

        this.showRecetteWithOption();
    }

    showRecetteWithOption() {

            getAllOptions.forEach((options) => {
                console.log(options);
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

    /* getAllOptions.filter(!tag.id) faire un return retourne un élément avec filter dont l'id est différent de l'élément sélectionné */
    tagClose(btn, search, tag) {
        tag.addEventListener("click", function (e) {
            // const newGetAllOptions = getAllOptions.filter((item) => item.option !== tag.textContent)

            const deleteOptionMethod = getAllOptions.findIndex((options, index) => {
                if (options.option === tag.textContent) {
                    indexArrayGetAllOptions = index;
                    console.log(indexArrayGetAllOptions);
                }
            })

            const deleteOptionInArray = getAllOptions.splice(indexArrayGetAllOptions, 1);
            // if (getAllOptions.length > 0) {

                if (tag.id === "tagIngredient") {
                    deleteOptionMethod;
                    deleteOptionInArray;
                    tag.classList.remove("tag-actived");
                    console.log("ingredient")
                    getAllOptions.forEach((options) => {
                        filterViaTag = accumulateFilterRecette2.filter((filterRecette) => {
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
                    })

                    accumulateFilterRecette2 = filterViaTag;
                    // main.innerHTML = "";
                    filterViaTag.map((ele) => {
                        new Recette(ele, main);
                    })
                }
                if (tag.id === "tagAppareil") {
                    deleteOptionMethod;
                    deleteOptionInArray;
                    tag.classList.remove("tag-actived");
                    console.log("appareil")
                    getAllOptions.forEach((options) => {
                        filterViaTag = accumulateFilterRecette2.filter((filterRecette) => {
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
                        accumulateFilterRecette2 = filterViaTag;
                        // main.innerHTML = "";
                        filterViaTag.map((ele) => {
                            new Recette(ele, main);
                        })

                    })
                }
                if (tag.id === "tagUstensile") {
                    deleteOptionMethod;
                    deleteOptionInArray;
                    tag.classList.remove("tag-actived");
                    console.log("ustensile")
                    getAllOptions.forEach((options) => {
                        filterViaTag = accumulateFilterRecette2.filter((filterRecette) => {
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
                        accumulateFilterRecette2 = filterViaTag;
                        // main.innerHTML = "";
                        filterViaTag.map((ele) => {
                            new Recette(ele, main);
                        })

                    })
                }
                if (getAllOptions === []){
                    console.log("personne")
                }
            // } else {
            //     main.innerHTML = "";
            //     console.log("0 personne")
            //     recette.map((ele) => {
            //         new Recette(ele, main);
            //     })
            // }
        })
    }

    deleteOptionInArray(tag) {
        getAllOptions.findIndex((options, index) => {
            if (options.option === tag.textContent) {
                indexArrayGetAllOptions = index;
            }
        })

        getAllOptions.splice(indexArrayGetAllOptions, 1);
    }
}
