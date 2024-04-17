import Header from '../Header/Header.jsx';
import MovieList from './MovieList/MovieList.jsx';
import SearchFrom from '../SearchFrom/SearchForm.jsx';
import Footer from '../Footer/Footer.jsx';
import React from 'react';
function Movies({onMobileMenu, isOpen, isLoggin, onLikeMovie, savedMovies, onDeleteMovie, movies}) {
  const colorHeader = 'white';
  const [filterMovie, setFilterMovie] = React.useState([]);
  const [paramSearch, setParamSearch] = React.useState({});
  const searchedMovies = JSON.parse(localStorage.getItem('findMoviesLS'));
  const paramSearchLS = JSON.parse(localStorage.getItem('paramSearch'));
  // если в LS есть фильмы, которые искали рань, то подгружаем их оттуда
  React.useEffect(() => {
    if (searchedMovies) {
      setFilterMovie(searchedMovies);
      setParamSearch(paramSearchLS);
    }
  }, []);

  // функция поиска фильма, сначала проверяем были ли отмечене чекбокс,для поиска короткометра.
  // Так же параметры по котрым искали сохраняем в localstorage
  function handleFilteredMovie(param) {
    console.log(param);
    localStorage.setItem('paramSearch', JSON.stringify(param));
    setParamSearch(param);
    if (param.checkedShortFilm == true) {
      let findMovies = movies.filter(item => item.nameRU.toLowerCase().includes(param.text) && item.duration < 30);
      setFilterMovie(findMovies);
      localStorage.setItem('findMoviesLS', JSON.stringify(findMovies));
    } else {
      let findMovies = movies.filter(item => item.nameRU.toLowerCase().includes(param.text));
      setFilterMovie(findMovies);
      localStorage.setItem('findMoviesLS', JSON.stringify(findMovies));
    }
  }
  return (
    <>
      <Header color={colorHeader} onMobileMenu={onMobileMenu} isOpen={isOpen} isLoggin={isLoggin} />
      <SearchFrom onFilterMovie={handleFilteredMovie} param={paramSearch} />
      {filterMovie.length ? (
        <MovieList movieData={filterMovie} onLikeMovie={onLikeMovie} savedMovies={savedMovies} onDeleteMovie={onDeleteMovie} />
      ) : paramSearch.text ? (
        <p className='saved__notFound'>Ничего не нашли</p>
      ) : (
        ''
      )}
      <Footer />
    </>
  );
}
export default Movies;
