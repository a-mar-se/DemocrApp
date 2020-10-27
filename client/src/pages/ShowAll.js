import React, { useState } from 'react';
import Person from '../components/Person.js';

const url = 'http://localhost:5000/all';
class ShowAll extends React.Component {
  // Get resources

  state = {
    data: [],
  };
  async componentDidMount() {
    const res = await fetch(`/all`);
    const data = await res.json();
    this.setState({ data });
  }

  render() {
    return (
      <main className="page">
        {this.state.data.map((person, i) => {
          return <Person name={person.name} surname={person.surname} key={i} />;
        })}
      </main>
    );
  }
}

export default ShowAll;
