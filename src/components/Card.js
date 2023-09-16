import { api } from '../components/Api.js';
import {
  userInfo,
  popupImage,
  popupDeleteCard
} from '../pages/index.js';

export class Card {
  constructor(cardData, cardTemplate, handleCardClick, handleDeleteClick, handleCardLike, { userId }) {
    this.cardData = cardData;
    console.log(cardData);
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleCardLike = handleCardLike;
    this._cardTemplate = cardTemplate;
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardId = cardData._id;
    this._userId = userId;
    this._likes = cardData.likes;
    this._cardOwnerId = cardData.owner._id;
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
    this._cardLikeItem.classList.toggle('cards__like-button_active');
  }
  // Открытие карточки
  _handleImageClick() {
    this._handleCardClick(this._name, this._link);
  }
  // Счетчик лайков
  cardLikeCounter(cardData) {
    this.cardData = cardData;
    this._cardlikeCounterItem.textContent = cardData.likes.lenght;
    this._handleCardLike();
  }
  // Слушатели
  _setEventListener = () => {
    this._cardImageItem.addEventListener('click', () => {
      this._handleImageClick(this._name, this._link);
    });

    this._cardLikeItem.addEventListener('click', () => {
      this._handleCardLike(this)
    });

    this._cardDeleteItem.addEventListener('click', () => {
      this._handleDeleteClick(this)
    });
  }
}

// Удаление карточки
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

// Лайк карточки
export const handleCardLike = (card) => {
  console.log(cardData);
  if (card.cardData.likes.find((user) => user._id === userInfo.getUserId())) {
    api.deleteCardLike(card.getCardId())
      .then((cardData) => {
        card.handleCardLikeUpdate(cardData)
      })
      .catch((err) => {
        console.log(err);
      })
  } else {
    api.setCardLike(card.getCardId())
      .then((card) => {
        card.handleCardLikeUpdate(cardData)
      })
      .catch((err) => {
        console.log(err);
      })
  }
}
// функция открытия карточки
export const handleCardClick = (cardTitleItem, cardImageItem) => {
  popupImage.open(cardTitleItem, cardImageItem);
}
