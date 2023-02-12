import PopupWithForm from './PopupWithForm';
import { useState, useEffect } from 'react';

function PopupAddCard(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]); 

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onAddPlace({
      name,
      link
    });
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      name = "add-form"
      title = "Новое место"
      buttonText = "Создать"
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onSubmit = {handleSubmit}
    >  
    <input type="text"
      className="popup__input popup__input_info_place"
      id="place-input"
      placeholder="Название"
      name="name"
      value={name || ''}
      onChange={handleChangeName}
      minLength="2"
      maxLength="30"
      required
      />
    <span className="popup__input-error" id="place-input-error"></span>
    <input type="url"
      className="popup__input popup__input_info_link"
      id="link-input"
      placeholder="Ссылка на картинку"
      name="link"
      value={link || ''}
      onChange={handleChangeLink}
      required
      />
    <span className="popup__input-error" id="link-input-error"></span>
    </PopupWithForm>
  )
}

export default PopupAddCard;