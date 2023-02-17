let editProfileButton = document.querySelector('.profile__name-edit');
const profilePopup = document.querySelector('.profile__popup');

editProfileButton.addEventListener('click', function() {
    profilePopup.classList.remove('profile__popup')
});

let closeProfileButton = document.querySelector('.popup__close');

closeProfileButton.addEventListener('click', function(){
    profilePopup.classList.add('profile__popup')
});


// Находим форму в DOM
let formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector('#username-input'); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector('#description-input'); // Воспользуйтесь инструментом .querySelector()
// Обработчик «отправки» формы
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

let nameInput = document.querySelector('#username-input').value;
let jobInput = document.querySelector('#description-input').value;
console.log(jobInput);
console.log(nameInput);

let userName = document.querySelector('.profile__name');
let description = document.querySelector('.profile__description');

userName.textContent = nameInput;
description.textContent = jobInput;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', handleFormSubmit, function(){
    profilePopup.classList.add('profile__popup')
});
