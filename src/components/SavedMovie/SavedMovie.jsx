import Header from '../Header/Header.jsx';
import MovieList from '../Movies/MovieList/MovieList.jsx';
import SearchFrom from '../SearchFrom/SearchForm.jsx';
import Footer from '../Footer/Footer.jsx';
import {dataSaveMovie} from '../../utils/dataMovie.js';
function SavedMovie({onMobileMenu, isOpen, isLoggin}) {
  const colorHeader = 'white';
  return (
    <>
      <Header color={colorHeader} onMobileMenu={onMobileMenu} isOpen={isOpen} isLoggin={isLoggin} />
      <SearchFrom />
      <MovieList movieData={dataSaveMovie} />
      <Footer />
    </>
  );
}
export default SavedMovie;
