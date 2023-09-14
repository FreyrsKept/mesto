import { Popup } from "./Popup";

export class PopupWithConfirmation extends Popup {
    constructor(popup) {
        super(popup);
        this._formElement = this._popup.querySelector('.popup__form');
        this._submitForm = this._formElement.querySelector('.popup__submit');
        // this._submitForm = this._popup.querySelector('.popup__submit');
        // this._submitFormText = this._submitForm.textContent;
    }

    setEventListeners() {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit();
        });
        // super.setEventListeners();
        // this._submitForm.addEventListener('click', () => {
        //     this._handleFormSubmit();
        // })
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