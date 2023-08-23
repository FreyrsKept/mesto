import './index.css';
// import { initialCards } from "../utils/initialCards";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import { UserInfo } from '../components/UserInfo.js'
import { Section } from '../components/Section.js'
import { api } from '../components/Api.js'

// Берем информацию с сервера
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo(userData);
    cardList.renderItems(cards.reverse());
  })
  .catch((err) => {
    console.log(err);
  })

export const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__description',
  avatarSelector: '.profile__avatar'
});

export const popupImage = new PopupWithImage(viewPopup);
popupImage.setEventListeners();

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
const popupAddCardSelector = '.popup_type_add-card';
const cardAddForm = document.querySelector('#popup__form-add');
const profileButtonAdd = document.querySelector('.profile__add');
const cardsContainerSelector = '.cards__template';
const deleteCardPopupSelector = '.popup_type_card-delete';

// переменные для изменения профиля
const editAvatarPopupSelector = '.popup_type_avatar-edit';
const editProfilePopupSelector = '.popup_type_profile';
const profileButtonEdit = document.querySelector('.profile__name-edit');

// переменные для попапа с просмотром
const viewPopup = '.popup_type_image-view';

// Экземпляр класса проверки
const formValidator = {}

// Валидация форм
const validation = (cfg) => {
  const formList = document.querySelectorAll(cfg.form);
  formList.forEach((formItem) => {
    const validator = new FormValidator(cfg, formItem);
    const formName = formItem.getAttribute('name');
    formValidator[formName] = validator;
    validator.validation()
  });
};
validation(settings);

// Выводим стартовый массив карточек
const cardList = new Section({
  renderer: (item) => {
    const newCard = new Card(item, cardTemplateSelector, handleCardClick, handleDeleteClick, handleCardLike, {
      userId: userInfo.getUserId()
    });
    const cardElement = newCard.createCard();
    return cardElement;
  }
}, cardsContainerSelector);

export const popupDeleteCard = new PopupWithConfirmation(deleteCardPopupSelector);
deleteCardPopupSelector.setEventListeners();

// Попап с изменением профиля
const popupEditProfile = new PopupWithForm({
  handleFromSubmit: (userData) => {
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
  handleFromSubmit: (cardData) => {
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
  handleFromSubmit: (avatarData) => {
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
  formValidator['popup__form-add'].resetValidation()
  popupAddCard.open();
})

profileButtonEdit.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  popupEditProfile.setInputValues(userData);
  formValidator['popup__form-profile'].resetValidation()
  popupEditProfile.open();
})

profileAvatarEdit.addEventListener('click', () => {
  formValidator['avatar-edit'].resetValidation()
  popupEditAvatar.open();
})