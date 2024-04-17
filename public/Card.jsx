import React from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';

function Card({onImagePopup, onCardLike, onCardDelete, link, name, likes, cardOwner, cardId}) {
  
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = cardOwner === currentUser._id;
  const isLiked = likes.some(like => like === currentUser._id);
  const handleLikeClick = () => onCardLike(likes, cardId);
  const handleCardDelete = () => onCardDelete(cardId);
  return (
    <div className="cards__card">
      {isOwn && <button onClick={handleCardDelete} type="button" className="cards__delete btn"></button>}
      <img onClick={onImagePopup} src={link} alt={name} className="cards__photo-places" />
      <div className="cards__subscribe">
        <h2 className="cards__places-name">{name}</h2>

        <div className="cards__like-block">
          <button onClick={handleLikeClick} type="button" className={`${isLiked ? 'cards__like_active' : ''} cards__like  btn`}></button>
          <p className="cards__like-counter">{likes.length}</p>
        </div>
      </div>
    </div>
  );
}
export default Card;
