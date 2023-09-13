import './index.css';
// import { initialCards } from "../utils/initialCards";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'
import { Section } from '../components/Section.js'
import { PopupWithConfirmation } from '../components/PopupWithConfirmation';
import { api } from '../components/Api.js'
import {
  handleDeleteClick,
  handleCardLike,
  handleCardClick,
} from '../components/Card.js'

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

// Список классов для валидации
const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_type_visible',
};

// переменные для карточек
const popupAddCardSelector = document.querySelector('.popup_type_add-card');
const profileButtonAdd = document.querySelector('.profile__add');
const cardsContainerSelector = '.cards__list';
const deleteCardPopupSelector = '.popup_type_card-delete';
const cardsElementsSelector = '.cards__element';

// переменные для изменения профиля
const editAvatarPopupSelector = document.querySelector('.popup_type_avatar-edit');
const profileAvatarEdit = document.querySelector('.profile__avatar-edit');
const editProfilePopupSelector = document.querySelector('.popup_type_profile');
const profileButtonEdit = document.querySelector('.profile__name-edit');

// формы
const popupFormAdd = popupAddCardSelector.querySelector('.popup__form');
const popupFormAvatar = editAvatarPopupSelector.querySelector('.popup__form');
const popupFormProfile = editProfilePopupSelector.querySelector('.popup__form');

// переменные для попапа с просмотром
const viewPopup = '.popup_type_image-view';

// Экземпляр класса проверки
const formValidator = {}

// Валидация форм
const validation = (settings) => {
  const formList = document.querySelectorAll(settings.form);
  formList.forEach((formItem) => {
    const validator = new FormValidator(settings, formItem);
    const formName = formItem.getAttribute('name');
    formValidator[formName] = validator;
    validator.validation()
  });
};
validation(settings);

const profileButtonAddValidation = new FormValidator(settings, popupFormAdd);
profileButtonAddValidation.enableValidation();
const popupAvatarUpdateValidation = new FormValidator(settings, popupFormAvatar);
popupAvatarUpdateValidation.enableValidation();
const popupUserValidation = new FormValidator(settings, popupFormProfile)
popupUserValidation.enableValidation();

// Выводим стартовый массив карточек
const cardList = new Section({
  items: [],
  renderer: (item) => {
    const newCard = new Card(
      item,
      '.cards__template',
      handleCardClick,
      handleDeleteClick,
      handleCardLike,
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

// // Попап изменения профиля - апдейт
// const popupEditProfile = new PopupWithForm(editProfilePopupSelector, userData =>{
//   popupEditProfile.renderLoading(true);
//   api.sendUserInfo(userData)
//   .then((newUserData) => {
//     userInfo.setUserInfo(newUserData);
//     popupEditProfile.close();
//   })
//   .catch(err => console.log(err))
//   .finally(() => popupEditProfile.renderLoading(false));
// })


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

// Слушатели попапов
profileButtonAdd.addEventListener('click', () => {
  profileButtonAddValidation.resetValidation()
  popupAddCard.open();
})

profileButtonEdit.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  popupEditProfile.setInputValues(userData);
  popupUserValidation.resetValidation()
  popupEditProfile.open();
})

profileAvatarEdit.addEventListener('click', () => {
  popupAvatarUpdateValidation.resetValidation()
  popupEditAvatar.open();
})