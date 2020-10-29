import React from 'react';

class Poll extends React.Component {
  render() {
    return (
      <div className="poll-details">
        <div>By: {this.props.name}</div>
        <div> {this.props.content}</div>
      </div>
    );
  }
}
export default Poll;
