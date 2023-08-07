export default class FormValidator {
  constructor(settings, formItem) {
    this._settings = settings;
    this._formItem = formItem;
    this._inputList = Array.from(
      this._formItem.querySelectorAll(this._settings.inputSelector)
    );
    this._buttonItem = this._formItem.querySelector(
      this._settings.submitButtonSelector
    )
  }

  // // функция для запуска проверки валидации
  enableValidation = () => {
    this._formItem.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this._setEventListeners();
  };

  // // функция для проверки валидации форм
  _checkInputValidity = (element) => {
    !element.validity.valid
      ? this._showValidError(element)
      : this._hideValidError(element);
  };

  // // функция для показа ошибок валидации
  _showValidError = (element) => {
    const errorElement = this._formItem.querySelector(`.${element.id}-error`)
    element.classList.add(this._settings.inputErrorClass);
    errorElement.classList.add(this._settings.errorClass);
    errorElement.textContent = element.validationMessage;
  };

  // // функция для скрытия ошибок валидации
  _hideValidError = (element) => {
    const errorElement = this._formItem.querySelector(`.${element.id}-error`)
    element.classList.remove(this._settings.inputErrorClass)
    errorElement.classList.remove(this._settings.errorClass);
    errorElement.textContent = "";
  }

  // // функция для проверки всех input на ошибки
  _hasInvalidInput = () => {
    return this._inputList.some((element) => {
      return !element.validity.valid;
    });
  };

  // // функция для активации всех кнопок submit после валидации
  toggleButtonStatus = () => {
    this._hasInvalidInput(this._inputList)
      ? this._disableSubmitButton()
      : this._activateSubmitButton();
  };

  _disableSubmitButton = () => {
    this._buttonItem.classList.add(this._settings.inactiveButtonClass);
    this._buttonItem.setAttribute("disabled", "");
  };

  _activateSubmitButton = () => {
    this._buttonItem.classList.remove(this._settings.inactiveButtonClass);
    this._buttonItem.removeAttribute("disabled", "");
  };

  _setEventListeners = () => {
    this.toggleButtonStatus();
    this._inputList.forEach((element) => {
      element.addEventListener("input", () => {
        this._checkInputValidity(element);
        this.toggleButtonStatus();
      });
    });
  };

  resetValidation() {
    this._disableSubmitButton();
    this._inputList.forEach((element) => {
      this._hideValidError(element);
    });
  }
}