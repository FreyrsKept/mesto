// import { openPopup } from "./index.js";
// import viewPopup from "./index.js"

const caption = document.querySelector('.popup__caption');
const imageView = document.querySelector('.popup__image');

export default class Card {
    constructor(card, cardTemplate, handleCardClick) {
        this._handleCardClick = handleCardClick;
        this._cardTemplate = cardTemplate;
        this._name = card.name;
        this._link = card.link;
    }

    _getTemplate() {
        return document
            .querySelector(this._cardTemplate)
            .content.querySelector('.cards__element')
            .cloneNode(true);
    }

    _setEventListener() {
        this._buttonLike.addEventListener('click', () => this._toggleLike())
        
        this._buttonDelete.addEventListener('click', () => this._remove());

        this._imageItem.addEventListener('click', () => {
            openPopup(viewPopup)
            imageView.setAttribute('src', this._link);
            imageView.setAttribute('alt', this._name);
            caption.textContent = this._name;
        });
    }

    _handleImageClick() {
        this._handleCardClick(this._name, this._link); 
    }

    _remove() {
        this._cardItem.remove();
        this._cardItem = null;
    }

    _toggleLike() {
        this._buttonLike.classList.toggle('cards__like-button_active')
    }

    create() {
        this._cardItem = this._getTemplate();
        this._imageItem = this._cardItem.querySelector('.cards__image');
        this._buttonLike = this._cardItem.querySelector('.cards__like-button');
        this._buttonDelete = this._cardItem.querySelector('.cards__delete');
        this._cardItem.querySelector('.cards__title').textContent = this._name;
        this._imageItem.setAttribute('src', this._link);
        this._imageItem.setAttribute('alt', this._name);
        this._setEventListener();
        return this._cardItem;
    }

}