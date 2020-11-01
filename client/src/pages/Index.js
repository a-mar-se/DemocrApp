import React from 'react';
import ClickablePerson from '../components/ClickablePerson.js';

class Index extends React.Component {
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
          return (
            <ClickablePerson
              name={person.name}
              surname={person.surname}
              key={i}
              id={person._id}
            />
          );
        })}
      </main>
    );
  }
}

export default Index;
