import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageTitle = this._popup.querySelector(".popup__caption");
    this._imageElement = this._popup.querySelector(".popup__image");
  }

  open(name, link) {
    this._imageElement.alt = name;
    this._imageElement.src = link;
    this._imageTitle.textContent = name;
    super.open();
  }
}