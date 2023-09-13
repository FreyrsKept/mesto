import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor({ handleFormSubmit }, popup) {
        super(popup);
        this._handleFormSubmit = handleFormSubmit;
        this._formElement = this._popup.querySelector('.popup__form');
        this._formInputList = this._formElement.querySelectorAll('.popup__input');
        this._formSubmitButtonElement = this._formElement.querySelector('.popup__submit');
        this._formSubmitButtonText = this._formSubmitButtonElement.textContent;
    }

    close() {
        this._formElement.reset();
        super.close();
    }

    setInputValues(data) {
        this._formInputList.forEach((input) => {
            input.value = data[input.name];
        });
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener("submit", (e) => {
            e.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    _getInputValues() {
        this._inputValues = {};
        this._formInputList.forEach((input) => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }

    renderLoading(isLoading, loadingText = 'Сохранение...') {
        if (isLoading) {
            this._formSubmitButtonElement.textContent = loadingText;
        } else {
            this._formSubmitButtonElement.textContent = this._formSubmitButtonText
        }
    }
}