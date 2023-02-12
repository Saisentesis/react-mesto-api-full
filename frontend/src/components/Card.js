import CurrentUserContext from '../contexts/CurrentUserContext';
import { useContext } from 'react';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwner = (currentUser._id === card.owner._id);
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  return (
    <div className="element">
      {isOwner && (<button className="element__trash" type="button" aria-label="кнопка удалить" onClick={() => onCardDelete(card._id)}></button>)}
      <button className="element__photo-button" type="button" onClick={() => onCardClick(card)}> <img className="element__image" src={card.link} alt={card.name} /></button>
      <div className="element__caption">
        <p className="element__text">{card.name}</p>
        <div className="element__like-area">
          <button className={`element__heart` + (isLiked ? ` element__heart_active` : ``)} type="button" aria-label="кнопка лайк" onClick={() => onCardLike(card)}></button>
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
    </div>
  )
}

export default Card;