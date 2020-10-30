import React from 'react';
import { Link } from 'react-router-dom';
import LogIn from './LogIn.js';
import LogInfo from './LogInfo.js';

const Header = ({ id, token, handleLogIn, logOut, email, name }) => {
  const changeSearch = () => {
    console.log('typing');
  };
  return (
    <header>
      <ul id="nav">
        <li>
          <Link className="hidden" to="/">
            Home
          </Link>
        </li>

        <li>
          <Link to="/users">All Users</Link>
        </li>

        <li>
          <Link to="/wall">All Polls</Link>
        </li>

        {token !== '' ? (
          <li>
            {' '}
            <Link to={`/profile/${id}`}>Profile</Link>{' '}
          </li>
        ) : (
          <></>
        )}

        <li>
          <input
            type="text"
            onChange={changeSearch}
            placeholder="Search user..."
          />
        </li>
      </ul>

      <div className="loggedIn">
        {token !== '' ? (
          <LogInfo name={name} email={email} token={token} />
        ) : null}
        {token !== '' ? (
          <Link to="/">
            <button onClick={logOut}>Log Out</button>
          </Link>
        ) : (
          <LogIn handleLogIn={handleLogIn} />
        )}
      </div>
    </header>
  );
};
export default Header;
