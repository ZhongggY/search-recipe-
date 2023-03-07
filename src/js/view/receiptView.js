import view from './view';
import icon from 'url:../../img/icons.svg';
class recipeView extends view {
  _parentEle = document.querySelector('.recipe');

  _errorMes = `we couldn't find the receipt please try again!`;

  renderHandler(handler) {
    //handler for the load receipe.
    window.addEventListener('hashchange', handler);
    window.addEventListener('load', handler);
  }
  updateServingsHandler(handler) {
    this._parentEle.addEventListener('click', function (event) {
      const button = event.target.closest('.btn--update-servings');
      if (!button) return;
      const updateSer = +button.dataset.updateTo;

      if (updateSer > 0) handler(updateSer);
    });
  }
  addbookMarkHandler(handler) {
    this._parentEle.addEventListener('click', function (event) {
      const button = event.target.closest('.btn--bookmark');
      if (!button) return;
      handler();
    });
  }
  _generateMarkup() {
    return `<figure class="recipe__fig">
    <img src="${this._data.img}" alt="${
      this._data.title
    }" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this._data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
      
        <use href="${icon}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this._data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icon}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this._data.ser
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--update-servings" data-update-to="${
          this._data.ser - 1
        }">
          <svg>
            <use href="${icon}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--update-servings" data-update-to="${
          this._data.ser
        }">
          <svg>
            <use href="${icon}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>

    <div class="recipe__user-generated">
      <svg>
        <use href="${icon}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round btn--bookmark ">
      <svg class="">
        <use href="${icon}#icon-bookmark${
      this._data.bookMarked ? '-fill' : ''
    }"></use>
      </svg>
    </button>
  </div>

  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
    ${this._data.ingredient?.map(this._generateIngredient).join('')}
     
  </div>

  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        this._data.publish
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${this._data.sourseU}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icon}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
  }
  _generateIngredient(eachIngredient) {
    return `
      <li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icon}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${
        eachIngredient.quantity ? eachIngredient.quantity : ''
      }</div>
      <div class="recipe__description">
        <span class="recipe__unit">${eachIngredient.unit}</span>
        ${eachIngredient.description}
      </div>
    </li>
      `;
  }
}
export default new recipeView();
