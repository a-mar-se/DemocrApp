import React from 'react';
import Person from '../components/Person.js';

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
      <main className="page">
        {this.state.data.map((person, i) => {
          return (
            <Person
              name={person.name}
              password={person.password}
              key={i}
              id={person._id}
            />
          );
        })}
      </main>
    );
  }
}

export default GetAllUsers;
