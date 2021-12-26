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

btnIngredient.addEventListener("click", function (e) {
    searchSecondary.checkBtnActived(btnIngredient,resultIngredient,searchIngredient, resultRes[0][1].sort(), tagIngredient);
})

btnAppareil.addEventListener("click", function (e) {
    searchSecondary.checkBtnActived(btnAppareil,resultAppareil,searchAppareil, resultRes[1][1].sort(), tagAppareil);
})

btnUstensile.addEventListener("click", function (e) {
    searchSecondary.checkBtnActived(btnUstensile,resultUstensile,searchUstensile, resultRes[2][1].sort(), tagUstensile);
})



// function autocomplete(inp, arr, tag) {
//     /*the autocomplete function takes two arguments,
//     the text field element and an array of possible autocompleted values:*/
//     var currentFocus;
//     /*execute a function when someone writes in the text field:*/
//     inp.addEventListener("input", function (e) {
//         var a, b, i, val = this.value;
//         /*close any already open lists of autocompleted values*/
//         closeAllLists();
//         if (!val) {
//             return false;
//         }
//         currentFocus = -1;
//         /*create a DIV element that will contain the items (values):*/
//         a = document.createElement("div");
//         a.setAttribute("id", this.id + "autocomplete-list");
//         a.setAttribute("class", "autocomplete-items");
//         /*append the DIV element as a child of the autocomplete container:*/
//         this.parentNode.appendChild(a);
//
//         /* create ul contain items */
//         var ulItem = document.createElement("ul");
//         a.appendChild(ulItem);
//
//
//         /*start the research after 3 letters */
//         // if (val.length > 2) {
//
//
//         /*for each item in the array...*/
//         for (i = 0; i < arr.length; i++) {
//
//             /*check if the item starts with the same letters as the text field value:*/
//             if (arr[i].substr(0, val.length).toUpperCase() === val.toUpperCase() || arr[i].toLowerCase().includes(val.toLowerCase())) {
//                 /*create a DIV element for each matching element:*/
//                 b = document.createElement("li");
//                 /*make the matching letters bold:*/
//                 b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
//                 b.innerHTML += arr[i].substr(val.length);
//                 /*insert a input field that will hold the current array item's value:*/
//                 b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
//                 /*execute a function when someone clicks on the item value (DIV element):*/
//                 b.addEventListener("click", function (e) {
//                     /*insert the value for the autocomplete text field:*/
//                     inp.value = this.getElementsByTagName("input")[0].value;
//                     tag.textContent = this.getElementsByTagName("input")[0].value;
//                     tag.style.display = "flex";
//                     /*close the list of autocompleted values,
//                     (or any other open lists of autocompleted values:*/
//                     closeAllLists();
//                 });
//                 tagClose(tag, inp);
//                 ulItem.appendChild(b);
//             }
//         }
//         // }
//     });
//     /*execute a function presses a key on the keyboard:*/
//     inp.addEventListener("keydown", function (e) {
//         var x = document.getElementById(this.id + "autocomplete-list");
//         if (x) x = x.getElementsByTagName("li");
//         if (e.keyCode === 40) {
//             /*If the arrow DOWN key is pressed,
//             increase the currentFocus variable:*/
//             currentFocus++;
//             /*and and make the current item more visible:*/
//             addActive(x);
//         } else if (e.keyCode === 38) { //up
//             /*If the arrow UP key is pressed,
//             decrease the currentFocus variable:*/
//             currentFocus--;
//             /*and and make the current item more visible:*/
//             addActive(x);
//         } else if (e.keyCode === 13) {
//             /*If the ENTER key is pressed, prevent the form from being submitted,*/
//             e.preventDefault();
//             if (currentFocus > -1) {
//                 /*and simulate a click on the "active" item:*/
//                 if (x) x[currentFocus].click();
//             }
//         }
//     });
//
//     function addActive(x) {
//         /*a function to classify an item as "active":*/
//         if (!x) return false;
//         /*start by removing the "active" class on all items:*/
//         removeActive(x);
//         if (currentFocus >= x.length) currentFocus = 0;
//         if (currentFocus < 0) currentFocus = (x.length - 1);
//         /*add class "autocomplete-active":*/
//         x[currentFocus].classList.add("autocomplete-active");
//     }
//
//     function removeActive(x) {
//         /*a function to remove the "active" class from all autocomplete items:*/
//         for (var i = 0; i < x.length; i++) {
//             x[i].classList.remove("autocomplete-active");
//         }
//     }
//
//     function closeAllLists(elmnt) {
//         /*close all autocomplete lists in the document,
//         except the one passed as an argument:*/
//         var x = document.getElementsByClassName("autocomplete-items");
//         for (var i = 0; i < x.length; i++) {
//             if (elmnt !== x[i] && elmnt !== inp) {
//                 x[i].parentNode.removeChild(x[i]);
//             }
//         }
//     }
//
//     function tagClose(tag, inp) {
//         tag.addEventListener("click", function (e) {
//             tag.textContent = "";
//             tag.style.display = "none";
//             inp.value = "";
//         })
//     }
//
//     /*execute a function when someone clicks in the document:*/
//     document.addEventListener("click", function (e) {
//         closeAllLists(e.target);
//     });
// }

/*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
// autocomplete(document.getElementById("searchIngredient"), resultRes[0][1].sort(), document.getElementById("tagIngredient"));
// autocomplete(document.getElementById("searchAppareil"), resultRes[1][1].sort(), document.getElementById("tagAppareil"));
// autocomplete(document.getElementById("searchUstensile"), resultRes[2][1].sort(), document.getElementById("tagUstensil"));
// let getAllOptions = [];
// new SearchSecondary().clickBtn(btnIngredient, searchIngredient,resultRes[0][1].sort(), resultIngredient, tagIngredient, closeIngredientsFilter, main);
// new SearchSecondary().clickBtn(btnAppareil, searchAppareil, resultRes[1][1].sort(), resultAppareil, tagAppareil, closeAppareilsFilter, main);
// new SearchSecondary().clickBtn(btnUstensile, searchUstensile, resultRes[2][1].sort(), resultUstensile, tagUstensile, closeUstensilesFilter, main);
// const clickType = (btn, inp, arr, divResult, tag, closeFilter) => {
//
//     btn.addEventListener("click", function (e) {
//         if (btnIngredient.classList.contains("btn-actived")) {
//             btnIngredient.classList.toggle("btn-actived");
//             resultIngredient.classList.toggle("divResult-actived");
//             searchIngredient.classList.toggle("searchInput-actived");
//         }
//         if (btnAppareil.classList.contains("btn-actived")) {
//             btnAppareil.classList.toggle("btn-actived");
//             resultAppareil.classList.toggle("divResult-actived");
//             searchAppareil.classList.toggle("searchInput-actived");
//         }
//         if (btnUstensile.classList.contains("btn-actived")) {
//             btnUstensile.classList.toggle("btn-actived");
//             resultUstensile.classList.toggle("divResult-actived");
//             searchUstensile.classList.toggle("searchInput-actived");
//         }
//         btn.classList.toggle("btn-actived");
//         divResult.classList.toggle("divResult-actived");
//         inp.classList.toggle("searchInput-actived");
//         const divList = document.createElement("div");
//         divList.classList.add("active-input-div");
//         const ulList = document.createElement("ul");
//         ulList.classList.add("ulList");
//         divResult.appendChild(divList);
//         divList.appendChild(ulList);
//
//         arr.map((type) => {
//             const liList = document.createElement("li");
//             liList.classList.add("liList");
//             liList.textContent = type;
//             ulList.appendChild(liList);
//             // console.log(type);
//
//             liList.addEventListener("click", function (e) {
//                 /*insert the value for the autocomplete text field:*/
//                 divResult.removeChild(divList);
//                 main.innerHTML = "";
//                 inp.value = "";
//                 inp.value = e.target.textContent;
//                 tag.textContent = e.target.textContent;
//                 tag.classList.add("tag-actived");
//                 btn.classList.toggle("btn-actived");
//                 divResult.classList.toggle("divResult-actived");
//                 inp.classList.toggle("searchInput-actived");
//
//                 tagClose(tag, inp, btn);
//
//                 if (inp.id === "searchIngredient") {
//                     getAllOptions.push(inp.value);
//                     // searchIngredients(inp);
//                 }
//                 if (inp.id === "searchAppareil") {
//                     getAllOptions.push(inp.value);
//                     // searchAppareils(inp);
//                 }
//                 if (inp.id === "searchUstensile") {
//                     getAllOptions.push(inp.value);
//                     // searchUstensiles(inp);
//                 }
//                 console.log(getAllOptions);
//
//                 let resultAllDatas = Object.entries(getAllOptions).map(([id, set]) => [id, [...set]]);
//
//                 let showResult = [];
//                 resultAllDatas[0][1].filter((resultSearch) => {
//                     recette.filter((type) => {
//                         if (type.name.toLowerCase().includes(resultSearch.toLowerCase())) {
//                             showResult.push(type.name);
//                         }
//                         type.ingredients.filter((ingredients) => {
//                             if (ingredients.ingredient.toLowerCase().includes(resultSearch.toLowerCase())) {
//                                 showResult.push(type.name);
//                             }
//                         })
//                         if (type.appliance.toLowerCase().includes(resultSearch.toLowerCase())) {
//                             showResult.push(type.name);
//                         }
//                         type.ustensils.filter((ustensil) => {
//                             if (ustensil.includes(resultSearch.toLowerCase())) {
//                                 showResult.push(type.name);
//                             }
//                         })
//                     })
//                 })
//
//                 console.log(showResult);
//
//                 let arrayNoSort = [...new Set(showResult)];
//                 let arraySort = arrayNoSort.sort();
//                 console.log(arraySort)
//
//                 arraySort.map((name) => {
//                     recette
//                         .filter((type) => {
//                             if (type.name === name) {
//                                 new Recette(type, main);
//                             }
//                         })
//                 })
//
//                 // let arrayNoSort = [...new Set(showResult)];
//                 // // let arraySort = arrayNoSort.sort();
//                 // console.log(arrayNoSort);
//                 // let arrayNoSort = [];
//                 // showResult.map((name) => {
//                 //     recette
//                 //         .filter((type) => {
//                 //             // if (type.name === name) {
//                 //             //     new Recette(type, main);
//                 //             // }
//                 //             type.ingredients.map((ingredients) => {
//                 //                 if (ingredients.ingredient === name) {
//                 //                     arrayNoSort.push(type.name);
//                 //                     // new Recette(type, main);
//                 //                 }
//                 //             })
//                 //
//                 //             if (type.appliance === name) {
//                 //                 arrayNoSort.push(type.name);
//                 //                 if (arrayNoSort.length < 1){
//                 //
//                 //                 }
//                 //                 // new Recette(type, main);
//                 //             }
//                 //
//                 //             type.ustensils.map((ustensil) => {
//                 //                 if (ustensil === name) {
//                 //                     arrayNoSort.push(type.name);
//                 //                     // new Recette(type, main);
//                 //                 }
//                 //             })
//                 //         })
//                 // })
//                 //
//                 // console.log(arrayNoSort);
//                 // console.log(arrayNoSort.filter((item, index) => arrayNoSort.indexOf(item) !== index));
//
//
//             })
//         })
//
//     })
//
//     closeFilter.addEventListener("click", (e) => {
//         closeSearch(closeFilter, btn, divResult);
//     })
//
// }
// const searchIngredients = (inp) => {
//     recette.filter((type) => {
//         type.ingredients.map((ingredients) => {
//             if (ingredients.ingredient.includes(inp.value)) {
//                 new Recette(type, main);
//             }
//         })
//     })
// }
// const searchAppareils = (inp) => {
//     recette.filter((type) => {
//         if (type.appliance.includes(inp.value)) {
//             new Recette(type, main);
//         }
//     })
// }
// const searchUstensiles = (inp) => {
//     recette.filter((type) => {
//         type.ustensils.map((ustensil) => {
//             if (ustensil.includes(inp.value)) {
//                 new Recette(type, main);
//             }
//         })
//     })
// }

const closeSearch = (closeFilter, btn, divResult) => {
    btn.classList.toggle("btn-actived");
    divResult.classList.toggle("divResult-actived");
}
const tagClose = (tag, inp) => {
    tag.addEventListener("click", function (e) {
        if (tag.id === "tagIngredient") {
            showResult.splice(showResult.indexOf(e.target.textContent), 1);
            // searchIngredients(inp);
        }
        if (tag.id === "tagAppareil") {
            showResult.splice(showResult.indexOf(e.target.textContent), 1);
            // searchAppareils(inp);
        }
        if (tag.id === "tagUstensile") {
            showResult.splice(showResult.indexOf(e.target.textContent), 1);
            // searchUstensiles(inp);
        }
        console.log(showResult);
        tag.textContent = "";
        tag.classList.remove("tag-actived");
        inp.value = "";

        main.innerHTML = "";
        recette.map((ele) => {
            new Recette(ele, main);
        })
    })
}

// clickType(btnIngredient, searchIngredient, resultRes[0][1].sort(), resultIngredient, tagIngredient, closeIngredientsFilter);
// clickType(btnAppareil, searchAppareil, resultRes[1][1].sort(), resultAppareil, tagAppareil, closeAppareilsFilter);
// clickType(btnUstensile, searchUstensile, resultRes[2][1].sort(), resultUstensile, tagUstensile, closeUstensilesFilter);