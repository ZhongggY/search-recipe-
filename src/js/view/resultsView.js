import view from './view';
import icon from 'url:../../img/icons.svg';
class resultsView extends view {
  //the spelling must be same as the parent element!
  _parentEle = document.querySelector('.results');
  _errorMes = `we couldn't find the receipt please try again!`;
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }
  _generateMarkupPreview(result) {
    const id = window.location.hash.slice(1);
    return `
      <li class="preview">
      <a class="preview__link ${
        result.id === id ? 'preview__link--active' : ''
      }"  href="#${result.id}">
        <figure class="preview__fig">
          <img src="${result.img}" alt="${result.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${result.title}</h4>
          <p class="preview__publisher">${result.publish}</p>
        </div>
      </a>
    </li>`;
  }
}
export default new resultsView();
