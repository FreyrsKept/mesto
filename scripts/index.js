const popup = document.querySelector('.popup');

// переменные для новой карточки
const imagePopup = document.querySelector('.popup_type_add-card');
const cardAddForm = document.querySelector('#popup__form-add');
const imageName = document.querySelector('#imageName-input');
const imageLink = document.querySelector('#imageLink-input');
const addImageButton = document.querySelector('.profile__add');
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
const editProfileButton = document.querySelector('.profile__name-edit');
const closeProfileEditButton = document.querySelector('#popup__close-button_profile');

// переменные для попапа с просмотром
const viewPopup = document.querySelector('.popup_type_image-view');
const caption = document.querySelector('.popup__caption');
const imageView = document.querySelector('.popup__image');
const closeCardViewButton = document.querySelector('#popup__close-button_view_card');


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

// Выводим массив карточек
const createCard = (card) => {
  const newCard = document.querySelector('#cardTemplate').content.querySelector('.cards__element').cloneNode(true);
  const cardHeading = newCard.querySelector('.cards__title');
  cardHeading.textContent = card.name;
  const cardImage = newCard.querySelector('.cards__image');
  cardImage.setAttribute('src', card.link);
  cardImage.setAttribute('alt', card.alt);

  // Переменная для удаления карточки
  const deleteCardButton = newCard.querySelector('.cards__delete');
  deleteCardButton.addEventListener('click', deleteCard);

  // переменная для лайка карточки
  const likeCardButton = newCard.querySelector('.cards__like-button');
  likeCardButton.addEventListener('click', likeCard);

  // слушатель для зума карточки
  cardImage.addEventListener('click', viewCard);

  return newCard;
};

const renderCard = (card, cards) => {
  const newCardElement = createCard(card);
  cards.prepend(newCardElement);
};

initialCards.reverse().forEach(data => { renderCard(data, cards); });

// функция которая по сабмиту берет данные из полей, заворачивает в обьект ниже
// и вызывает функцию createCard, которая передаёт обьект создавая карточку.
function cardFormSubmit(evt) {
  evt.preventDefault();
  renderCard({
    name: imageName.value,
    alt: imageName.value,
    link: imageLink.value
  }, cards);
  document.getElementById('popup__form-add').reset();
  closePopup(imagePopup);
};
cardAddForm.addEventListener('submit', cardFormSubmit);

// функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

// закрытие попапа с добавлением карточки
closeCardAddButton.addEventListener('click', function () {
  closePopup(imagePopup);
});

// закрытие попапа с просмотром карточки
closeCardViewButton.addEventListener('click', function () {
  closePopup(viewPopup);
});

// закрытие попапа измениния профиля
closeProfileEditButton.addEventListener('click', function () {
  closePopup(profilePopup);
});


// функция открытия попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

// Функция удаления карточки
function deleteCard(evt) { evt.target.closest('.cards__element').remove(); };

// функция лайка карточки
function likeCard(evt) { evt.target.closest('.cards__like-button').classList.toggle('cards__like-button_active'); };

// Функция открытия карточки
function viewCard(evt) {
  openPopup(viewPopup)
  imageView.src = evt.target.src;
  caption.textContent = evt.target.alt;
};

// Открытия попапа профиля с автозаполнением полей
editProfileButton.addEventListener('click', function () {
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
addImageButton.addEventListener('click', function () {
  openPopup(imagePopup);
});