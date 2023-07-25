export default class Section {
    constructor({ items, renderer }, containerSelector) {
      this._cards = items;
      this._renderer = renderer;
      this._container = document.querySelector(containerSelector);
    }
  
    addItem(item) {
      this._container.prepend(this._renderer(item));
    }
  
    renderCards() {
      this._clear();
      this._cards.forEach((card) => {
        this.addItem(card);
      });
    }
  
    _clear() {
      this._container.innerHTML = "";
    }
  }