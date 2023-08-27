export class Section {
  constructor({ renderer }, containerSelector) {
    // this._cards = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
// Сломано
  renderCards(items) {
    this._clear();
    items.forEach((card) => {this.addItem(card);
    });
  }

  addItem(items) {
    const card = this._renderer(items);
    this._container.prepend(card);
  }

  _clear() {
    this._container.innerHTML = "";
  }
}