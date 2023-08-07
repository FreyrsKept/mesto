export default class UserInfo {
    constructor({ nameSelector, jobSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._jobElement = document.querySelector(jobSelector);
    };

    getUserInfo() {
        const userData = {
            name: this._nameElement.textContent,
            job: this._jobElement.textContent
        }
        return userData
    };

    setUserInfo(userData) {
        this._nameElement.textContent = userData.name;
        this._jobElement.textContent = userData.job;
    };
}