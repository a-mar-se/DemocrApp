import React from 'react';
import ClickablePerson from './ClickablePerson';

class Person extends React.Component {
  render() {
    return (
      <div className="user-content">
        User: {this.props.id}
        <ClickablePerson id={this.props.id} name={this.props.name} surname="" />
        <div>Email: {this.props.email}</div>
      </div>
    );
  }
}
export default Person;
