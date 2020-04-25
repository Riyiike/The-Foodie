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

/* Global state of the app
-Search object
-current recipe object
-shopping list object
-liked recipes
*/

const state = {};

const controlSearch = async () => {
    //Get query from view
    const query = 'burger' // TOOO

    if (query) {
        //2) New search object and add to state 
        state.search = new Search(query);

        //3) Prepare UI for results

        ///4 Search for recipes
        await state.search.getResults(); //get results runs and we wait for it to finish before logging to console

        //5) Render results on the UI
        console.log(state.search.result) //where the data will be saved
    }
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();

});

//const search = new Search('burger');

//console.log(search);