import './index.css';
import { initialCards } from "../utils/initialCards";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from '../components/PopupWithImage.js'
import PopupWithForm from '../components/PopupWithForm.js'
import UserInfo from '../components/UserInfo.js'
import Section from '../components/Section.js'

 // Список классов для валидации
const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_type_visible',
};

// переменные для новой карточки
const popupAddCard = document.querySelector('.popup_type_add-card');
const cardAddForm = popupAddCard.querySelector('#popup__form-add');
const imageName = document.querySelector('#place-name-input');
const imageLink = document.querySelector('#place-image-input');
const profileButtonAdd = document.querySelector('.profile__add');

// переменные для изменения профиля
const profilePopup = document.querySelector('.popup_type_profile');
const profileChangeForm = document.querySelector('#popup__form-profile');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__description');
const nameInput = document.querySelector('#username-input');
const jobInput = document.querySelector('#description-input');
const ProfileButtonEdit = document.querySelector('.profile__name-edit');

// переменные для попапа с просмотром
const viewPopup = document.querySelector('.popup_type_image-view');

// Валидация профиля
const popupFormProfileValidation = new FormValidator(
  settings,
  profileChangeForm
);
popupFormProfileValidation.enableValidation();

// Валидация добавления карточки
const popupFormAddCardValidation = new FormValidator(
  settings,
  cardAddForm
);
popupFormAddCardValidation.enableValidation();

// Выводим стартовый массив карточек
const section = new Section(
  {
   items: initialCards,
   renderer: (data) => {
    const card = new Card(data, "template", handleCardClick);
    return card.create();
   },
  },
".cards__template"
);

section.renderCards();

function handleCardClick(name, link) {
  popupImage.open(name, link);
};

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__description'
});

const handleProfileFormSubmit = (userData) => {
  nameInput.value = userData.name;
  jobInput.value = userData.job;
}

const userData = userInfo.getUserInfo();

const popupImage = new PopupWithImage(viewPopup);

const popupEditProfileForm = new PopupWithForm(profilePopup, (data) => {
  console.log(data)
  userInfo.setUserInfo(data);
  popupEditProfileForm.close();
})

const popupAddCardForm = new PopupWithForm(popupAddCard, (data) => {
  section.addItem(popupAddCardForm._getInputValues());
  popupAddCardForm.close();
});

popupEditProfileForm.setEventListeners();
popupAddCardForm.setEventListeners();
popupImage.setEventListeners();

profileButtonAdd.addEventListener('click', () => {
  popupFormProfileValidation.resetValidation();
  popupAddCardForm.open();
})

ProfileButtonEdit.addEventListener('click', () => {
  popupEditProfileForm.setInputValues(userInfo.getUserInfo());
  popupEditProfileForm.open();
  handleProfileFormSubmit(userData);
})