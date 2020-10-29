import './App.css';
import React, { useState } from 'react';
import { Switch, BrowserRouter, Route, Link } from 'react-router-dom';
import Home from './pages/Home.js';
import NewUser from './pages/NewUser.js';
import Footer from './components/Footer.js';
import Header from './components/Header.js';
import ShowPerson from './pages/student/showPerson.js';
import EditUser from './pages/EditUser.js';
import Error from './pages/Error.js';
import GetAllUsers from './pages/GetAllUsers.js';
import ShowProfile from './pages/ShowProfile.js';
import LogInfo from './components/LogInfo.js';
import Dum from './components/Dum.js';
import LogIn from './components/LogIn';

const App = () => {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [id, setNewId] = useState('');
  const [dum, setNewdum] = useState('');

  const changePropsVar = (newDum) => {
    setNewdum(newDum);
  };

  const handleChangePass = (event) => {
    const { value } = event.currentTarget;
    setNewPassword(value);
  };
  const handleChangeEmail = (event) => {
    const { value } = event.currentTarget;
    setEmail(value);
  };
  const handleChangeName = (event) => {
    const { value } = event.currentTarget;
    setNewName(value);
  };

  const logOut = async (event) => {
    console.log('User has logged out!');
    setToken('');
    setNewId('');
  };

  const handleLogIn = async (ttoken, idd, emaill) => {
    setToken(ttoken);
    setNewId(idd);
    setEmail(emaill);
  };

  return (
    <>
      <div>
        <BrowserRouter>
          <Header token={token} id={id} />
          {token !== '' ? (
            <Link to="/">
              <button onClick={logOut}>Log Out</button>
            </Link>
          ) : (
            <LogIn handleLogIn={handleLogIn} />
          )}
          {token === '' ? (
            <Link to="/newUser">
              <button>Sign Up</button>
            </Link>
          ) : null}
          <LogInfo token={token} email={email} />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/users" component={GetAllUsers} />
            <Route path="/newUser" component={NewUser} />
            <Route
              path="/user/:id"
              render={() => <ShowPerson token={token} />}
            />
            <Route
              path="/profile/:id"
              render={() => <ShowProfile token={token} email={email} />}
            />
            <Route
              path="/edit/:id"
              render={() => <EditUser token={token} email={email} />}
            />
            <Route path="/*" component={Error} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    </>
  );
};

export default App;
