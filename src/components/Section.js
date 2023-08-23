export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._cards = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

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