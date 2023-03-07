import view from './view';
import icon from 'url:../../img/icons.svg';
class addreceipeV extends view {
  _parentEle = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _buttonopen = document.querySelector('.nav__btn--add-recipe');
  _buttonclose = document.querySelector('.btn--close-modal');
  _message = 'Congraduation! Your receipe has been added successfully :)';
  constructor() {
    //we can use this key word after super
    super();
    this._addHandler();
    this._HideWindow();
  }
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  _addHandler() {
    this._buttonopen.addEventListener('click', this.toggleWindow.bind(this));
  }
  _HideWindow() {
    this._buttonclose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
  uploadHandler(handler) {
    this._parentEle.addEventListener('submit', function (event) {
      event.preventDefault();
      const dataArray = [...new FormData(this)];
      const data = Object.fromEntries(dataArray);
      console.log(data);
      handler(data);
    });
  }
  _generateMarkup() {}
}
export default new addreceipeV();
