import React from 'react';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import {CardsContext} from '../contexts/CardsContext.js';

function Main(props) {
  // задаем значение состояний
  const currentUser = React.useContext(CurrentUserContext);
  const cardsContext = React.useContext(CardsContext);

  return (
    <main className="main">
      <section className="profile">
        <div onClick={props.onEditAvatar} className="profile__block-avatar">
          <img src={currentUser.avatar} alt="Фото человека" className="profile__avatar" />
          <div className="profile__edit-profile"></div>
        </div>

        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button onClick={props.onEditProfile} className="profile__btn profile__btn_type_edit btn" type="button"></button>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button onClick={props.onAddPlace} className="profile__btn profile__btn_type_add btn" type="button"></button>
      </section>
      <section className="cards">
        {cardsContext.map(card => (
          <Card
            key={card._id}
            cardId={card._id}
            link={card.link}
            name={card.name}
            likes={card.likes}
            cardOwner={card.owner}
            onImagePopup={props.onImagePopup}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
