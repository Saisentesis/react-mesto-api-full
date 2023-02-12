class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    const token = localStorage.getItem('token');
    if (token) {
      this._headers.authorization = 'Bearer ' + token;
    }
  }

  _checkAnswer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  setToken(token) {
    this._headers.authorization = 'Bearer ' + token;
  }

  signUp(password, email) {
    return fetch(`${this._baseUrl}/signup`,  {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "password": password,
        "email":  email
      })
    }).then(res=> this._checkAnswer(res));
  }

  signIn(password, email) {
    return fetch(`${this._baseUrl}/signin`,  {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "password": password,
        "email":  email
      })
    }).then(res=> this._checkAnswer(res));
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`,  {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization" : `Bearer ${token}`
      }
    }).then(res=> this._checkAnswer(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`,  {headers: this._headers})
    .then(res=> this._checkAnswer(res));
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`,  {headers: this._headers})
    .then(res=> this._checkAnswer(res));
  }

  setUserInfo(item) {
    return fetch(`${this._baseUrl}/users/me`,  {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        about: item.about
      })
    }).then(res=> this._checkAnswer(res));
  }

  addCard(item) {
    return fetch(`${this._baseUrl}/cards`,  {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: item.name,
        link: item.link
      })
    }).then(res=> this._checkAnswer(res));
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`,  {
      method: 'DELETE',
      headers: this._headers,
    }).then(res=> this._checkAnswer(res));
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`,  {
        method: 'PUT',
        headers: this._headers,
      })
      .then(res => this._checkAnswer(res));
    }
    else {
      return fetch(`${this._baseUrl}/cards/${id}/likes`,  {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(res => this._checkAnswer(res));
    }
  }

  setUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(
        avatar
      )
    }).then(res => this._checkAnswer(res));
  }
  
}

export default new Api({
  baseUrl: 'https://api.places.nomoredomainsclub.ru',
  headers: {
    'Content-Type': 'application/json'
  }
  }
);