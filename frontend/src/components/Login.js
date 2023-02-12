import { useState } from 'react';

function Login(props) {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    props.handleLoginSubmit(password,mail);
  }

  function handleChangeMail(e) {
      setMail(e.target.value);
  }

  function handleChangePassword(e) {
      setPassword(e.target.value);
  }

  return (
    <section className="login">
      <form className="form" onSubmit={handleSubmit} noValidate>
        <h2 className="form__header">Вход</h2>
        <input type="email"
          className="form__input form__input_login-mail"
          placeholder="E-mail"
          value={mail || ''}
          onChange={handleChangeMail}
        />
        <input type="password"
          className="form__input form__input_login-password"
          placeholder="Пароль"
          value={password || ''}
          onChange={handleChangePassword}
        />
        <button className="form__submit form__submit-login" type="submit">Войти</button>
      </form>
    </section>
  )
}
export default Login;