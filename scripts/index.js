let editProfileButton = document.querySelector('.profile__name-edit');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('#username-input');
let jobInput = document.querySelector('#description-input');
let closeProfileButton = document.querySelector('.popup__close');
let userName = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');

const profilePopup = document.querySelector('.popup');

function popupClose() {
    profilePopup.classList.remove('popup_opened')
};

closeProfileButton.addEventListener('click', popupClose);

editProfileButton.addEventListener('click', function () {
    profilePopup.classList.add('popup_opened')
    nameInput.value = userName.textContent;
    jobInput.value = description.textContent;
});

function handleFormSubmit(evt) {
    evt.preventDefault();

    console.log(jobInput);
    console.log(nameInput);

    userName.textContent = nameInput.value;
    description.textContent = jobInput.value;

    popupClose();
}

formElement.addEventListener('submit', handleFormSubmit);