import logo from '../../img/logo.svg';
import {Link} from 'react-router-dom';
function Login() {
  return (
    <section className='login'>
      <Link to='/' className='login__link'>
        <img src={logo} className='login__logo' alt='Лого' />
      </Link>
      <h1 className='login__message'>Рады видеть!</h1>
      <div className='login__form'>
        <div className='login__form-container'>
          <div className='login__field'>
            <label htmlFor='email' className='login__label'>
              E-mail
            </label>
            <input id='email' placeholder='pochta@yandex.ru' type='email' className='login__input' />
          </div>
          <div className='login__field'>
            <label htmlFor='password' className='login__label'>
              Пароль
            </label>
            <input id='hidenPassword' placeholder='****' type='password' className='login__input' />
          </div>
          <button className='btn login__submit'>Войти</button>
        </div>
        <div className='login__registration'>
          <p className='login__registration-text'>Ещё не зарегистрированы?</p>
          <Link to='/signup' className='login__registration-link'>
            Регистрация
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Login;
