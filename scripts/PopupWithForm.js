import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popup, popupSubmitCallback) {
        super(popup);
        this._popupSubmitCallback = popupSubmitCallback;
        this._popupForm = this._popupCard.querySelectorAll('.popup__form');
        this._formInputList = this._popupForm.querySelectorAll('.popup__input');
        this._submitButton = this._popupCard.querySelector('.popup__submit');
    }

    close() {
        this._popupForm.reset();
        super.close();
    }

    getInputs() {
        return this._getInputValues();
    }

    setInputValues(data) {
        this._formInputList.forEach((input) => {
            input.value = data[input.name];
        });
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener("submit", (e) => {
            this._popupSubmitCallback(e);
        });
    }

    _getInputValues() {
        this._inputs = {};
        this._formInputList.forEach((input) => {
            this._inputs[input.name] = input.value;
        });
        return this._inputs;
    }
}