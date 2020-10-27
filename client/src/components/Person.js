import React from 'react';

class Person extends React.Component {
  render() {
    return (
      <div className="person-details">
        <div>{this.props.name}</div>
        <div>{this.props.surname}</div>
      </div>
    );
  }
}
export default Person;
