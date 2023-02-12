import { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Login from './Login';
import Register from './Register';
import Footer from './Footer';
import PopupEditAvatar from './PopupEditAvatar';
import PopupAddCard from './PopupAddCard';
import PopupEditProfile from './PopupEditProfile';
import PopupWithConfirmation from './PopupWithConfirmation';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import Api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import ProtectedRoute from './ProtectedRoute';

function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isConfimationPopupOpen, setConfimationPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deletedCardId, setDeletedCardId] = useState(null);
  const [loggedIn, setloggedIn] = useState(false);
  const [mail, setMail] = useState('');
  const [authorizationError, setAuthorizationError] = useState(false);
  
  useEffect(() => {
    if (loggedIn) {
      Api.getUserInfo()
        .then((user) => setCurrentUser(user))
        .catch((err) => console.error(err.message));
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      Api.getInitialCards()
        .then((cards) => setCards(cards))
        .catch((err) => console.error(err.message));
    }
  }, [loggedIn]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      Api.checkToken(token)
        .then((res) => {
          setloggedIn(true);
          history.push('/');
        })
        .catch((err) => console.error(err.message));
    }
  }, [history]);

  function handleLoginSubmit(password, mail) {
    Api.signIn(password,mail)
    .then((res)=> {
      setloggedIn(true);
      setMail(mail);
      localStorage.setItem('token', res.token);
      Api.setToken(res.token);
      history.push('/');
    })
    .catch((err) => {
      setAuthorizationError(true);
      setInfoTooltipPopupOpen(true);
    })
  }

  function handleRegistorSubmit(password, mail) {
    Api.signUp(password, mail)
      .then((res) => {
        setAuthorizationError(false);
        setInfoTooltipPopupOpen(true);
        history.push('/sign-in');
      })
      .catch((err) => {
        setAuthorizationError(true);
        setInfoTooltipPopupOpen(true);
      });
  }

  function signOut() {
    setloggedIn(false);
    localStorage.removeItem('token');
    history.push('/sign-in');
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    Api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.error(err.message));
  }

  function handleCardDelete(id) {
    Api.deleteCard(id)
      .then(() => {
        setCards(cards.filter((card) => card._id !== id));
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err.message);
        closeAllPopups();
      });
  }

  function handleDeleteConfirm(id) {
    setConfimationPopupOpen(true);
    setDeletedCardId(id);
  }

  function handleUpdateAvatar(link) {
    Api.setUserAvatar(link)
      .then((user) => { setCurrentUser(user); closeAllPopups() })
      .catch((err) => console.error(err.message));
  }

  function handleUpdateUser(currentUser) {
    Api.setUserInfo(currentUser)
      .then((user) => { setCurrentUser(user); closeAllPopups() })
      .catch((err) => console.error(err.message));
  }

  function handleAddPlaceSubmit(item) {
    Api.addCard(item)
      .then((newCard) => { setCards([newCard, ...cards]); closeAllPopups() })
      .catch((err) => console.error(err.message));
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfimationPopupOpen(false);
    setInfoTooltipPopupOpen(false)
    setSelectedCard(null);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        signOut={signOut}
        mail={mail}
      />
      <Switch>
        <ProtectedRoute
          exact path="/"
          loggedIn={loggedIn}
          component={Main}
          onEditProfile={() => setEditProfilePopupOpen(true)}
          onAddPlace={() => setAddPlacePopupOpen(true)}
          onEditAvatar={() => setEditAvatarPopupOpen(true)}
          onCardClick={(card) => setSelectedCard(card)}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteConfirm}
          cards={cards}
        />
        <Route path="/sign-up">
          <Register
            handleRegistorSubmit={handleRegistorSubmit}
          />
        </Route>
        <Route path="/sign-in">
          <Login
            handleLoginSubmit={handleLoginSubmit}
          />
        </Route>
        <Route path="*">
          <Redirect to="/sign-in" />
        </Route>
      </Switch>

      <PopupEditAvatar
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <PopupEditProfile
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <PopupAddCard
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
      <PopupWithConfirmation
        isOpen={isConfimationPopupOpen}
        onDelete={handleCardDelete}
        onClose={closeAllPopups}
        deletedCardId={deletedCardId}
      />
      <InfoTooltip
        isOpen={isInfoTooltipPopupOpen}
        onClose={closeAllPopups}
        authorizationError={authorizationError}
      />
      {loggedIn && <Footer />}
    </CurrentUserContext.Provider>
  );
}

export default App;
