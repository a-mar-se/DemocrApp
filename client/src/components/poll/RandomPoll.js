import React from 'react';
import Poll from './Poll.js';

class RandomPoll extends React.Component {
  state = { data: {} };

  componentDidMount() {
    this.refreshPolls();
  }

  refreshPolls = async () => {
    const res = await fetch(`/randompoll`);
    const data = await res.json();
    this.setState({ data });
  };

  render() {
    return (
      <Poll
        username={this.props.name}
        name={this.state.data.name}
        content={this.state.data.content}
        nagainst={this.state.data.nagainst}
        nfavor={this.state.data.nfavor}
        id={this.state.data._id}
        token={this.props.token}
        email={this.props.email}
        title={this.state.data.title}
        comments={this.state.data.comments}
        authorId={this.state.data.authorId}
        createdAt={this.state.data.createdAt}
      />
    );
  }
}
export default RandomPoll;
