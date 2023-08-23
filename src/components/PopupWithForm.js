import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
    constructor(popupSelector, popupSubmitCallback) {
        super(popupSelector);
        this._popupSubmitCallback = popupSubmitCallback;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._formInputList = this._popupForm.querySelectorAll('.popup__input');
    }

    close() {
        this._popupForm.reset();
        super.close();
    }

    setInputValues(data) {
        this._formInputList.forEach((input) => {
            input.value = data[input.name];
        });
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            this._popupSubmitCallback(this._getInputValues());
        });
    }

    _getInputValues() {
        this._inputValues = {};
        this._formInputList.forEach((input) => {
            this._inputValues[input.name] = input.value;
        });
        return this._inputValues;
    }
}