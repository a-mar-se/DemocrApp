import React from 'react';
import Person from '../../components/user_info/Person.js';

// const url = 'http://localhost:5000/all';
class GetAllUsers extends React.Component {
  // Get resources

  state = {
    data: [],
  };
  async componentDidMount() {
    const res = await fetch(`/users`);
    const data = await res.json();
    this.setState({ data });
  }

  render() {
    return (
      <div className="page">
        <div className="allusers">
          {this.state.data.map((person, i) => {
            return (
              <Person
                name={person.name}
                password={person.password}
                key={i}
                email={person.email}
                id={person._id}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default GetAllUsers;
