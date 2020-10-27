import React from 'react';
import { Link } from 'react-router-dom';

class ClickablePerson extends React.Component {
  render() {
    return (
      <div className="person-details">
        <Link to={`/id${this.props.id}`}>
          {this.props.name} {this.props.surname}
        </Link>
      </div>
    );
  }
}
export default ClickablePerson;
