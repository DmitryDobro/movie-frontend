import Header from '../Header/Header.jsx';
import {Link} from 'react-router-dom';
function Profile({onMobileMenu, isOpen, isLoggin}) {
  const colorHeader = 'white';
  return (
    <>
      <Header color={colorHeader} onMobileMenu={onMobileMenu} isOpen={isOpen} isLoggin={isLoggin} />
      <section className='profile'>
        <h1 className='profile__message'>Привет, Виталий!</h1>

        <div className='profile__form'>
          <form className='profile__form-container'>
          <div className='profile__field'>
              <label htmlFor='password' className='profile__label'>
                Имя
              </label>
              <input id='hidenPassword' placeholder='Виталий' type='text' className='profile__input' required/>
            </div>
            <div className='profile__field'>
              <label htmlFor='email' className='profile__label'>
                E-mail
              </label>
              <input id='email' placeholder='pochta@yandex.ru' type='email' className='profile__input' required/>
            </div>
          </form>
          <div className='profile__links'>
            <p className='profile__edit-link'>Редактировать</p>
            <Link to='/' className='profile__signout-link'>
              Выйти из аккаунта
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
