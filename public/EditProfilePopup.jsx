import React from 'react';
import PopupWithForm from './PopupWithForm.jsx';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

export function EditProfilePopup(props) {
  const currentUserContext = React.useContext(CurrentUserContext);
  const [valueName, setValueName] = React.useState('');
  const [valueDescription, setValueDescription] = React.useState('');

  React.useEffect(() => {
    setValueName(currentUserContext.name);
    setValueDescription(currentUserContext.about);
  }, [currentUserContext, props.isOpen]);

  const handleChangeValueName = e => setValueName(e.target.value);
  const handleChangeValueDescription = e => setValueDescription(e.target.value);

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: valueName,
      about: valueDescription,
    });
  }
  return (
    <PopupWithForm
      name="edit-block"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onclosePopup={props.onclosePopup}
      onSubmit={handleSubmit}>
      <label className="popup__field">
        <input
          value={valueName || ''}
          onChange={handleChangeValueName}
          type="text"
          className="popup__input input"
          id="inputName"
          autoComplete="off"
          required
          minLength="2"
          maxLength="30"
          name="name"
          placeholder="Название"
        />
        <span className="popup__input-error inputPlaceName-error"></span>
      </label>
      <label className="popup__field">
        <input
          value={valueDescription || ''}
          onChange={handleChangeValueDescription}
          placeholder="Профессия"
          type="text"
          className="popup__input input"
          id="inputJob"
          autoComplete="off"
          name="about"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="popup__input-error inputJob-error"></span>
      </label>
    </PopupWithForm>
  );
}
