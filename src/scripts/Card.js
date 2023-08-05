export default class Card {
    constructor(data, cardTemplate, handleCardClick) {
        this._handleCardClick = handleCardClick;
        this._cardTemplate = cardTemplate;
        this._name = data.name;
        this._link = data.link;
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

    _getTemplate() {
        return document
            .querySelector(this._cardTemplate)
            .content.querySelector('.cards__element')
            .cloneNode(true);
    }

    _setEventListener() {
        this._buttonLike.addEventListener('click', () => this._toggleLike());
        
        this._buttonDelete.addEventListener('click', () => this._remove());

        this._imageItem.addEventListener('click', () => this._handleImageClick());
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

}