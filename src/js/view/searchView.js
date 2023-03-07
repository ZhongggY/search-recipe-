class searchV {
  _parentEle = document.querySelector('.search');
  getQuery() {
    //get value from the search bar
    const query = this._parentEle.querySelector('.search__field').value;
    this._clearVire();
    return query;
  }
  _clearVire() {
    this._parentEle.querySelector('.search__field').value = '';
  }
  addhandler(handler) {
    this._parentEle.addEventListener('submit', function (event) {
      event.preventDefault();
      handler();
    });
  }
}
export default new searchV();
