import Search from './models/Search';
import {
    elements,
    renderLoader,
    clearLoader
} from './views/base';
import * as searchView from './views/searchView';
import Recipe from './models/Recipe';

/* Global state of the app
-Search object
-current recipe object
-shopping list object
-liked recipes
*/

const state = {};

/**
 * SEARCH CONTROLLER
 */

const controlSearch = async () => {
    //1 Get query from view
    const query = searchView.getInput(); // get input from the input field
    if (query) {
        //2) New search object and add to state 
        state.search = new Search(query); //will be stored in the state as a new search

        //3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        try {
            ///4 Search for recipes
            await state.search.getResults(); //get results runs and we wait for it to finish before logging to console we used an async method above too

            //5) Render results on the UI
            clearLoader();
            searchView.renderResults(state.search.result); //show result and it will be stored where the data will be saved and displayed using the dom
        } catch (error) {
            alert('Something went wrong with the search...');
            clearLoader();
        }

    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();

});

elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
        //console.log(goToPage);
    }
});

//const search = new Search('burger');

//console.log(search);
/***
 * RECIPE CONTROLLER
 */
//Testing
/*const r = new Recipe(492564);
r.getRecipe();*/
const controlRecipe = async () => {
    //Get ID from url
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
        //Prepare UI for changes


        //Create new recipe object
        state.recipe = new Recipe(id);
        try {
            //Get recipe data
            await state.recipe.getRecipe();

            //Calculate servings and time 
            state.recipe.calcTime();
            state.recipe.calcServings();

            //Render recipe
            console.log(state.recipe);

        } catch (error) {
            alert('Error processing recipe');
        }

    }

};

//window.addEventListener('hashchange', controlRecipe);
//window.addEventListener('load',controlRecipe);
//using the same event listener for different actions
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));