import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import LogIn from './LogIn.js';
import LogInfo from '../user_info/LogInfo.js';
import Auth from '../auth.js';

const Header = ({ id, token, handleLogIn, logOut, email, name }) => {
  const [searchedUsers, setSearch] = useState([]);
  // const changeSearch = (event) => {
  //   const val = event.target.value;
  //   setSearchContent(val);
  // };

  const removeSearch = () => {
    setSearch([]);
  };

  const searchContent = async (event) => {
    const val = event.target.value;
    const response = await fetch(`/find-elements`, {
      method: 'POST',
      body: JSON.stringify({
        keyword: val,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    console.log(data);

    setSearch(data);
    // if (data.length > 0) {
    //   data.map((person) => {
    //     console.log(person);
    //     setSearch([...searchedUsers, person]);
    //     console.log(searchedUsers);
    //   });
    // }
  };

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
        <li className="search-results">
          <input
            type="text"
            onClick={searchContent}
            onChange={searchContent}
            placeholder="Search user..."
          />
          {searchedUsers.map((userr, i) => {
            return (
              <Link to={`/user/${userr._id}`}>
                <div key={i} onClick={removeSearch}>
                  {userr.name}
                </div>
              </Link>
            );
          })}
        </li>
      </ul>
      <li className="logoHeader">
        <h1>DemocrApp</h1>
      </li>

      <div className="loggedIn">
        {Auth.isAuthenticated() ? (
          <LogInfo name={name} email={email} token={token} id={id} />
        ) : null}
        {Auth.isAuthenticated() ? (
          <div>
            <Link className="linky" to={`/profile/${id}`}>
              <button>My Profile</button>
            </Link>

            <Link className="linky" to="/">
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
