// import './App.css';
import React, { useEffect, useState } from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/header_links/Home.js';
import Footer from './components/header/Footer.js';
import Header from './components/header/Header.js';
import ShowPerson from './pages/student/showPerson.js';
import EditUser from './components/user_info/EditUser.js';
import EditPoll from './components/poll/EditPoll.js';
import Error from './pages/Error.js';
import GetAllUsers from './pages/header_links/GetAllUsers.js';
import ShowProfile from './pages/header_links/ShowProfile.js';
import Wall from './pages/header_links/Wall.js';
import Auth from './components/auth.js';

const App = () => {
  const [token, setToken] = useState('');
  const [email, setNewEmail] = useState();
  const [name, setNewName] = useState();
  const [id, setNewId] = useState();
  // const [user, setNewUser] = useState({});

  const logOut = async () => {
    console.log('User has logged out!');
    setToken('');
    setNewId('');
    setNewName('');
    setNewEmail('');
    Auth.logout();
  };

  const handleLogIn = async (ttoken, idd, emaill, namee, userr) => {
    setToken(ttoken);
    setNewId(idd);
    setNewEmail(emaill);
    setNewName(namee);

    // setNewUser({
    //   token: ttoken,
    //   id: idd,
    //   email: emaill,
    //   name: namee,
    //   user: userr,
    // });
  };

  const checkIfLogged = async () => {
    if (Auth.isAuthenticated()) {
      const fetchUser = async () => {
        const response = await fetch(`/user-data`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${Auth.getToken()}` },
        });
        const personData = await response.json();
        return personData;
      };
      const activeUser = await fetchUser();
      if (activeUser.status === 200) {
        setNewId(activeUser._id);
        console.log(id);
        setNewEmail(activeUser.email);
        setNewName(activeUser.name);
      }
    }
  };

  useEffect(() => {
    checkIfLogged();
  });

  return (
    <div className="app">
      <BrowserRouter>
        <Header
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
            render={() => <Home email={email} name={name} id={id} />}
          />
          <Route path="/users" component={GetAllUsers} />
          <Route path="/user/:id" render={() => <ShowPerson />} />
          <Route
            path="/profile/:id"
            render={() => <ShowProfile email={email} />}
          />
          <Route path="/edit/:id" render={() => <EditUser email={email} />} />{' '}
          <Route
            path="/poll/edit/:id"
            render={() => <EditPoll email={email} name={name} />}
          />
          <Route
            path="/wall"
            render={() => <Wall name={name} email={email} id={id} />}
          />
          <Route path="/*" component={Error} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
};

export default App;
