import PopupWithForm from './PopupWithForm';
import { useState, useContext, useEffect } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function PopupEditProfile(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]); 

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  
  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name = "edit-form"
      title = "Редактировать профиль"
      buttonText = "Сохранить"
      isOpen = {props.isOpen}
      onClose = {props.onClose}
      onSubmit = {handleSubmit}
    >
    <input type="text"
      className="popup__input popup__input_info_name"
      id="name-input"
      name="name"
      value={name || ''}
      onChange={handleChangeName}
      placeholder="Имя"
      minLength="2"
      maxLength="40"
      required
    />
    <span className="popup__input-error" id="name-input-error"></span>
    <input type="text"
      className="popup__input popup__input_info_job"
      id="job-input"
      name="about"
      value={description || ''}
      onChange={handleChangeDescription}
      placeholder="Занятие"
      minLength="2"
      maxLength="200"
      required
      />
    <span className="popup__input-error" id="job-input-error"></span>
    </PopupWithForm>
  )
}

export default PopupEditProfile;