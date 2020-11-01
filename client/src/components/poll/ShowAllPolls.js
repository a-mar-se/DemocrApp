import React from 'react';
import Poll from './Poll.js';

class ShowAllPolls extends React.Component {
  state = {
    data: [],
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
              user={this.props}
              username={this.props.name}
              token={this.props.token}
              email={this.props.email}
              poll={poll}
              name={poll.name}
              content={poll.content}
              key={i}
              nagainst={poll.nagainst}
              favor={poll.favor}
              against={poll.against}
              nagainst={poll.nagainst}
              nfavor={poll.nfavor}
              id={poll._id}
              title={poll.title}
              comments={poll.comments}
              authorId={poll.authorId}
              refreshPolls={this.refreshPolls}
              createdAt={poll.createdAt}
            />
          );
        })}
      </div>
    );
  }
}

export default ShowAllPolls;
