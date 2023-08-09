export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._cards = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // renderItem() {
  //   this._cards.forEach((card) => {this._renderer(card)});
  // }

  // addItem(element) {
  //   this._container.prepend(element);
  // }

  renderCards() {
    this._clear();
    this._cards.forEach((card) => {
      this.addItem(card);
    });
  }

  addItem(dataItem) {
    this._container.prepend(this._renderer(dataItem));
  }

  _clear() {
    this._container.innerHTML = "";
  }
}