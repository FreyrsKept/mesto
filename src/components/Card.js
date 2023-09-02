// CLASS INSTANCE IMPORT
import { api } from '../components/Api.js';
import {
  userInfo,
  popupImage,
  popupDeleteCard
} from '../pages/index.js';

export class Card {
  constructor(card, cardTemplate, handleCardClick, handleDeleteClick, handleCardLike, { userId }) {
    // this.card = card;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleCardLike = handleCardLike;
    this._cardTemplate = cardTemplate;
    this._name = card.name;
    this._link = card.link;
    this._cardId = card._id;
    this._userId = userId;
    this._likes = card.likes;
    this._cardOwnerId = card.owner._id;
    console.log(this._cardTemplate);
    // this._card = this._getTemplate();
    // this._cardImageItem = this._card.querySelector('.cards__image');
    // this._cardTitleItem = this._card.querySelector('.cards__title');
    // this._cardLikeItem = this._card.querySelector('.cards__like-button');
    // this._cardlikeCounterItem = this._card.querySelector('.cards__like-counter');
    // this._cardDeleteItem = this._card.querySelector('.cards__delete');
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
    this._imageItem.src = this._link;
    this._imageItem.alt = this._name;
    this._cardlikeCounterItem.textContent = this._likes.lenght;
    if (this._cardOwnerId !== this._userId) this._cardDeleteItem.classList.toggle('card__btn-del_inactive');
    if (this._likes.find((user) => user._id === this._userId)) this._handleCardLikeButton();
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
    this._card.remove();
    this._card = null;
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
// HANDLE CARD DELETE
export const handleDeleteClick = (card) => {
  popupDeleteCard.open();
  popupDeleteCard.handleFormSubmit(() => {
    popupDeleteCard.renderLoading(true);
    api.deleteCard(card.getCardId())
      .then(() => {
        card.deleteCard();
      })
      .then(() => popupDeleteCard.close())
      .catch((err) => {
        console.log(err);
      })
      .finally(() => popupDeleteCard.renderLoading(false))
  })
}

// HANDLE CARD LIKE
export const handleCardLike = (card) => {
  if (card.card.likes.find((user) => user._id === userInfo.getUserId())) {
    api.deleteCardLike(card.getCardId())
      .then((card) => {
        card.handleCardLikeUpdate(card)
      })
      .catch((err) => {
        console.log(err);
      })
  } else {
    api.setCardLike(card.getCardId())
      .then((card) => {
        card.handleCardLikeUpdate(card)
      })
      .catch((err) => {
        console.log(err);
      })
  }
}

export const handleCardClick = (cardTitleElement, cardImageElement) => {
  popupImage.open(cardTitleElement, cardImageElement);
}
