import logo from '../../img/logo.svg';
import {Link} from 'react-router-dom';

function Registration() {
  return (
    <section className='registration'>
      <Link to='/' className='registration__link'>
        <img src={logo} className='registration__logo' alt='Лого' />
      </Link>
      <h1 className='registration__message'>Добро пожаловать!</h1>

      <div className='registration__form'>
        <div className='registration__form-container'>
          <div className='registration__field'>
            <label htmlFor='name' className='registration__label'>
              Имя
            </label>
            <input id='name' placeholder='Александр' type='text' className='registration__input' />
          </div>
          <div className='registration__field'>
            <label htmlFor='email' className='registration__label'>
              E-mail
            </label>
            <input id='email' placeholder='pochta@yandex.ru' type='email' className='registration__input' />
          </div>
          <div className='registration__field'>
            <label htmlFor='password' className='registration__label'>
              Пароль
            </label>
            <input id='hidenPassword' placeholder='****' type='password' className='registration__input' />
            <span className='registration__error'>Что-то пошло не так...</span>
          </div>
          <button className='btn registration__submit'>Зарегистрироваться</button>
        </div>
        <div className='registration__login'>
          <p className='registration__login-text'>Уже зарегистрированы?</p>
          <Link to='/signin' className='registration__login-link'>
            Войти
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Registration;
