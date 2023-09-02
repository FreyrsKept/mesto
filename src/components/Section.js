export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._cards = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderCards(items) {
    this._clear();
    items.forEach((card) => {
       this.addItem(card);
      });
  };

  addItem(elementNode) {
    this._container.prepend(this._renderer(elementNode));
  }

  _clear() {
    this._container.innerHTML = "";
  }
}