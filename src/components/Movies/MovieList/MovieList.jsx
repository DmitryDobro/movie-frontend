import React from 'react';
import MovieCard from '../MovieCard/MovieCard';

import {
  MOVIE_NUMBER_LARGE,
  MOVIE_NUMBER_SMALL,
  WIDTH_WINOW_SMALL,
  WIDTH_WINOW_MEDIUM,
  ADD_MOVIE_SMALL,
  ADD_MOVIE_MEDIUM,
} from '../../../utils/constats';

function MovieList({movieData, onLikeMovie, savedMovies, onDeleteMovie}) {
  const [widthWindow, setWidthWindow] = React.useState(window.innerWidth);
  const [addMore, setAddMore] = React.useState(0);
  // обнуляем количество добавленных фильмов через кнопку
  // чтобы каждый раз при изменение ширины окна добавлять фиксированное количество фильмов
  const getSizeAndReset = () => {
    console.log('work');
    setWidthWindow(window.innerWidth);
    setAddMore(0);
  };
  function debounce(callee, timeoutMs) {
    return function perform() {
      let previousCall = this.lastCall;
      this.lastCall = Date.now();
      if (previousCall && this.lastCall - previousCall <= timeoutMs) {
        clearTimeout(this.lastCallTimer);
      }
      this.lastCallTimer = setTimeout(() => callee(), timeoutMs);
    };
  }
  const debouncedHandle = debounce(getSizeAndReset, 250);
  window.addEventListener('resize', debouncedHandle);
  // определяем сколько карточек надо показывать максимум на основании ширины окна и записываем это число в number
  const moviesTorender = React.useMemo(() => {
    const number = widthWindow < WIDTH_WINOW_SMALL ? MOVIE_NUMBER_SMALL : MOVIE_NUMBER_LARGE;
    return movieData.slice(0, number + addMore);
  }, [movieData, widthWindow, addMore]);
  console.log(moviesTorender);
  return (
    <section className='movies'>
      <div className='movies__card-list'>
        {moviesTorender.map((movie, i) => (
          <MovieCard
            key={i}
            movie={movie}
            name={movie.nameRU}
            duration={movie.duration}
            isSaved={movie.isSaved}
            onLikeMovie={onLikeMovie}
            savedMovies={savedMovies}
            onDeleteMovie={onDeleteMovie}
          />
        ))}
      </div>
      {movieData.length > moviesTorender.length && (
        <button
          className=' btn movies__more-btn'
          type='button'
          onClick={() => {
            setAddMore(addMore => addMore + (widthWindow < WIDTH_WINOW_MEDIUM ? ADD_MOVIE_SMALL : ADD_MOVIE_MEDIUM));
          }}>
          Ещё
        </button>
      )}
    </section>
  );
}
export default MovieList;
