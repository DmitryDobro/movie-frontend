import iconSearch from '../../img/iconSearch.svg';
import Tumb from '../Tumb/Tumb';
import {useState} from 'react';
import React from 'react';
function SearchForm({onFilterMovie, param, setIsLoadingMovie}) {
  const [searchValueParams, setSearchValueParams] = useState({
    text: '',
    checkedShortFilm: false,
  });
  const [searchValueText, setSearchValueText] = useState('');
  const [checkedShortFilm, setCheckedShortFilm] = useState('');
  const [errText, setErrText] = useState('');
  React.useEffect(() => {
    if (param) {
      setSearchValueText(param.text || '');
      setCheckedShortFilm(param.checkedShortFilm);
    }
  }, [param]);
  const handleChangeText = evt => {
    setSearchValueText(evt.target.value);
  };
  const handleChangeCheckbox = evt => {
    setCheckedShortFilm(evt.target.checked);
    onFilterMovie({
      ...searchValueParams,
      text: searchValueText,
      checkedShortFilm: evt.target.checked,
    });
  };

  function onSubmitFilter(evt) {
    evt.preventDefault();
    setIsLoadingMovie(true);
    if (!searchValueText) {
      setErrText('Введите ключевое слово');
      setIsLoadingMovie(false);
    } else {
      onFilterMovie({
        ...searchValueParams,
        text: searchValueText,
        checkedShortFilm: checkedShortFilm,
      });
      setErrText('');
      // имтация задержки, чтобы крутился прелоадер
      setTimeout(() => {
        setIsLoadingMovie(false);
      }, 100);
    }
  }
  return (
    <section className='search-form'>
      <form className='search-form__container' onSubmit={onSubmitFilter}>
        <div className='search-form__input-container'>
          <input
            placeholder='Фильм'
            type='text'
            name='text'
            value={searchValueText}
            className='search-form__input'
            onChange={handleChangeText}
          />
          <span className={`search-form__input-error`}>{!searchValueText && errText}</span>
          <button className='btn search-form__btn'>
            <img src={iconSearch} className='search-form__icon' alt='Иконка поиска' />
          </button>
        </div>
        <div className='search-form__tumb-container'>
          <Tumb onChange={handleChangeCheckbox} checked={checkedShortFilm} />
          <label className='search-form__label-tumb'>Короткометражки</label>
        </div>
      </form>
    </section>
  );
}
export default SearchForm;
