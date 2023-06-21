import { initialCards } from "./cards.js";
import Card from "./card.js";
import FormValidator from "./FormValidator.js";

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
const imagePopup = document.querySelector('.popup_type_add-card');
const cardAddForm = document.querySelector('#popup__form-add');
const imageName = document.querySelector('#place-name-input');
const imageLink = document.querySelector('#place-image-input');
const buttonOpenPopupCard = document.querySelector('.profile__add');
const closeCardAddButton = document.querySelector('#popup__close-button_add_card');

// карточки
const cards = document.querySelector('.cards');

// переменные для изменения профиля
const profilePopup = document.querySelector('.popup_type_profile');
const profileChangeForm = document.querySelector('#popup__form-profile');
const userName = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const nameInput = document.querySelector('#username-input');
const jobInput = document.querySelector('#description-input');
const ProfileButtonEdit = document.querySelector('.profile__name-edit');

// переменные для попапа с просмотром
const viewPopup = document.querySelector('.popup_type_image-view');
const CardViewButtonClose = document.querySelector('#popup__close-button_view_card');

// переменная всех попапов
const popups = document.querySelectorAll('.popup');

// //-- Выводим массив карточек
function createCard(card) {
  return new Card(card, "template").create();
}

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

const renderCard = (card) => {
  cards.prepend(createCard(card));
};

initialCards.forEach((data) => renderCard(data));

// функция которая по сабмиту берет данные из полей, заворачивает в обьект ниже создавая карточку.
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard({
    name: imageName.value,
    alt: imageName.value,
    link: imageLink.value
  }, cards);
  closePopup(imagePopup);
};
cardAddForm.addEventListener('submit', handleCardFormSubmit);

buttonOpenPopupCard.addEventListener('click', () => {
  cardAddForm.reset();
  popupFormAddCardValidation.toggleButtonStatus();
})

// функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};

// Закрытие попапа через 'Esc'
const closePopupEsc = function (evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector('.popup_opened')
    closePopup(popupOpened);
  }
};

// закрытие попапа кликом на оверлей
popups.forEach( popupElement => {
  popupElement.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened') || evt.target.classList.contains('popup__close')) {
      closePopup(popupElement);
    }
  });
});

// функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened')
  document.addEventListener('keydown', closePopupEsc);
};

// Открытия попапа профиля с автозаполнением полей
ProfileButtonEdit.addEventListener('click', function () {
  openPopup(profilePopup)
  nameInput.value = userName.textContent;
  jobInput.value = description.textContent;
});

// Сабмит изменений в профиле 
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  description.textContent = jobInput.value;
  closePopup(profilePopup);
};
profileChangeForm.addEventListener('submit', handleProfileFormSubmit);

// Открытие попапа добавления фото
buttonOpenPopupCard.addEventListener('click', function () {
  openPopup(imagePopup);
});
export default viewPopup;
export {openPopup};