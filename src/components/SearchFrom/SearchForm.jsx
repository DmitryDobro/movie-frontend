import iconSearch from '../../img/iconSearch.svg';
import Tumb from '../Tumb/Tumb';
function SearchForm() {
  return (
    <section className='search-form'>
      <form className='search-form__container'>
        <div className='search-form__input-container'>
          <input placeholder='Фильм' type='text' className='search-form__input' />
          <button className='btn search-form__btn'>
            <img src={iconSearch} className='search-form__icon' alt='Иконка поиска' />
          </button>
        </div>
        <div className='search-form__tumb-container'>
          <Tumb />
          <label className='search-form__label-tumb'>Короткометражки</label>
        </div>
      </form>
    </section>
  );
}
export default SearchForm;
