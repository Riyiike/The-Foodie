//first method of the API call before exporting to search.js as a method
import axios from 'axios';

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
getResults('burger');

/*import Search from './models/Search';

const search = new Search('burger');

console.log(search);

search.getResults();*/