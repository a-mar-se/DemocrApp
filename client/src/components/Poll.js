import React from 'react';

class Poll extends React.Component {
  render() {
    return (
      <div className="poll">
        <div>By: {this.props.name}</div>
        <div className="pollcontent"> {this.props.content}</div>
      </div>
    );
  }
}
export default Poll;
