// переменные для новой карточки
const formElement = document.querySelector('.popup__form');
const cardAddForm = document.querySelector('#popup__form-add')
const imageName = document.querySelector('#imageName-input');
const imageLink = document.querySelector('#imageLink-input');

// кнопки
const popupCloseButtonList = document.querySelectorAll('.popup__close');
const editProfileButton = document.querySelector('.profile__name-edit');
const addImageButton = document.querySelector('.profile__add');

// переменные для изменения профиля
const ProfilePopup = document.querySelector('.popup_type_profile');
const userName = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const nameInput = document.querySelector('#username-input');
const jobInput = document.querySelector('#description-input');

// переменные для попапа с просмотром
const imagePopup = document.querySelector('.popup_type_add-card');
const viewPopup = document.querySelector('.popup_type_image-view');
const caption = document.querySelector('.popup__caption');
const imageView = document.querySelector('.popup__image');

// Стартовый массив карточек
const initialCards = [
  {
    name: 'Виноградовский мост',
    alt: 'Виноградовский мост в Красноясрке ведущий на остров-парк Татышев',
    link: 'https://top10.travel/wp-content/uploads/2017/09/vinogradovskij-most.jpg'
  },
  {
    name: 'Царь рыба',
    alt: 'Царь рыба в Дивногорске',
    link: 'https://top10.travel/wp-content/uploads/2017/09/tsar-ryba.jpg'
  },
  {
    name: 'Красноярские столбы',
    alt: 'Красноярские столбы - заповедник близ города Красноярск',
    link: 'https://top10.travel/wp-content/uploads/2017/09/zapovednik-stolby.jpg'
  },
  {
    name: 'Вид на океан',
    alt: 'Вид на океан',
    link: 'https://fikiwiki.com/uploads/posts/2022-02/1645033331_1-fikiwiki-com-p-krasivie-kartinki-na-smartfon-1.jpg'
  },
  {
    name: 'Горы алтая',
    alt: 'Вид на горы алтая',
    link: 'https://www.russiadiscovery.ru/upload/files/files/Altaiskie_gory.jpg'
  },
  {
    name: 'FUJIFILM C200 photo',
    alt: 'Фото сделанное на FUJIFILM C200',
    link: 'https://assets.community.lomography.com/ca/d5e3b43a75575e8ec79b18eb5747ed1a96f30c/1216x789x1.jpg?auth=89bb7a413857bb6927c5e5289102859143289dd1'
  }
];

const cards = document.querySelector('.cards')

// Выводим массив карточек
function createCard(card) {
  const newCard = document.querySelector('#cardTemplate').content.querySelector('.cards__element').cloneNode(true)
  const cardHeading = newCard.querySelector('.cards__title')
  cardHeading.textContent = card.name
  const cardImage = newCard.querySelector('.cards__image')
  cardImage.setAttribute('src', card.link)
  cardImage.setAttribute('alt', card.alt)

  // Переменная для удаления карточки
  const deleteCardButton = document.querySelector('.cards__delete');
  deleteCardButton.addEventListener('click', deleteCard);

  // переменная для лайка карточки
  const likeCardButton = document.querySelector('.cards__like-button');
  likeCardButton.addEventListener('click', likeCard);

  // переменная для зума карточки
  cardImage.addEventListener('click', viewCard);
  cardImage.addEventListener('click', () => popupOpen(viewPopup))

  return newCard
}

const renderCard = (card, cards) => {
  const newCardElement = createCard(card);
  cards.prepend(newCardElement);
}


initialCards.forEach(createCard)

// функция закрытия попапа
function popupClose(popup) {
  popup.classList.remove('popup_opened');
};

// функция открытия попапа
function popupOpen(popup) {
  popup.classList.add('popup_opened');
}

// функция которая по сабмиту берет данные из полей, заворачивает в обьект ниже
// и вызывает функцию createCard, которая передаёт обьект создавая карточку.
function cardFormSubmit(evt) {
  evt.preventDefault();
  createCard({
    name: imageName.value,
    alt: imageName.value,
    link: imageLink.value
  }, cards);
  popupClose(imagePopup);
}
cardAddForm.addEventListener('submit', cardFormSubmit);

// Функция удаления карточки
function deleteCard(evt) { evt.target.closest('.cards__element').remove(); };

// функция лайка карточки
function likeCard(evt) { evt.target.closest('.cards__like-button').classList.toggle('cards__like-button_active'); };

// Функция открытия карточки
function viewCard(evt) {
  imageView.src = evt.target.src;
  caption.textContent = evt.target.alt;
}

// Закрытие попапа кнопкой
popupCloseButtonList.forEach(function (closeButton) {
  const popup = closeButton.closest(".popup")
  closeButton.addEventListener('click', function () {
    popupClose(popup);
  })
});

// Открытия попапа профиля с автозаполнением полей
editProfileButton.addEventListener('click', function () {
  ProfilePopup.classList.add('popup_opened')
  nameInput.value = userName.textContent;
  jobInput.value = description.textContent;
});

// Сабмит изменений в профиле 
function handleFormSubmit(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  description.textContent = jobInput.value;

  popupClose(ProfilePopup);
}
formElement.addEventListener('submit', handleFormSubmit);

// Открытие попапа добавления фото
addImageButton.addEventListener('click', function () {
  imagePopup.classList.add('popup_opened');
});