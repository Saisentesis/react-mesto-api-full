import { Link } from 'react-router-dom';
import { useState } from 'react';

function Register(props) {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    props.handleRegistorSubmit(password,mail);
  }

  function handleChangeMail(e) {
    setMail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <section className="register">
      <form className="form" onSubmit={handleSubmit} noValidate>
        <h2 className="form__header">Регистрация</h2>
        <input type="email"
          className="form__input form__input_register-mail"
          placeholder="E-mail"
          value={mail || ''}
          onChange={handleChangeMail}
        />
        <input type="password"
          className="form__input form__input_register-password"
          placeholder="Пароль"
          value={password || ''}
          onChange={handleChangePassword}
        />
        <button className="form__submit form__submit-register" type="submit">Зарегистрироваться</button>
      </form>
      <p className="register__text">Уже зарегистрированы? <Link to="/sign-in" className="register__link">Войти</Link></p>
    </section>
  )
}

export default Register;