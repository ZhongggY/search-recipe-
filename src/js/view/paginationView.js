import view from './view';
import icon from 'url:../../img/icons.svg';
class paginationView extends view {
  _parentEle = document.querySelector('.pagination');
  clickHandler(handler) {
    this._parentEle.addEventListener('click', function (event) {
      const button = event.target.closest('.btn--inline');
      if (!button) return;
      const goToPage = +button.dataset.goto;
      console.log(button);
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const currentPgs = this._data.page;
    const pageNmuber = Math.ceil(
      this._data.results.length / this._data.resultPages
    );
    console.log(pageNmuber);
    //page1
    if (currentPgs === 1 && pageNmuber > 1) {
      return `
      <button data-goto="${
        currentPgs + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${currentPgs + 1}</span>
      <svg class="search__icon">
        <use href="${icon}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }
    //last pgs
    if (currentPgs === pageNmuber && pageNmuber > 1) {
      return `
      <button data-goto="${
        currentPgs - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icon}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentPgs - 1}</span>
    </button>`;
    }
    if (currentPgs < pageNmuber) {
      return `
      <button data-goto="${
        currentPgs - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icon}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentPgs - 1}</span>
    </button>
      <button data-goto="${
        currentPgs + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${currentPgs + 1}</span>
      <svg class="search__icon">
        <use href="${icon}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }
    return '';
  }
}
export default new paginationView();
