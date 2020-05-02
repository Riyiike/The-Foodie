import {
    elements
} from './base';

export const getInput = () => elements.searchInput.value; //value of the text in the search field
export const clearInput = () => {
    elements.searchInput.value = '';
}; //clear the input text after clicking on search

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

//limiting the title of the recipe

/*PASTA WITH TOMATO SPINACH
acc:0 /acc + cur.length = 5/ newTitle =[Pasta]
acc:5 /acc + cur.length = 9/ newTitle =[Pasta, with]
acc:9 /acc + cur.length = 15/ newTitle =[Pasta, with,tomato]
acc:15 /acc + cur.length = 18/ newTitle =[Pasta with, tomato]

*/
const limitTitle = (label, limit = 17) => {
    const newTitle = [];
    if (label.length > limit) {
        label.split('').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        //return the result
        return `${newTitle.join(' ')}...`;
    }
    return label;
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
               
                <h4 class="results__name">${limitTitle(hit.recipe.label)}</h4>
               
                <p class="likes__author">${hit.recipe.source}</p>
            </div>
        </a>
     </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);

};

//type of button 'prev' or 'next'
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type ==='prev' ? page - 1 : page + 1 }>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
        <span>Page ${type ==='prev' ? page - 1 : page + 1 }</span>
    </button>

`;

//loop through all the hits (renderResults)then (add a function for) each individual recipe (renderRecipe)

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if (page === 1 && pages > 1) {
        //only button to go to next page
        button = createButton(page, 'next');
    } else if (page < pages) {
        //both buttons
        button = `${createButton(page, 'prev')} ${createButton(page, 'next')}`;
    } else if (page === pages && pages > 1) {
        //only button to go to prev page
        button = createButton(page, 'prev');
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

//export const renderResults = results => {
export const renderResults = (hits, page = 1, resPerPage = 10) => {
    //results.forEach(renderRecipe)
    //render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    hits.slice(start, end).forEach(renderRecipe);
    //render pagination buttons
    renderButtons(page, hits.length, resPerPage);

};