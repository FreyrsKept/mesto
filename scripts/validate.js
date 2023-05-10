// Список классов для валидации
const classListToValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_type_visible',
};

// функция для показа ошибок валидации
const showValidError = function (formItem, inputItem, errorMessage, settings) {
  const errorItem = formItem.querySelector(`.${inputItem.id}-error`)
  inputItem.classList.add(settings.inputErrorClass);
  errorItem.textContent = errorMessage;
  errorItem.classList.add(settings.errorClass);
};

// функция для скрытия ошибок валидации
const hideValidError = function (formItem, inputItem, settings) {
  const errorItem = formItem.querySelector(`.${inputItem.id}-error`)
  inputItem.classList.remove(settings.inputErrorClass);
  errorItem.classList.remove(settings.errorClass);
  errorItem.textContent = '';
};

// функция для проверки валидации форм
const checkInputValidity = function (formItem, inputItem, settings) {
  if (inputItem.validity.valid === false) {
    showValidError(formItem, inputItem, inputItem.validationMessage, settings);
  } else {
    hideValidError(formItem, inputItem, settings);
  }
};

// функция для проверки всех input
const setEventListeners = function (formItem, settings) {
  const inputList = Array.from(formItem.querySelectorAll(settings.inputSelector));
  const buttonItem = formItem.querySelector(settings.submitButtonSelector);
  toggleButtonStatus(formItem, buttonItem, settings);
  inputList.forEach((inputItem) => {
    inputItem.addEventListener('input', function () {
      checkInputValidity(formItem, inputItem, settings);
      toggleButtonStatus(formItem, buttonItem, settings);
    });
  });
};

// функция для проверки всех input на ошибки
const hasInvalidInput = function (inputList) {
  return inputList.some((item) => {
    return !item.validity.valid;
  });
};

// функция для активации всех кнопок submit после валидации
const toggleButtonStatus = function (formItem, buttonItem, settings) {
  const inputList = Array.from(formItem.querySelectorAll(settings.inputSelector));
  if (hasInvalidInput(inputList)) {
    buttonItem.classList.add(settings.inactiveButtonClass);
    buttonItem.setAttribute('disabled', true);
  } else {
    buttonItem.classList.remove(settings.inactiveButtonClass);
    buttonItem.removeAttribute('disabled');
  }
};

// функция для запуска проверки валидации
const enableValidation = function (settings) {
  const formArrayEl = Array.from(document.querySelectorAll(settings.formSelector));
  formArrayEl.forEach((formItem) => {
    setEventListeners(formItem, settings);
  });
};

// Запуск валидации
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input_type_visible',
}); 