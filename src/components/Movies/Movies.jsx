import Header from '../Header/Header.jsx';
import MovieList from './MovieList/MovieList.jsx';
import SearchFrom from '../SearchFrom/SearchForm.jsx';
import Footer from '../Footer/Footer.jsx';
import {dataMovie} from '../../utils/dataMovie.js';
function Movies({onMobileMenu, isOpen, isLoggin}) {
  const colorHeader = 'white';
  return (
    <>
      <Header color={colorHeader} onMobileMenu={onMobileMenu} isOpen={isOpen} isLoggin={isLoggin} />
      <SearchFrom />
      <MovieList movieData={dataMovie} />
      <Footer />
    </>
  );
}
export default Movies;
