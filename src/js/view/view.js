import icon from 'url:../../img/icons.svg';
export default class view {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.handleError();
    this._data = data;
    //insert into parent element
    const markUp = this._generateMarkup();
    this._clear();
    this._parentEle.insertAdjacentHTML('afterbegin', markUp);
  }
  _clear() {
    this._parentEle.innerHTML = '';
  }
  update(data) {
    this._data = data;
    //insert into parent element
    const newMarkUp = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkUp);
    const newEle = Array.from(newDom.querySelectorAll('*'));
    const curEle = Array.from(this._parentEle.querySelectorAll('*'));
    newEle.forEach((newElement, i) => {
      const curele = curEle[i];
      if (
        !newElement.isEqualNode(curele) &&
        newElement.firstChild?.nodeValue.trim() !== ''
      ) {
        curele.textContent = newElement.textContent;
      }
      if (!newElement.isEqualNode(curele))
        Array.from(newElement.attributes).forEach(attri =>
          curele.setAttribute(attri.name, attri.value)
        );
    });
  }
  obtainSpinner = function () {
    const markUp = `
        <div class="spinner">
        <svg>
          <use href="${icon}#icon-loader"></use>
        </svg>
      </div>
        `;
    this._parentEle.innerHTML = '';
    this._parentEle.insertAdjacentHTML('afterbegin', markUp);
  };

  handleError(message = this._errorMes) {
    const markUp = `
        <div class="error">
        <div>
          <svg>
            <use href="${icon}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._parentEle.innerHTML = '';
    this._parentEle.insertAdjacentHTML('afterbegin', markUp);
  }
  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <div>
          <svg>
            <use href="${icon}#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;
    this._parentEle.innerHTML = '';
    this._parentEle.insertAdjacentHTML('afterbegin', markup);
  }
}
