import React from 'react';
import Poll from './Poll.js';

// const url = 'http://localhost:5000/all';
class ShowAllPolls extends React.Component {
  // Get resources

  state = {
    data: [],
    changingPoll: false,
  };
  async componentDidMount() {
    await this.refreshPolls();
  }

  refreshPolls = async () => {
    const res = await fetch(`/polls`);
    const data = await res.json();
    this.setState({ data });
  };

  render() {
    return (
      <div className="allpolls">
        {this.state.data.map((poll, i) => {
          return (
            <Poll
              username={this.props.name}
              name={poll.name}
              content={poll.content}
              key={i}
              nagainst={poll.nagainst}
              nfavor={poll.nfavor}
              id={poll._id}
              token={this.props.token}
              email={this.props.email}
              title={poll.title}
              comments={poll.comments}
              authorId={poll.authorId}
              refreshPolls={this.refreshPolls}
            />
          );
        })}
      </div>
    );
  }
}

export default ShowAllPolls;
