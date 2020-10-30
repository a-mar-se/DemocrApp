// import './App.css';
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
import LogIn from './components/LogIn.js';
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
    <main>
      <BrowserRouter>
        <Header
          token={token}
          id={id}
          handleLogIn={handleLogIn}
          logOut={logOut}
        />

        <LogInfo token={token} email={email} />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Home email={email} name={name} token={token} />}
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
          />
          <Route path="/wall" render={() => <Wall />} />
          <Route path="/*" component={Error} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </main>
  );
};

export default App;
