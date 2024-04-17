import React from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import PopupWithForm from './PopupWithForm.jsx';
import {EditProfilePopup} from './EditProfilePopup.jsx';
import {EditAvatarPopup} from './EditAvatarPopup.jsx';
import {AddPlacePopup} from './AddPlacePopup.jsx';
import ImagePopup from './ImagePopup.jsx';
import {api} from '../utils/Api.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import {CardsContext} from '../contexts/CardsContext.js';
import Login from './Login.jsx';
import Register from './Register.jsx';
import InfoTooltip from './InfoTooltip.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

import * as auth from '../utils/auth.js';
function App() {
  const LoggedInFromLlocalStorage = JSON.parse(localStorage.getItem('loggedIn'));
  // состояния для открытия попапов
  const [isOpenEditProfile, setIsOpenEditProfile] = React.useState(false);
  const [isOpenAddPlace, setIsOpenAddPlace] = React.useState(false);
  const [isOpenEditAvatar, setIsOpenEditAvatar] = React.useState(false);
  // состояния для модального окна с успешной/неуспешной регистрацией
  const [isOpenInfoTooltipPopup, setOpenIsInfoTooltipPopup] = React.useState(false);
  const [tooltipNoticeText, setTooltipNoticeText] = React.useState('');
  const [tooltipIcon, setTooltipIcon] = React.useState('');
  // стейты пользователя, карточек
  const [selectedCard, setSelectedCard] = React.useState({
    isOpen: false,
    name: '',
    link: '',
  });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [email, setEmail] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(LoggedInFromLlocalStorage);
  const navigate = useNavigate();
  //получаем информация о пользователе и массив карточек
  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getCards()])
        .then(([userData, cardsData]) => {
         console.log(cardsData);
          setCurrentUser(userData);
          setCards(cardsData);
        })
        .catch(err => console.log(err));
    }
  }, []);
  // проверяем на наличие токена
  React.useEffect(() => {
    checkToken();
  }, []);

  // функции открытия попапов
  const handleEditProfileClick = () => setIsOpenEditProfile(true);
  const handleEditAvatarClick = () => setIsOpenEditAvatar(true);
  const handleAddPlaceClick = () => setIsOpenAddPlace(true);
  const handleCardClick = evt => {
    setSelectedCard({
      ...selectedCard,
      isOpen: true,
      name: evt.target.alt,
      link: evt.target.src,
    });
  };
  // функция закрытия попапов
  function closeAllPopups() {
    setIsOpenEditProfile(false);
    setIsOpenEditAvatar(false);
    setIsOpenAddPlace(false);
    setOpenIsInfoTooltipPopup(false);
    setSelectedCard({
      ...selectedCard,
      isOpen: false,
    });
  }

  // снять или поставить лайк
  function handleCardLike(likes, cardId) {
    //  Проверяем, есть ли уже лайк на этой карточке
    const isLiked = likes.some(like => {
      return like._id === currentUser._id;
    });
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(cardId, isLiked)
      .then(newCard => {
        setCards(state => state.map(currentCard => (currentCard._id === cardId ? newCard : currentCard)));
      })
      .catch(err => console.log(err));
  }
  // удалить карточку
  function handleCardDelete(cardId) {
    api.deleteCard(cardId).then(() => {
      setCards(state => state.filter(currentCard => currentCard._id !== cardId));
    });
  }
  // функции добавления карточки, редактировании информации о пользователе
  function handleUpdateUser(data) {
    api
      .setUserInfoApi(data)
      .then(res => {
        setCurrentUser(res);
      })
      .catch(err => console.log(err));
    closeAllPopups();
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data)
      .then(res => {
        console.log(res);
        setCurrentUser(res);
      })
      .catch(err => console.log(err));
    closeAllPopups();
  }

  function handleUpdateCards(data) {
    api
      .addNewCard(data)
      .then(res => {
        console.log(cards)
        setCards([res, ...cards]);
      })
      .catch(err => console.log(err));
    closeAllPopups();
  }

  function onRegisterSuccess() {
    setTooltipNoticeText('Вы успешно зарегистрировались!');
    setTooltipIcon('success');
    setOpenIsInfoTooltipPopup(true);
  }
  function onRegisterError() {
    setTooltipNoticeText('Что-то пошло не так! Попробуйте еще раз.');
    setTooltipIcon('error');
    setOpenIsInfoTooltipPopup(true);
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .getDataUser(jwt)
        .then(res => {
          setLoggedIn(true);
          console.log(res);
          setEmail(res.data.email);
          navigate('/');
        })
        .catch(err => console.log(err));
    }
  }
  // функции аутентификация и регистрации
  function handleLogin(password, email) {
    auth
      .authorize(password, email)
      .then(res => {
        localStorage.setItem('jwt', res.token);
        localStorage.setItem('loggedIn', true);
        setLoggedIn(true);
        setEmail(email);
        navigate('/');
        console.log(email);
      })
      .catch(err => {
        onRegisterError();
        console.log(err);
      });
  }

  function handleRegister(password, email) {
    console.log(1);
    auth
      .register(password, email)
      .then(res => {
        console.log(res);
        navigate('/sign-in');
        onRegisterSuccess();
      })
      .catch(err => {
        onRegisterError();
        console.log(err);
      });
  }
  // выход из аакаунта
  function signOut() {
    localStorage.removeItem('jwt');
    localStorage.setItem('loggedIn', false);
    setLoggedIn(false);
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={cards}>
        <div>
          <Header email={email} signOut={signOut} loggedIn={loggedIn} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  loggedIn={loggedIn}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onImagePopup={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              }></Route>
            <Route>
              <Route path="/sign-in" element={<Login onLogin={handleLogin} setEmail={setEmail} />} />
            </Route>
            <Route path="/sign-up" element={<Register onRegister={handleRegister} />}></Route>
          </Routes>
          {loggedIn && <Footer />}
          <PopupWithForm name="delete-block" title="Вы уверенны?" closePopup={closeAllPopups}></PopupWithForm>
          {/* ---------------------------------------------- */}
          <EditProfilePopup isOpen={isOpenEditProfile} onclosePopup={closeAllPopups} onUpdateUser={handleUpdateUser}></EditProfilePopup>
          {/* --------------------------------- */}
          <EditAvatarPopup isOpen={isOpenEditAvatar} onclosePopup={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}></EditAvatarPopup>
          {/* ------------------------------------- */}
          <AddPlacePopup isOpen={isOpenAddPlace} onclosePopup={closeAllPopups} onUpdateCards={handleUpdateCards}></AddPlacePopup>
          {/* ------------------------------------------------------- */}
          <ImagePopup isOpen={selectedCard.isOpen} onclosePopup={closeAllPopups} name={selectedCard.name} link={selectedCard.link} />
          <InfoTooltip
            noticeText={tooltipNoticeText}
            tooltipIcon={tooltipIcon}
            isOpen={isOpenInfoTooltipPopup}
            onclosePopup={closeAllPopups}
          />
        </div>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
