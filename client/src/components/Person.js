import React from 'react';
import ClickablePerson from './ClickablePerson';

class Person extends React.Component {
  render() {
    return (
      <div className="user-content">
        <ClickablePerson id={this.props.id} name={this.props.name} surname="" />

        <div>Password: {this.props.password}</div>
      </div>
    );
  }
}
export default Person;
