import PopupWithForm from './PopupWithForm'
import { useEffect, useRef } from 'react';

function PopupEditAvatar(props) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value='';
  },[props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
  });
  }
  
  return (
    <PopupWithForm
      name = "edit-avatar"
      title = "Обновить аватар"
      buttonText = "Сохранить"
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onSubmit = {handleSubmit}
    >  
    <input type="url"
      ref={avatarRef}
      className="popup__input"
      id="avatar-link-input"
      name="editavatarinput"
      placeholder="Ссылка"
      required
    />
    <span className="popup__input-error" id="avatar-link-input-error"></span>
    </PopupWithForm>
  )
}
export default PopupEditAvatar;