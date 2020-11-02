import React from 'react';
import { Link } from 'react-router-dom';
import LogIn from './LogIn.js';
import LogInfo from '../user_info/LogInfo.js';

const Header = ({ id, token, handleLogIn, logOut, email, name }) => {
  const changeSearch = () => {
    console.log('typing');
  };
  // const changeColor1 = (event) => {
  //   console.log('color changed');
  //   console.log(event.target.value);
  //   document.style.setProperty('--color1', event.target.value);
  //   // variables.color1 = event.target.value;
  // };

  return (
    <header>
      <ul id="nav">
        <li>
          <Link className="hidden" to="/">
            <button>Home</button>
          </Link>
        </li>

        <li>
          <Link to="/users">
            <button>All Users</button>
          </Link>
        </li>

        <li>
          <Link to="/wall">
            <button>All Polls</button>
          </Link>
        </li>

        <li>
          <input
            type="text"
            onChange={changeSearch}
            placeholder="Search user..."
          />
        </li>
      </ul>
      <h1>DemocrApp</h1>
      <div className="loggedIn">
        {token !== '' ? (
          <LogInfo name={name} email={email} token={token} id={id} />
        ) : null}
        {token !== '' ? (
          <div>
            <Link to={`/profile/${id}`}>
              <button>My Profile</button>
            </Link>

            <Link to="/">
              <button onClick={logOut}>Log Out</button>
            </Link>
          </div>
        ) : (
          <LogIn handleLogIn={handleLogIn} />
        )}
      </div>
    </header>
  );
};
export default Header;
