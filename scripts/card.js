import { openPopup } from "./index.js";

const viewPopup = document.querySelector('.popup_type_image-view');
const caption = document.querySelector('.popup__caption');
const imageView = document.querySelector('.popup__image');

export default class Card {
    constructor(data, cardTemplate) {
        this._cardTemplate = cardTemplate;
        this.name = data.name;
        this._link = data.link
    }

    _setEventListeners(){
    }

    create(){
    }

    _getTemplate() {
    }
}