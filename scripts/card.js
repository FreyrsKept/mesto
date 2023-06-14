import { openPopup } from "./index.js";

const viewPopup = document.querySelector('.popup_type_image-view');
const caption = document.querySelector('.popup__caption');
const imageView = document.querySelector('.popup__image');

export default class Card {
    constructor(card, cardTemplate) {
        this._cardTemplate = cardTemplate;
        this.name = card.name;
        this._link = card.link;
    }

    _getTemplate() {
        return document
            .querySelector(this._cardTemplate)
            .content.querySelector('.cards__element')
            .cloneNode(true);
    }

    _setEventListeners() {
        this.cardItem
            .querySelector('.cards__like-button')
            .addEventListener('click', (e) =>
              e.target.classList.toggle('cards__like-button_active'));

        this.cardItem
            .querySelector('.cards__delete')
            .addEventListener('click', (e) =>
              e.target.closest('.cards__element').remove());

        this._imageItem.addEventListener('click', () => {
            openPopup(viewPopup)
            imageView.setAttribute('src', this._link);
            imageView.setAttribute('alt', this._name);
            caption.textContent = this._name;
        });
    }

    create() {
        this._cardItem = this._getTemplate();
        this._imageItem = this._cardItem.querySelector('.cards__image');
        this._cardItem.querySelector('.cards__title').textContent = this._name;
        this._imageItem.setAttribute('src', this._link);
        this._imageItem.setAttribute('alt', this._name);
        this._setEventListener();
        return this._cardItem;
    }

}