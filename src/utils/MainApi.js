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

  // =======api для фильмов
  saveMovie(movie) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: `https://api.nomoreparties.co/${movie.image.url}`,
        trailerLink: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: `https://api.nomoreparties.co/${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
      }),
    }).then(this._getResonce);
  }
  getSavedMovies() {
    return fetch(`${this._url}/movies`, {headers: {'Content-Type': 'application/json'}, credentials: 'include'}).then(this._getResonce);
  }

  deleteMovie(id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(this._getResonce);
  }
  // =======api для пользователей
  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then(this._getResonce);
  }
  uppdateUser(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then(this._getResonce);
  }
}

const api = new MainApi();
export {api};
