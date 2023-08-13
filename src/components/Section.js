export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._cards = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // renderCards() {
  //   this._cards.forEach((item) => {this._renderer(item)});
  // }

  // addItem(element) {
  //   this._container.prepend(element);
  // }

  renderCards() {
    this._clear();
    this._cards.forEach((card) => {
      this._renderer(card);
    });
  }

  addItem(elementNode) {
    this._container.prepend(elementNode);
  }

  _clear() {
    this._container.innerHTML = "";
  }
}