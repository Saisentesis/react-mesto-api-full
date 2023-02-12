function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_type_photo-form`+ (card ? " popup_opened" : "")}>
    <div className="popup__container popup__container_type_photo-container">
      <button className="popup__close-button" type="button" aria-label="закрыть окно с увеличенным фото" onClick={onClose}></button>
      {card && ( <>
      <img className="popup__image" src={card.link} alt={card.name} />
      <p className="popup__caption">{card.name}</p>
      </>
      )}
    </div>
  </div>
  )
}

export default ImagePopup;