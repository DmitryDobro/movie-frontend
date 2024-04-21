import logo from '../../img/logo.svg';
import {Link} from 'react-router-dom';
import React from 'react';
import {validateEmail, validatePassword} from '../../utils/validation.js';

function Login({onLogin}) {
  // состояние, чтобы пропадало сообщение об ошибке
  const [isShowErrorEmail, setIsShowErrorEmail] = React.useState(false);
  const [isShowErrorPassword, setIsShowErrorPassword] = React.useState(false);
  // информация с инпутов
  const [valuePassword, setValuePassword] = React.useState('');
  const [valueEmail, setValueEmail] = React.useState('');

  const handleChangeValueEmail = e => {
    setValueEmail(e.target.value);
    setIsShowErrorEmail(true);
  };
  const handleChangeValuePassword = e => {
    setValuePassword(e.target.value);
    setIsShowErrorPassword(true);
  };
  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin(valueEmail, valuePassword);
  }

  return (
    <section className='login'>
      <Link to='/' className='login__link'>
        <img src={logo} className='login__logo' alt='Лого' />
      </Link>
      <h1 className='login__message'>Рады видеть!</h1>
      <form className='login__form' onSubmit={handleSubmit}>
        <div className='login__form-container'>
          <div className='login__field'>
            <label htmlFor='email' className='login__label'>
              E-mail
            </label>
            <input
              id='email'
              placeholder='pochta@yandex.ru'
              type='email'
              name='email'
              className='login__input'
              onChange={handleChangeValueEmail}
            />
            <span className={`login__input-error`}>{isShowErrorEmail && validateEmail(valueEmail).message}</span>
          </div>
          <div className='login__field'>
            <label htmlFor='password' className='login__label'>
              Пароль
            </label>
            <input
              id='hidenPassword'
              placeholder='****'
              type='password'
              name='password'
              className='login__input'
              required
              onChange={handleChangeValuePassword}
            />
            <span className={`login__input-error`}>{isShowErrorPassword && validatePassword(valuePassword).message}</span>
          </div>
          <button className='btn login__submit' disabled={validatePassword(valuePassword).message || validateEmail(valueEmail).message}>
            Войти
          </button>
        </div>
        <div className='login__registration'>
          <p className='login__registration-text'>Ещё не зарегистрированы?</p>
          <Link to='/signup' className='login__registration-link'>
            Регистрация
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Login;
