import logo from '../../img/logo.svg';
import {Link} from 'react-router-dom';
function Header({isLoggin, color, isOpen, onMobileMenu}) {
  console.log(isLoggin);
  return (
    <header className={`header ${color && 'header_color_' + color}`}>
      <Link className='header__logo' to='/'>
        <img src={logo} alt='Логотип' />
      </Link>
      {isLoggin ? (
        <>
          <div className='header__nav'>
            <Link className='header__nav-link' to='/movies'>
              Фильмы
            </Link>
            <Link className='header__nav-link' to='/saved-movies'>
              Сохраненные фильмы
            </Link>
          </div>
          <Link to='/profile' className='btn header__profile-btn'>
            Аккаунт
          </Link>
        </>
      ) : (
        <div className='header__links'>
          <Link to='/signup' className='btn header__link-signup'>Регистрация</Link>
          <Link to='/signin' className='btn header__link-signin'>Войти</Link>
        </div>
      )}
      <div className={`header__burger ${isOpen && 'header__burger_type_active'}`} id='burgerHeader' onClick={onMobileMenu}>
        <span></span>
      </div>
    </header>
  );
}
export default Header;
