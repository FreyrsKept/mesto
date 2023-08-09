import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageTitle = this._popup.querySelector(".popup__caption");
    this._imageElement = this._popup.querySelector(".popup__image");
  }

  open(name, link) {
    this._imageElement.setAttribute("alt", name);
    this._imageElement.setAttribute("src", link);
    this._imageTitle.textContent = name;
    super.open();
  }
}