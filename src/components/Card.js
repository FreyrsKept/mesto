export class Card {
  constructor(cardData, cardTemplate, handleCardClick, handleDeleteClick, handleCardLike, userId) {
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
  }
  // Отрисовка карточек
  create = () => {
    this._card = this._getTemplate();
    this._cardImageItem = this._card.querySelector('.cards__image');
    this._cardTitleItem = this._card.querySelector('.cards__title');
    this._cardLikeItem = this._card.querySelector('.cards__like-button');
    this._cardlikeCounterItem = this._card.querySelector('.cards__like-counter');
    this._cardDeleteItem = this._card.querySelector('.cards__delete');
    this._cardTitleItem.textContent = this._name;
    this._cardImageItem.src = this._link;
    this._cardImageItem.alt = this._name;
    if (this._cardOwnerId !== this._userId) this._cardDeleteItem.classList.toggle('card__like-button_inactive');
    if (this._likes.find((user) => user._id === this._userId)) this.updateCardLikes(this.cardData);
    this.updateCardLikes(this.cardData);
    this._setEventListener();
    return this._card;
  }
  // Темплейт
  _getTemplate() {
    return document
      .querySelector(this._cardTemplate)
      .content.querySelector(".cards__element")
      .cloneNode(true);
  }
  // ID карточек
  getCardId() {
    return this._cardId;
  }
  // Удаление карточек
  deleteCard() {
    this._card.remove();
    this._card = null;
  }
  // Лайк
  _handleCardLikeButton() {
    if (this.cardData.likes.find((user) => user._id === this._userId)) {
      this._cardLikeItem.classList.add('cards__like-button_active');
    } else {
      this._cardLikeItem.classList.remove('cards__like-button_active');
    }
  }
  // Открытие карточки
  _handleImageClick() {
    this._handleCardClick(this._name, this._link);
  }
  // Счетчик лайков
  updateCardLikes(cardData) {
    this.cardData = cardData;
    this._cardlikeCounterItem.textContent = cardData.likes.length;
    this._handleCardLikeButton(cardData);
  }
  // Слушатели
  _setEventListener = () => {
    this._cardImageItem.addEventListener('click', () => {
      this._handleImageClick(this._name, this._link);
    });

    this._cardLikeItem.addEventListener('click', () => {
      this._handleCardLike(this);
    });

    this._cardDeleteItem.addEventListener('click', () => {
      this._handleDeleteClick(this);
    });
  }
}