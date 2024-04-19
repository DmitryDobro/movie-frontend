import React from 'react';
import {Route, Routes, useNavigate, Navigate} from 'react-router-dom';
// апи
import {api} from '../utils/MainApi.js';
import {authApi} from '../utils/auth.js';
import {movieApi} from '../utils/Movie.js';
// компоненты
import Landing from './Landing/Landing.jsx';
import Login from './Login/Login';
import Registration from './Registration/Registration';
import Profile from './Profile/Profile';
import Movies from './Movies/Movies';
import SavedMovie from './SavedMovie/SavedMovie';
import NotFound from './NotFound/NotFound.jsx';
import MobileMenu from './MobileMenu/MobileMenu.jsx';
import {CurrentUserContext} from '../context/CurrentUserContext.js';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute.jsx';
import Preloader from './Preloader/Preloader.jsx';
import InfoTooltip from './InfoTooltip/InfoTooltip.jsx';

function App() {
  const LoggedInFromLlocalStorage = JSON.parse(localStorage.getItem('isLoggin'));
  const [savedMovies, setSavedMovies] = React.useState([]);
  const navigate = useNavigate();
  const [isLoggin, setIsLoggin] = React.useState(LoggedInFromLlocalStorage);
  const [isOpenMobileMenu, setIsOpenMobileMenu] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [movies, setMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  // состояния для модального окна с успешной/неуспешной регистрацией
  const [isOpenInfoTooltipPopup, setOpenIsInfoTooltipPopup] = React.useState(false);
  const [tooltipNoticeText, setTooltipNoticeText] = React.useState('');
  const [tooltipIcon, setTooltipIcon] = React.useState('');
  // получаем информацию с сервера о фильмах и пользователе
  React.useEffect(() => {
    checkToken();
  }, [isLoggin]);
  React.useEffect(() => {
    if (isLoggin) {
      setIsLoading(true);
      console.log(123);
      Promise.all([api.getUserInfo(), api.getSavedMovies(), movieApi.getMovies()])
        .then(([userData, saveMoviesData, moviesData]) => {
          setCurrentUser(userData);
          setSavedMovies(saveMoviesData);
          setMovies(moviesData);
        })
        .catch(err => console.log(err))
        .finally(setIsLoading(false));
    }
  }, [isLoggin]);
  // управлением состоянием открытия\закрытия мобильного меню
  const handleMobileMenu = () => {
    setIsOpenMobileMenu(!isOpenMobileMenu);
  };
  // ==================================================
  function handleUpdateUser(data) {
    console.log(data);
    api
      .uppdateUser(data)
      .then(res => {
        setCurrentUser(res);
      })
      .catch(err => console.log(err));
  }
  // ======================================================
  function onRegisterSuccess(text) {
    setTooltipNoticeText(text);
    setTooltipIcon('success');
    setOpenIsInfoTooltipPopup(true);
  }
  function onRegisterError() {
    setTooltipNoticeText('Что-то пошло не так! Попробуйте еще раз.');
    setTooltipIcon('error');
    setOpenIsInfoTooltipPopup(true);
  }
  function closePopups() {
    setOpenIsInfoTooltipPopup(false);
  }
  // =======Поставка и снятие лайка===============================================
  const handleLikeMovie = (movie, isLiked, savedMovie) => {
    if (isLiked) {
      handleMovieDelete(savedMovie._id);
    } else {
      console.log(movie);
      api
        .saveMovie(movie)
        .then(res => {
          setSavedMovies([...savedMovies, res]);
          localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
        })
        .catch(error => console.log(error));
    }
  };
  function handleMovieDelete(id) {
    const findSavedFilm = JSON.parse(localStorage.getItem('findSavedFilm'));
    api.deleteMovie(id).then(() => {
      setSavedMovies(savedMovies.filter(currentMovie => currentMovie._id !== id));
    });
    const updatedSavedMovies = savedMovies.filter(movie => movie._id !== id);
    setSavedMovies(updatedSavedMovies);
    if (findSavedFilm) {
      const newFindSavedFilm = findSavedFilm.filter(movie => movie._id !== id);
      localStorage.setItem('findSavedFilm', JSON.stringify(newFindSavedFilm));
    }
  }

  // =======Авторизация, регистрация, выход=============================================
  const hanleRegistration = (name, password, email) => {
    setIsLoading(true);
    authApi
      .register(name, password, email)
      .then(() => {
        handleLogin(email, password);
        onRegisterSuccess('Все прошло успешно');
        navigate('/movies');
      })
      .catch(err => {
        onRegisterError();
        console.log(err);
      })
      .finally(setIsLoading(false));
  };
  const handleLogin = (email, password) => {
    setIsLoading(true);
    console.log(email, password);
    authApi
      .login(email, password)
      .then(res => {
        console.log(res);
        localStorage.setItem('jwt', res.token);
        localStorage.setItem('isLoggin', true);
        setIsLoggin(true);
        onRegisterSuccess('Все прошло успешно');
        navigate('/movies');
      })
      .catch(err => {
        onRegisterError();
        console.log(err);
      })
      .finally(setIsLoading(false));
  };
  function checkToken() {
    setIsLoading(true);
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setIsLoggin(true);
      setIsLoading(false);
    } else setIsLoading(false);
  }

  function signOut() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('paramSearchSavedFilm');
    localStorage.removeItem('findMoviesLS');
    localStorage.removeItem('paramSearch');
    localStorage.removeItem('savedMovies');
    localStorage.setItem('isLoggin', false);
    setIsLoggin(false);
  }

  return (
    <>
      {isLoading ? (
        <Preloader />
      ) : (
        <CurrentUserContext.Provider value={currentUser}>
          <div>
            <Routes>
              <Route path='/' element={<Landing onMobileMenu={handleMobileMenu} isOpen={isOpenMobileMenu} isLoggin={isLoggin} />} />
              <Route
                path='/signin'
                element={
                  isLoggin ? (
                    <Navigate to='/' replace />
                  ) : (
                    <Login onMobileMenu={handleMobileMenu} isOpen={isOpenMobileMenu} isLoggin={isLoggin} onLogin={handleLogin} />
                  )
                }
              />
              <Route
                path='/signup'
                element={
                  isLoggin ? (
                    <Navigate to='/' replace />
                  ) : (
                    <Registration
                      onMobileMenu={handleMobileMenu}
                      isOpen={isOpenMobileMenu}
                      isLoggin={isLoggin}
                      onRegister={hanleRegistration}
                    />
                  )
                }
              />
              <Route
                path='/profile'
                element={
                  <ProtectedRoute
                    element={Profile}
                    isLoggin={isLoggin}
                    onMobileMenu={handleMobileMenu}
                    isOpen={isOpenMobileMenu}
                    signOut={signOut}
                    onUpdateUser={handleUpdateUser}
                  />
                }
              />
              <Route
                path='/movies'
                element={
                  <ProtectedRoute
                    element={Movies}
                    setIsLoading={setIsLoading}
                    isLoading={isLoading}
                    onMobileMenu={handleMobileMenu}
                    isOpen={isOpenMobileMenu}
                    isLoggin={isLoggin}
                    onLikeMovie={handleLikeMovie}
                    movies={movies}
                    savedMovies={savedMovies}
                    onDeleteMovie={handleMovieDelete}
                  />
                }
              />
              <Route
                path='/saved-movies'
                element={
                  <ProtectedRoute
                    element={SavedMovie}
                    setIsLoading={setIsLoading}
                    isLoading={isLoading}
                    onMobileMenu={handleMobileMenu}
                    isOpen={isOpenMobileMenu}
                    isLoggin={isLoggin}
                    savedMovies={savedMovies}
                    onDeleteMovie={handleMovieDelete}
                  />
                }
              />
              <Route path='*' element={<NotFound />} />
            </Routes>
            <MobileMenu isOpen={isOpenMobileMenu}></MobileMenu>
            <InfoTooltip
              noticeText={tooltipNoticeText}
              tooltipIcon={tooltipIcon}
              isOpen={isOpenInfoTooltipPopup}
              onclosePopup={closePopups}
            />
          </div>
        </CurrentUserContext.Provider>
      )}
    </>
  );
}

export default App;
