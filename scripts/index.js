let editProfileButton = document.querySelector('.profile__name-edit');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('#username-input');
let jobInput = document.querySelector('#description-input');
let closeProfileButton = document.querySelector('.popup__close');

const profilePopup = document.querySelector('.popup');

editProfileButton.addEventListener('click', function () {
    profilePopup.classList.add('popup_opened')
});

closeProfileButton.addEventListener('click', function () {
    profilePopup.classList.remove('popup_opened')
});

nameInput.value = "Жак-Ив Кусто";
jobInput.value = "Исследователь Океана";

// Обработчик «отправки» формы
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    let nameInput = document.querySelector('#username-input').value;
    let jobInput = document.querySelector('#description-input').value;
    console.log(jobInput);
    console.log(nameInput);

    let userName = document.querySelector('.profile__name');
    let description = document.querySelector('.profile__description');

    userName.textContent = nameInput;
    description.textContent = jobInput;

    profilePopup.classList.remove('popup_opened')
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit, function () {
});