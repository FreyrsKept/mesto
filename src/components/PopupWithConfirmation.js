import { Popup } from "./Popup";

export class PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._formElement = this._popup.querySelector('.popup__form');
        this._submitForm = this._formElement.querySelector('.popup__submit');
        this._submitFormText = this._submitForm.textContent;
    }

    setEventListeners() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit();
        });
        super.setEventListeners();
    };

    handleFormSubmit(func) {
        this._handleFormSubmit = func;
    };

    renderLoading(loading, loadingText = 'Удаление...') {
        if (loading) {
            this._submitForm.textContent = loadingText;
        } else {
            this._submitForm.textContent = this._submitFormText
        }
    };
};