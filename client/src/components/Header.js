import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <div>
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
            {this.props.token !== '' ? (
              <Link to={`/profile/${this.props.id}`}>Profile</Link>
            ) : (
              <Link to="/newUser">Sign Up</Link>
            )}
          </li>
        </ul>
      </div>
    );
  }
}
export default Header;
