//we can import all icons from this directory.
import * as model from './model.js';

import receiptView from './view/receiptView.js';
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import bookMarkView from './view/bookMarkView.js';
import paginationView from './view/paginationView.js';
import addrecipe from './view/addrecipe.js';
const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const showReceipts = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    receiptView.obtainSpinner();
    //0 update to mark the result
    resultsView.update(model.getSearchResults());
    //load rece loadreceipe is a asyn function so when deal with async function always add await!
    await model.loadReceipe(id);
    const { recipe } = model.state;
    //render data
    receiptView.render(model.state.recipe);

    //bookmark
    bookMarkView.update(model.state.bookMarks);
  } catch (error) {
    console.log(`${error} time is out! `);
    receiptView.handleError(error);
  }
};
const controlSearchResult = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    await model.searchResultLoad(query);
    resultsView.render(model.getSearchResults(1));
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};
const controlPagination = function (goPage) {
  console.log(goPage);
  resultsView.render(model.getSearchResults(Number(goPage)));
  paginationView.render(model.state.search);
};
const controlServings = function (newSer) {
  model.updateServings(newSer);
  receiptView.update(model.state.recipe);
};
const controladdBookMark = function () {
  if (!model.state.recipe.bookMarked) model.addBookMark(model.state.recipe);
  else model.delBookMark(model.state.recipe.id);

  receiptView.update(model.state.recipe);
  //render bookmarks
  bookMarkView.render(model.state.bookMarks);
};
const controlBookmark = function () {
  bookMarkView.render(model.state.bookMarks);
};
const controlAddrecipe = async function (newRec) {
  try {
    addrecipe.obtainSpinner();

    await model.uploadReceipe(newRec);
    addrecipe.renderMessage();
    bookMarkView.render(model.state.bookMarks);

    //change url id
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
  } catch (error) {
    addrecipe.handleError(error);
  }
};

const iniy = function () {
  bookMarkView.addHandler(controlBookmark);
  receiptView.renderHandler(showReceipts);
  receiptView.updateServingsHandler(controlServings);
  receiptView.addbookMarkHandler(controladdBookMark);
  searchView.addhandler(controlSearchResult);
  paginationView.clickHandler(controlPagination);
  addrecipe.uploadHandler(controlAddrecipe);
  console.log('new branches');
};
iniy();
