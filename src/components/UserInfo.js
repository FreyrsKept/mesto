export class UserInfo {
    constructor({ nameSelector, jobSelector, avatarSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._jobElement = document.querySelector(jobSelector);
        this._avatarElement = document.querySelector(avatarSelector);
    };

    getUserId() {
        return this._userId;
    }

    getUserInfo() {
        const userData = {
            name: this._nameElement.textContent,
            about: this._jobElement.textContent
        }
        return userData
    };

    setUserInfo({ name, about, avatar, _id }) {
        this._nameElement.textContent = name;
        this._jobElement.textContent = about;
        this._avatarElement.src = avatar;
        this._userId = _id;
    };
}