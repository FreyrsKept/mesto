import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }

  open(name, link) {
    const imageTitle = this._popupCard.querySelector(".popup__caption");
    const imageElement = this._popupCard.querySelector(".popup__image");
    imageElement.alt = name;
    imageElement.src = link;
    imageTitle.textContent = name;
    super.open();
  }
}