import React from 'react';
import { Link } from 'react-router-dom';
import LogIn from './LogIn.js';

const Header = ({ id, token, handleLogIn, logOut }) => {
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

        <li>
          {token !== '' ? <Link to={`/profile/${id}`}>Profile</Link> : <></>}
        </li>
        <li>
          <input
            type="text"
            onChange={changeSearch}
            placeholder="Search user..."
          />
        </li>
      </ul>
      {token !== '' ? (
        <Link to="/">
          <button onClick={logOut}>Log Out</button>
        </Link>
      ) : (
        <LogIn handleLogIn={handleLogIn} />
      )}
    </header>
  );
};
export default Header;
