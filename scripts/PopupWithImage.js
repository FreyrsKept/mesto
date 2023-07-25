import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._imageTitle = this._popupCard.querySelector(".popup__caption");
    this._imageView = this._popupCard.querySelector(".popup__image");
  }

  open(name, link) {
    this._imageView.setAttribute("alt", name);
    this._imageView.setAttribute("src", link);
    this._imageTitle.textContent = name;
    super.open();
  }
}