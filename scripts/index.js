const editProfileButton = document.querySelector('.profile__name-edit');
const addImageButton = document.querySelector('.profile__add');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('#username-input');
const jobInput = document.querySelector('#description-input');
const cardAddForm = document.querySelector('#popup__form-add')
const ImageName = document.querySelector('#imageName-input');
const ImageLink = document.querySelector('#imageLink-input');
const popupCloseButtonList = document.querySelectorAll('.popup__close');
const userName = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const popup = document.querySelector('.popup');
const ProfilePopup = document.querySelector('.popup_type_profile');
const imagePopup = document.querySelector('.popup_type_add-card');
// функцией закрытия попапа
function popupClose(popup) {
  popup.classList.remove('popup_opened');
};
// Закрытие попапа кнопкой
popupCloseButtonList.forEach(function (closeButton) {
  const popup = closeButton.closest(".popup")
  closeButton.addEventListener('click', function () {
    popupClose(popup);
  })
});

editProfileButton.addEventListener('click', function () {
  ProfilePopup.classList.add('popup_opened')
  nameInput.value = userName.textContent;
  jobInput.value = description.textContent;
});

addImageButton.addEventListener('click', function () {
  imagePopup.classList.add('popup_opened');
});
// 
function handleFormSubmit(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  description.textContent = jobInput.value;

  popupClose(ProfilePopup);
}

formElement.addEventListener('submit', handleFormSubmit);

const initialCards = [
  {
    name: 'Виноградовский мост',
    link: 'https://top10.travel/wp-content/uploads/2017/09/vinogradovskij-most.jpg'
  },
  {
    name: 'Царь рыба',
    link: 'https://top10.travel/wp-content/uploads/2017/09/tsar-ryba.jpg'
  },
  {
    name: 'Красноярские столбы',
    link: 'https://top10.travel/wp-content/uploads/2017/09/zapovednik-stolby.jpg'
  },
  {
    name: 'Вид на океан',
    link: 'https://fikiwiki.com/uploads/posts/2022-02/1645033331_1-fikiwiki-com-p-krasivie-kartinki-na-smartfon-1.jpg'
  },
  {
    name: 'Горы алтая',
    link: 'https://www.russiadiscovery.ru/upload/files/files/Altaiskie_gory.jpg'
  },
  {
    name: 'FUJIFILM C200 PHOTO',
    link: 'https://assets.community.lomography.com/ca/d5e3b43a75575e8ec79b18eb5747ed1a96f30c/1216x789x1.jpg?auth=89bb7a413857bb6927c5e5289102859143289dd1'
  }
];

const cards = document.querySelector('.cards')

function createCard(card) {
  const newCard = document.querySelector('#cardTemplate').content.cloneNode(true)
  const cardHeading = newCard.querySelector('.cards__title')
  cardHeading.textContent = card.name
  const cardImage = newCard.querySelector('.cards__image')
  cardImage.setAttribute('src', card.link)
  cards.prepend(newCard)
}

initialCards.forEach(createCard)
// Делаем функцию которая по сабмиту берет данные из полей, заворачивает в обьект ниже
// и вызывает функцию createCard, которая передаёт обьект создавая карточку.

function cardFormSubmit(evt) {
  evt.preventDefault();
  createCard({
    name: ImageName.value,
    alt: ImageName.value,
    link: ImageLink.value
  }, cards);
  popupClose(imagePopup);
}

cardAddForm.addEventListener('submit', cardFormSubmit);

//cardAddForm.addEventListener('submit', cardFormSubmit);

// const newCard = {
//   link: 'https://picsum.photos/200',
//   name: 'test'
// }

// createCard(newCard);