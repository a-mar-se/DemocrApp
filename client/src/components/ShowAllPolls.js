import React from 'react';
import Poll from './Poll.js';

// const url = 'http://localhost:5000/all';
class ShowAllPolls extends React.Component {
  // Get resources

  state = {
    data: [],
  };
  async componentDidMount() {
    const res = await fetch(`/polls`);
    const data = await res.json();
    this.setState({ data });
  }

  render() {
    return (
      <main className="page allpolls">
        {this.state.data.map((poll, i) => {
          return (
            <Poll
              name={poll.name}
              content={poll.content}
              key={i}
              against={poll.against}
              favor={poll.favor}
              id={poll._id}
            />
          );
        })}
      </main>
    );
  }
}

export default ShowAllPolls;
