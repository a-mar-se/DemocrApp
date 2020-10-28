import './App.css';
import React, { useState } from 'react';
import { Switch, BrowserRouter, Route, Link } from 'react-router-dom';
import Home from './pages/Home.js';
import NewUser from './pages/NewUser.js';
import Footer from './components/Footer.js';
import Header from './components/Header.js';
import ShowPerson from './pages/student/showPerson.js';
import Edit from './pages/EditPerson.js';
import Error from './pages/Error.js';
import GetAllUsers from './pages/GetAllUsers.js';
import ShowProfile from './pages/ShowProfile.js';
import LogInfo from './components/LogInfo.js';

const App = () => {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');

  const handleChangePass = (event) => {
    const { value } = event.currentTarget;
    setNewPassword(value);
  };
  const handleChangeEmail = (event) => {
    const { value } = event.currentTarget;
    setNewEmail(value);
  };
  const handleChangeName = (event) => {
    const { value } = event.currentTarget;
    setNewName(value);
  };

  const handleLogIn = async (event) => {
    event.preventDefault();
    const res = await fetch(`/login`, {
      method: 'POST',
      body: JSON.stringify({
        password: newPassword,
        email: newEmail,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      console.log(data);
      const newToken = data.token;
      console.log(`Logged in with email: ${newEmail}`);
      console.log(`Logged in with token: ${token}`);
      setToken(newToken);
      console.log(token);
    } else {
      alert('Incorrect email or password');
    }
  };

  return (
    <>
      <div>
        <BrowserRouter>
          <Header token={token} />
          <form onSubmit={handleLogIn}>
            <p>
              <label htmlFor="pass">Password</label>
              <input
                id="pass"
                placeholder="Enter password..."
                type="text"
                required
                onChange={handleChangePass}
              />
            </p>
            <p>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                placeholder="Enter email..."
                type="text"
                required
                onChange={handleChangeEmail}
              />
            </p>
            <button type="submit">Log In</button>
          </form>

          <Link to="/newUser">
            <button>Sign Up</button>
          </Link>
          <LogInfo token={token} email={newEmail} />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/users" component={GetAllUsers} />

            <Route path="/newUser" component={NewUser} />
            <Route
              path="/user/:id"
              render={() => (
                <ShowPerson token={token} changeToken={handleLogIn} />
              )}
            />
            <Route path="/profile:id" component={ShowProfile} />
            <Route path="/edit:id" component={Edit} />
            <Route path="/*" component={Error} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    </>
  );
};

export default App;
