import React from 'react';
import iconDelete from '../../../img/iconDelete.svg';
function MovieCard({img, name, duration, isSaved}) {
  const [isLiked, setIsLiked] = React.useState(false);
  const handleLike = () => {
    setIsLiked(!isLiked);
  };
  return (
    <section className='movie-card'>
      <img className='movie-card__image' src={img} alt={`Постер фильма ${name}`} />
      <div className='movie-card__content'>
        <div className='movie-card__info'>
          <p className='movie-card__name'>{name}</p>
          <p className='movie-card__duration'>{duration}</p>
        </div>
        {!isSaved && (
          <button onClick={handleLike} className={`btn movie-card__like-btn ${isLiked && 'movie-card__like-btn_type_active'}`}></button>
        )}
        {isSaved && (
          <button className='btn movie-card__delete-btn'>
            <img src={iconDelete} alt='Иконка-крестик' />
          </button>
        )}
      </div>
    </section>
  );
}

export default MovieCard;
