export class Card {
    constructor(cardData, cardTemplate, handleCardClick, handleDeleteClick, handleCardLike, { userId }) {
        this.cardData = cardData;
        this._handleCardClick = handleCardClick;
        this._handleDeleteClick = handleDeleteClick;
        this._handleCardLike = handleCardLike;
        this._cardTemplate = cardTemplate;
        this._name = this.cardData.name;
        this._link = this.cardData.link;
        this._cardId = this.cardData._id;
        this._userId = userId;
        this._likes = this.cardData.likes;
        this._cardOwnerId = this.cardData.owner._id;
        this._item = this._getTemplate();
        this._cardImageItem = this._item.querySelector('.cards__image');
        this._cardTitleItem = this._item.querySelector('.cards__title');
        this._cardLikeItem = this._item.querySelector('.cards__like-button');
        this._cardlikeCounterItem = this._item.querySelector('.cards__like-counter');
        this._cardDeleteItem = this._item.querySelector('.cards__delete');
    }
// Отрисовка картоыек
    create() {
        this._cardTitleItem.textContent = this._name;
        this._imageItem.src = this._link;
        this._imageItem.alt = this._name;
        this._cardlikeCounterItem.textContent = this._likes.lenght;
        if (this._cardOwnerId !== this._userId) this._cardDeleteItem.classList.toggle('card__btn-del_inactive');
        if (this._likes.find((user) => user._id === this._userId)) this._handleCardLikeButton();
        this._setEventListener();
        return this._item;
    }
// Темплейт
    _getTemplate() {
        const cardElement = document.querySelector(this._cardTemplate).content.querySelector('.cards__element').cloneNode(true);
        return cardElement;
    }
// Слушатели
    _setEventListener() {
        this._cardImageItem.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        });

        this._buttonLike.addEventListener('click', () => {
            this._handleCardLike(this)
        });

        this._buttonDelete.addEventListener('click', () => {
            this._handleDeleteClick(this)
        });
    }
// ID карточек
    getCardId() {
        return this._cardId;
    }
// Удаление карточек
    deleteCard() {
        this._item.remove();
        this._item = null;
    }
// Лайк
    _handleCardLike() {
        this._buttonLike.classList.toggle('cards__like-button_active')
    }
// Счетчик лайков
    cardLikeCounter(data) {
        this.data = data;
        this._cardlikeCounterItem.textContent = data.likes.lenght;
        this._handleCardLike();
    }
}