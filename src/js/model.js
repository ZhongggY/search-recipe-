import { API_URL, resultPerPage, key } from './config.js';
import { getJson, sentJson } from './helper.js';
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultPages: resultPerPage,
  },
  bookMarks: [],
};
export const loadReceipe = async function (id) {
  try {
    const data = await getJson(`${API_URL}/${id}`);

    const { recipe } = data.data;
    //recipe object includes all objects inside data.data
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publish: recipe.publisher,
      sourseU: recipe.source_url,
      img: recipe.image_url,

      ser: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredient: recipe.ingredients,
    };
    if (state.bookMarks.some(bookm => bookm.id === id)) {
      state.recipe.bookMarked = true;
    } else state.recipe.bookMarked = false;
    console.log(recipe);
  } catch (error) {
    throw error;
  }
};
export const searchResultLoad = async function (query) {
  try {
    state.search.query = query;
    const data = await getJson(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publish: recipe.publisher,
        img: recipe.image_url,
      };
    });
    console.log(state.search.results);
  } catch (error) {
    throw error;
  }
};
export const getSearchResults = function (pages) {
  state.search.page = pages;
  const start = (pages - 1) * state.search.resultPages;
  const end = pages * state.search.resultPages;
  return state.search.results.slice(start, end);
};
export const updateServings = function (servings) {
  state.recipe.ingredient.forEach(ing => {
    ing.quantity = (ing.quantity * servings) / state.recipe.ser;
  });
  state.recipe.ser = servings;
};
export const addBookMark = function (recipe) {
  //add bookmark
  state.bookMarks.push(recipe);
  if (recipe.id === state.recipe.id) state.recipe.bookMarked = true;
  persistBookmarks();
};
export const delBookMark = function (id) {
  //remove bookmark
  const index = state.bookMarks.findIndex(el => el.id === id);
  state.bookMarks.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookMarked = false;
  persistBookmarks();
};
const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookMarks));
};
const restriveData = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookMarks = JSON.parse(storage);
};
restriveData();
export const uploadReceipe = async function (newRecipes) {
  try {
    //handle errors and format of new recipe
    const ingredients = Object.entries(newRecipes)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ingredient => {
        const inArr = ingredient[1].replaceAll(' ', '').split(',');
        if (inArr.length !== 3) {
          throw new Error('please use correct format');
        }
        const [quantity, unit, description] = inArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const diyRecipe = {
      //format must follow the resource,
      title: newRecipes.title,
      source_url: newRecipes.sourceUrl,
      image_url: newRecipes.image,
      publisher: newRecipes.publisher,
      cooking_time: +newRecipes.cookingTime,
      servings: +newRecipes.servings,
      ingredients,
    };
    const data = await sentJson(`${API_URL}?key=${key}`, diyRecipe);
    state.recipe = data.data.recipe;
    addBookMark(state.recipe);
    console.log(data.data.recipe);
  } catch (error) {
    throw error;
  }
};
