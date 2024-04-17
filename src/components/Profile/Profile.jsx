import React from 'react';
import {CurrentUserContext} from '../../context/CurrentUserContext.js';
import Header from '../Header/Header.jsx';
import {Link} from 'react-router-dom';
import {validateEmail, validateName} from '../../utils/validation.js';
function Profile({onMobileMenu, isOpen, isLoggin, signOut, onUpdateUser}) {
  const colorHeader = 'white';
  const currentUser = React.useContext(CurrentUserContext);
  const [valueName, setValueName] = React.useState('');
  const [valueEmail, setValueEmail] = React.useState('');
  const [isShowBtn, setIsShowBtn] = React.useState(false);
  React.useEffect(() => {
    setValueName(currentUser.name);
    setValueEmail(currentUser.email);
  }, [currentUser]);

  const handleChangeValueName = e => {
    setIsShowBtn(true);
    setValueName(e.target.value);
  };

  const handleChangeValueEmail = e => {
    setValueEmail(e.target.value);
    setIsShowBtn(true);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name: valueName,
      email: valueEmail,
    });
    setIsShowBtn(false);
  }
  return (
    <>
      <Header color={colorHeader} onMobileMenu={onMobileMenu} isOpen={isOpen} isLoggin={isLoggin} />
      <section className='profile'>
        <h1 className='profile__message'>Привет, {currentUser.name}!</h1>
        <form className='profile__form' onSubmit={handleSubmit}>
          <div className='profile__form-container'>
            <div className='profile__field'>
              <label htmlFor='name' className='profile__label'>
                Имя
              </label>
              <input
                id='name'
                name='name'
                placeholder='Виталий'
                type='text'
                className='profile__input'
                onChange={handleChangeValueName}
                value={valueName || ''}
                autoComplete='off'
              />
              <span className={`profile__input-error`}>{validateName(valueName).message}</span>
            </div>
            <div className='profile__field'>
              <label htmlFor='email' className='profile__label'>
                E-mail
              </label>
              <input
                id='email'
                name='email'
                placeholder='pochta@yandex.ru'
                type='email'
                className='profile__input'
                value={valueEmail || ''}
                onChange={handleChangeValueEmail}
                autoComplete='off'
              />
              <span className={`profile__input-error`}>{validateEmail(valueEmail).message}</span>
            </div>
          </div>
          {isShowBtn ? (
            <button
              className='btn profile__submit-btn'
              disabled={
                (valueName === currentUser.name && valueEmail === currentUser.email) ||
                validateName(valueName).message ||
                validateEmail(valueEmail).message
              }>
              Сохранить
            </button>
          ) : (
            <div className='profile__links'>
              <button className='profile__edit-link'>Редактировать</button>
              <Link to='/' className='profile__signout-link' onClick={signOut}>
                Выйти из аккаунта
              </Link>
            </div>
          )}
        </form>
      </section>
    </>
  );
}

export default Profile;
