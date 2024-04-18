import React from 'react';
import MovieCard from '../MovieCard/MovieCard';
function MovieList({movieData, onLikeMovie, savedMovies, onDeleteMovie}) {
  const [widthWindow, setWidthWindow] = React.useState(0);
  const [addMore, setAddMore] = React.useState(0);
  // получаем ширину экрана
  React.useEffect(() => {
    getSize();
  }, []);
  const getSize = () => {
    setWidthWindow(window.innerWidth);
  };
  window.addEventListener('resize', getSize);
  // определяем сколько карточек надо показывать максимум на основании ширины окна и записываем это число в number
  const moviesTorender = React.useMemo(() => {
    const number = widthWindow < 480 ? 5 : 16;
    if (widthWindow == 910) {
      return movieData.slice(0, 12 + addMore);
    } else {
      return movieData.slice(0, number + addMore);
    }
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
            setAddMore(addMore => addMore + (widthWindow < 910 ? 2 : 4));
          }}>
          Ещё
        </button>
      )}
    </section>
  );
}
export default MovieList;
