export default class Popoup {
    constructor(popup) {
        this._popupCard = popup;
        this._closeWhenPressEsc = this._closeWhenPressEsc.bind(this);
    }

    setEventListeners() {
        this._popupCard.addEventListener('mousedown', (e) => {
            if (
                e.target.classList.contains('popup_opened') ||
                e.target.classList.contains('popup__close-button')
            )
            this.close();
        });
    }

    open() {
        this._popupCard.classList.add('popup_opened');
        document.addEventListener('keydown', this._closeWhenPressEsc);
    }

    close() {
        this._popupCard.classList.add('popup_opened');
        document.removeEventListener('keydown', this._closeWhenPressEsc);        
    }

    _closeWhenPressEsc(e) {
        if (e.key === 'Escape') this.close();
    }
}