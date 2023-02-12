import logoPath from '../images/logo.svg'
import { Switch, Route, Link } from 'react-router-dom';
import { useState } from 'react';

function Header(props) {
  const [isClicked, setIsClicked] = useState(false);
  
  function handleChangeCheckboxValue(e) {
    setIsClicked(e.target.checked);
  }
  function handleSignOut() {
    setIsClicked(false);
    props.signOut();
  }

  return (
    <header className="header">
      <div className={`header__info-mobile` + (isClicked ? " header__info-mobile_open" : "")}>
        <p className="header__mail">{props.mail}</p>
        <Link to="/sign-in" className="header__button-mobile" onClick={handleSignOut}>Выйти</Link>
      </div>
      <div className="header__container">
        <img className="header__logo" src={logoPath} alt="логотип место" />
        <Switch>
          <Route exact path="/sign-in">
            <Link to="/sign-up" className="header__button">Регистрация</Link>
          </Route>
          <Route exact path="/sign-up">
            <Link to="/sign-in" className="header__button">Войти</Link>
          </Route>
          <Route exact path="/">
            <div className="header__info">
              <p className="header__mail">{props.mail}</p>
              <Link to="/sign-in" className="header__button" onClick={handleSignOut}>Выйти</Link>
            </div>
            <input
              id="header__checkbox"
              className="header__checkbox"
              type="checkbox"
              value={isClicked}
              onChange={handleChangeCheckboxValue}
            />
            <label className="header__label" htmlFor="header__checkbox">
              <span></span>
              <span></span>
              <span></span>
            </label>
          </Route>
        </Switch>
      </div>

    </header>
  )
}

export default Header;