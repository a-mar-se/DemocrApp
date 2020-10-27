import React from 'react';
const Header = () => {
  return (
    <div>
      <ul id="nav">
        <li>
          <a href="./">Home</a>
        </li>
        <li>
          <a href="./index">Index</a>
        </li>
        <li>
          <a href="./users">All Users</a>
        </li>
        <li>
          <a href="./newUser">New</a>
        </li>
        <li>
          <a href="./login">Log in</a>
        </li>
        <li>
          <a href="./profile">Profile</a>
        </li>
      </ul>
    </div>
  );
};
export default Header;
