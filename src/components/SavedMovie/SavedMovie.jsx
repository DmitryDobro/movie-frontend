import Header from '../Header/Header.jsx';
import MovieList from '../Movies/MovieList/MovieList.jsx';
import SearchFrom from '../SearchFrom/SearchForm.jsx';
import Footer from '../Footer/Footer.jsx';
import React from 'react';
function SavedMovie({onMobileMenu, isOpen, isLoggin, savedMovies, onDeleteMovie}) {
  const colorHeader = 'white';
  const [filterMovie, setFilterMovie] = React.useState([]);
  const [paramSearch, setParamSearch] = React.useState({});

  React.useEffect(() => {
    setFilterMovie(savedMovies);
  }, [savedMovies]);

  function handleFilteredMovie(param) {
    console.log(savedMovies);
    localStorage.setItem('paramSearchSavedFilm', JSON.stringify(param));
    setParamSearch(param);
    if (param.checkedShortFilm == true) {
      let findMovies = savedMovies.filter(item => item.nameRU.toLowerCase().includes(param.text) && item.duration < 40);
      setFilterMovie(findMovies);
    } else {
      let findMovies = savedMovies.filter(item => item.nameRU.toLowerCase().includes(param.text));
      setFilterMovie(findMovies);
    }
  }
  return (
    <>
      <Header color={colorHeader} onMobileMenu={onMobileMenu} isOpen={isOpen} isLoggin={isLoggin} />
      <SearchFrom onFilterMovie={handleFilteredMovie} param={paramSearch} />
      {filterMovie.length ? (
        <MovieList movieData={filterMovie} savedMovies={savedMovies} img={savedMovies.img} onDeleteMovie={onDeleteMovie} />
      ) : (
        <p className='saved__notFound'>Ничего не нашли</p>
      )}

      <Footer />
    </>
  );
}
export default SavedMovie;
