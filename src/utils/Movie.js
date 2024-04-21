class MovieApi {
  constructor() {}
  _getResonce(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error('Ошибка!'));
  } 
  
  getMovies() {
    return fetch(`https://api.nomoreparties.co/beatfilm-movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(this._getResonce);
  }
}
const movieApi = new MovieApi();
export {movieApi};
