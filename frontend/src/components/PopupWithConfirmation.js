import PopupWithForm from './PopupWithForm';

function PopupWithConfirmation(props) {

  function handleSubmit(e) {
    e.preventDefault();
    props.onDelete(props.deletedCardId);
  };
  
  return (
    <PopupWithForm
      name="delete-card"
      title="Вы уверены?"
      buttonText="Да"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  )
}

export default PopupWithConfirmation;