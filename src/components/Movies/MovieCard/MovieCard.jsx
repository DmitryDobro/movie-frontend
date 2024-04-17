import {useLocation} from 'react-router-dom';
import iconDelete from '../../../img/iconDelete.svg';
function MovieCard({movie, name, duration, onLikeMovie, savedMovies, onDeleteMovie}) {
  const location = useLocation();
  const isLiked = savedMovies.some(saveMovie => {
    return saveMovie.movieId === movie.id;
  });
  // если лайк уже поставлен запускаем функцию удаления
  // для этого передаем сохраненный фильмов, по которому клинкули, чтобы сразу удалть карточку и она не отображалась в сохраненках
  const savedMovie = savedMovies.find(item => item.movieId === movie.id);
  const imgUrl = movie.image.url ? `https://api.nomoreparties.co/${movie.image.url}` : movie.image;
  // перевод часы в минуты
  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + 'ч. ' + minutes + 'мин.';
  }
  const myDuration = getTimeFromMins(duration);
  return (
    <section className='movie-card'>
      <a target='blank' href={movie.trailerLink}>
        <img className='movie-card__image' src={imgUrl} alt={`Постер фильма ${name}`} />
      </a>
      <div className='movie-card__content'>
        <div className='movie-card__info'>
          <p className='movie-card__name'>{name}</p>
          <p className='movie-card__duration'>{myDuration}</p>
        </div>
        {location.pathname === '/movies' ? (
          <button
            onClick={() => {
              onLikeMovie(movie, isLiked, savedMovie);
            }}
            className={`btn movie-card__like-btn ${isLiked && 'movie-card__like-btn_type_active'}`}></button>
        ) : (
          <button className='btn movie-card__delete-btn'>
            <img
              src={iconDelete}
              alt='Иконка-крестик'
              onClick={() => {
                onDeleteMovie(movie._id);
              }}
            />
          </button>
        )}
      </div>
    </section>
  );
}

export default MovieCard;
