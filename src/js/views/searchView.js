import {
    elements
} from './base';

export const getInput = () => elements.searchInput.value; //value of the text in the search field
export const clearInput = () => {
    elements.searchInput.value = '';
}; //clear the input text after clicking on search

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
};

//const renderRecipe = result => {
const renderRecipe = hit => {
    const markup = `
       <li>
        <a class="results__link results__link--active" href="#${hit.recipe.uri}">
            <figure class="results__fig">
               
                <img src="${hit.recipe.image}" alt="Test">
            </figure>
            <div class="results__data">
               
                <h4 class="results__name">${hit.recipe.label}</h4>
               
                <p class="likes__author">${hit.recipe.source}</p>
            </div>
        </a>
     </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup)


    /* const markup = `
        <li>
            <a class="results__link results__link--active" href="#${result.id}">
                <figure class="results__fig">
                
                <img src="http://spoonacular.com/recipeImages/${result.id}-240x150.jpg" alt="Test">
                </figure>
                <div class="results__data">
                
                    <h4 class="results__name">${result.title}</h4>
                
                    <p class="likes__author">Today's meal</p>
                </div>
            </a>
    </li>
    `;*/


}

//loop through all the recipes (renderResults)then (add a function for) each individual recipe (renderRecipe)

//export const renderResults = results => {
export const renderResults = hits => {
    //results.forEach(renderRecipe)
    hits.forEach(renderRecipe)
};