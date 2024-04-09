import { NavLink } from "react-router-dom";
function MobileMenu(props) {
  return (
    <section className={`mobile-menu ${props.isOpen && 'mobile-menu_type_active'}`}>
      <div className='mobile-menu__nav'>
        <NavLink className='mobile-menu__link' to='/'>
          Главное меню
        </NavLink>
        <NavLink className='mobile-menu__link' to='/movies'>
          Фильмы
        </NavLink>
        <NavLink className='mobile-menu__link' to='/saved-movies'>
          Сохраненные фильмы
        </NavLink>
      </div>
      <NavLink className='mobile-menu__profile-link' to='/profile'>Аккаунт</NavLink>
    </section>
  );
}
export default MobileMenu;
