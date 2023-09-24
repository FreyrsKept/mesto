import './index.css';
import { Card } from "../components/Card.js";
import { settings } from "../utils/constants.js"
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'
import { Section } from '../components/Section.js'
import { PopupWithConfirmation } from '../components/PopupWithConfirmation';
import { api } from '../components/Api.js'
import {
  // переменные для карточек
  popupAddCardSelector,
  profileButtonAdd,
  cardsContainerSelector,
  deleteCardPopupSelector,
  // переменные для изменения профиля
  editAvatarPopupSelector,
  profileAvatarEdit,
  editProfilePopupSelector,
  profileButtonEdit,
  // переменные для попапа с просмотром
  viewPopup
} from "../utils/constants.js"

// Берем информацию с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    cardList.renderCards(cards.reverse());
  })
  .catch((err) => {
    console.log(err);
  })

export const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
});

const formValidators = {}

// Валидация форм - //upd
const enableValidation = (settings) => {
  const formList = document.querySelectorAll(settings.formSelector);
  formList.forEach((formItem) => {
    const validator = new FormValidator(settings, formItem);
    const formName = formItem.getAttribute('name');
    formValidators[formName] = validator;
    validator.enableValidation()
  });
};
enableValidation(settings);

// Выводим стартовый массив карточек
const cardList = new Section({
  items: [],
  renderer: (item) => {
    const newCard = new Card(
      item,
      '.cards__template',
      handleCardClick,
      handleDeleteClick,
      updateCardLikes,
      userInfo.getUserId(),
    );
    return newCard.create();
  }
}, cardsContainerSelector);

export const popupDeleteCard = new PopupWithConfirmation(deleteCardPopupSelector);
popupDeleteCard.setEventListeners();

export const popupImage = new PopupWithImage(viewPopup);
popupImage.setEventListeners();

// Попап с изменением профиля
const popupEditProfile = new PopupWithForm({
  handleFormSubmit: (userData) => {
    popupEditProfile.renderLoading(true);
    api.sendUserInfo(userData)
      .then((newUserData) => {
        userInfo.setUserInfo(newUserData);
      })
      .then(() => popupEditProfile.close())
      .catch((err) => {
        console.log(err);
      })
      .finally(() => popupEditProfile.renderLoading(false))
  }
}, editProfilePopupSelector)
popupEditProfile.setEventListeners();

// Попап добавления карточки
const popupAddCard = new PopupWithForm({
  handleFormSubmit: (cardData) => {
    popupAddCard.renderLoading(true);
    api.sendNewCardInfo(cardData)
      .then((newCardData) => {
        cardList.addItem(newCardData);
      })
      .then(() => popupAddCard.close())
      .catch((err) => {
        console.log(err);
      })
      .finally(() => popupAddCard.renderLoading(false))
  }
}, popupAddCardSelector);
popupAddCard.setEventListeners();

// Попап изменения аватара
const popupEditAvatar = new PopupWithForm({
  handleFormSubmit: (avatarData) => {
    popupEditAvatar.renderLoading(true);
    api.setUserAvatar(avatarData)
      .then((newAvatarData) => {
        userInfo.setUserInfo(newAvatarData);
      })
      .then(() => popupEditAvatar.close())
      .catch((err) => {
        console.log(err);
      })
      .finally(() => popupEditAvatar.renderLoading(false))
  }
}, editAvatarPopupSelector);
popupEditAvatar.setEventListeners();

// Удаление карточки
const handleDeleteClick = (card) => {
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
const updateCardLikes = (card) => {
  // console.log(cardData);
  if (card.cardData.likes.find((user) => user._id === userInfo.getUserId())) {
    api.deleteCardLike(card.getCardId())
      .then((cardData) => {
        card.updateCardLikes(cardData)
      })
      .catch((err) => {
        console.log(err);
      })
  } else {
    api.setCardLike(card.getCardId())
      .then((cardData) => {
        card.updateCardLikes(cardData)
      })
      .catch((err) => {
        console.log(err);
      })
  }
}
// функция открытия карточки
const handleCardClick = (cardTitleItem, cardImageItem) => {
  popupImage.open(cardTitleItem, cardImageItem);
}

// Слушатели попапов
profileButtonAdd.addEventListener('click', () => {
  formValidators['popup__form-add'].resetValidation()
  popupAddCard.open();
})

profileButtonEdit.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  popupEditProfile.setInputValues(userData);
  formValidators['popup__form-profile'].resetValidation()
  popupEditProfile.open();
})

profileAvatarEdit.addEventListener('click', () => {
  formValidators['popup__form-avatar'].resetValidation()
  popupEditAvatar.open();
})