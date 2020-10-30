// import './App.css';
import React, { useState } from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Footer from './components/Footer.js';
import Header from './components/Header.js';
import ShowPerson from './pages/student/showPerson.js';
import EditUser from './pages/EditUser.js';
import EditPoll from './pages/EditPoll.js';
import Error from './pages/Error.js';
import GetAllUsers from './pages/GetAllUsers.js';
import ShowProfile from './pages/ShowProfile.js';
import Wall from './pages/Wall.js';

const App = () => {
  const [token, setToken] = useState('');
  // const [newPassword, setNewPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setNewName] = useState('');
  const [id, setNewId] = useState('');

  const logOut = async () => {
    console.log('User has logged out!');
    setToken('');
    setNewId('');
    setNewName('');
  };

  const handleLogIn = async (ttoken, idd, emaill, namee) => {
    setToken(ttoken);
    setNewId(idd);
    setEmail(emaill);
    setNewName(namee);
  };

  return (
    <div className="app">
      <BrowserRouter>
        <Header
          token={token}
          id={id}
          handleLogIn={handleLogIn}
          logOut={logOut}
          email={email}
          name={name}
        />{' '}
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Home email={email} name={name} token={token} id={id} />
            )}
          />
          <Route path="/users" component={GetAllUsers} />
          <Route path="/user/:id" render={() => <ShowPerson token={token} />} />
          <Route
            path="/profile/:id"
            render={() => <ShowProfile token={token} email={email} />}
          />
          <Route
            path="/edit/:id"
            render={() => <EditUser token={token} email={email} />}
          />{' '}
          <Route
            path="/poll/edit/:id"
            render={() => <EditPoll token={token} email={email} name={name} />}
          />
          <Route
            path="/wall"
            render={() => <Wall token={token} name={name} email={email} />}
          />
          <Route path="/*" component={Error} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
