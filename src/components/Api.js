class Api {
  constructor(options) {
    this._serverUrl = options.baseUrl;
    this._headers = options.headers;
  }
  // Метод проверки ответа сервера
  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }
  // Метод реквеста
  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }
  // Метод запроса информации о пользователе
  getUserInfo() {
    return this._request(`${this._serverUrl}/users/me`, {
      headers: this._headers
    })
  }
  // Метод отправки информации о пользователе
  sendUserInfo(userData) {
    return this._request(`${this._serverUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: `${userData.name}`,
        about: `${userData.about}`
      })
    })
  }
  // Метод установки аватара пользователя
  setUserAvatar(avatarData) {
    return this._request(`${this._serverUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: `${avatarData.avatar}`
      })
    })
  }
  // Метод запроса стартовых карточек
  getInitialCards() {
    return this._request(`${this._serverUrl}/cards`, {
      headers: this._headers
    })
  }
  // Метод отправки карточки
  sendNewCardInfo(cardData) {
    return this._request(`${this._serverUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: `${cardData.name}`,
        link: `${cardData.link}`
      })
    })
  }
  // Метод удаления карточки
  deleteCard(id) {
    return this._request(`${this._serverUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }
  // Метод установки лайков
  setCardLike(id) {
    return this._request(`${this._serverUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
  }
  // Метод удаления лайка карточки
  deleteCardLike(id) {
    return this._request(`${this._serverUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-73',
  headers: {
    authorization: '8ffdb09c-8dca-4dba-a4c8-d13e3ae22fe9',
    'Content-Type': 'application/json'
  }
})