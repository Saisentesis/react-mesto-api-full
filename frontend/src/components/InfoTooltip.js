import imgOk from '../images/ok.svg';
import imgError from '../images/error.svg';

function InfoTooltip(props) {
  return(
    <div className={`popup popup_type_infoTooltip`+(props.isOpen ? " popup_opened" : "")}>
    <div className="popup__container">
      <button className="popup__close-button" type="button" aria-label="закрыть окно" onClick={props.onClose}></button>
      <img className="popup__register-img" src={props.authorizationError ? imgError : imgOk} alt="логотип" />
      <h2 className="popup__text">{props.authorizationError ? "Что-то пошло не так! Попробуйте ещё раз." : "Вы успешно зарегистрировались!"} </h2>
    </div>
  </div>
  )
}

export default InfoTooltip;