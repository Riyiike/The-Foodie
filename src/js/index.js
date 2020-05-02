//first method of the API call before exporting to search.js as a method
/*import axios from 'axios';

async function getResults(query) {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const key = '877c0683ee3d476fa05e6c3a2a8e5c5e';
    try {
        // const res = await axios(`${proxy}https://api.spoonacular.com/recipes/search?query=cheese&apiKey=${key}`);
        const res = await axios(`${proxy}https://api.spoonacular.com/recipes/search?query=${query}&apiKey=${key}`);
        const recipes = res.data.results;
        console.log(recipes);
    } catch (error) {
        alert(error);
    }
}
getResults('burger');*/

import Search from './models/Search';
import {
    elements,
    renderLoader,
    clearLoader
} from './views/base';
import * as searchView from './views/searchView';

/* Global state of the app
-Search object
-current recipe object
-shopping list object
-liked recipes
*/

const state = {};

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

        ///4 Search for recipes
        await state.search.getResults(); //get results runs and we wait for it to finish before logging to console we used an async method above too

        //5) Render results on the UI
        clearLoader();
        searchView.renderResults(state.search.result); //show result and it will be stored where the data will be saved and displayed using the dom
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