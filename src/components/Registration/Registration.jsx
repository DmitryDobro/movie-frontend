import logo from '../../img/logo.svg';
import {Link} from 'react-router-dom';
import React from 'react';
import {validateEmail, validatePassword, validateName} from '../../utils/validation.js';
function Registration({onRegister}) {
  const [isShowErrorEmail, setIsShowErrorEmail] = React.useState(false);
  const [isShowErrorPassword, setIsShowErrorPassword] = React.useState(false);
  const [isShowErrorName, setIsShowErrorName] = React.useState(false);

  const [valuePassword, setValuePassword] = React.useState('');
  const [valueEmail, setValueEmail] = React.useState('');
  const [valueName, setValueName] = React.useState('');

  const handleChangeValueEmail = e => {
    setValueEmail(e.target.value);
    setIsShowErrorEmail(true);
  };
  const handleChangeValuePassword = e => {
    setValuePassword(e.target.value);
    setIsShowErrorPassword(true);
  };
  const handleChangeValueName = e => {
    setValueName(e.target.value);
    setIsShowErrorName(true);
  };

  function handleSubmit(evt) {
    evt.preventDefault();
    onRegister(valueName, valuePassword, valueEmail);
  }

  return (
    <section className='registration'>
      <Link to='/' className='registration__link'>
        <img src={logo} className='registration__logo' alt='Лого' />
      </Link>
      <h1 className='registration__message'>Добро пожаловать!</h1>

      <form className='registration__form' onSubmit={handleSubmit}>
        <div className='registration__form-container'>
          <div className='registration__field'>
            <label htmlFor='name' className='registration__label'>
              Имя
            </label>
            <input
              id='name'
              placeholder='Александр'
              type='text'
              name='name'
              className='registration__input'
              required
              onChange={handleChangeValueName}
              value={valueName}
            />
            <span className={`registration__input-error`}>{isShowErrorName && validateName(valueName).message}</span>
          </div>
          <div className='registration__field'>
            <label htmlFor='email' className='registration__label'>
              E-mail
            </label>
            <input
              id='email'
              placeholder='pochta@yandex.ru'
              type='email'
              name='email'
              className='registration__input'
              required
              onChange={handleChangeValueEmail}
              value={valueEmail}
            />
            <span className={`registration__input-error`}>{isShowErrorEmail && validateEmail(valueEmail).message}</span>
          </div>
          <div className='registration__field'>
            <label htmlFor='password' className='registration__label'>
              Пароль
            </label>
            <input
              id='hidenPassword'
              placeholder='****'
              type='password'
              name='password'
              className='registration__input'
              required
              onChange={handleChangeValuePassword}
              value={valuePassword}
            />
            <span className={`registration__input-error`}>{isShowErrorPassword && validatePassword(valuePassword).message}</span>
          </div>
          <button
            className='btn registration__submit'
            disabled={validateName(valueName).message || validateEmail(valueEmail).message || validatePassword(valuePassword).message}>
            Зарегистрироваться
          </button>
        </div>
        <div className='registration__login'>
          <p className='registration__login-text'>Уже зарегистрированы?</p>
          <Link to='/signin' className='registration__login-link'>
            Войти
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Registration;
