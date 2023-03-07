import view from './view';
import icon from 'url:../../img/icons.svg';
class bookMarkView extends view {
  //the spelling must be same as the parent element!
  _parentEle = document.querySelector('.bookmarks__list');
  _errorMes = `No bookmarks found yet`;
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
  addHandler(handler) {
    window.addEventListener('load', handler);
  }
}
export default new bookMarkView();
