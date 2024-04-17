class MainApi {
  constructor() {
    this._url = 'https://api.bitfilmsdb.nomoredomainswork.ru';
  }
  _getResonce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error('Ошибка!'));
  }
  register(name, password, email) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({name, password, email}),
    }).then(this._getResonce);
  }
  login(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({email, password}),
    }).then(this._getResonce);
  }
}

const authApi = new MainApi();
export {authApi};
