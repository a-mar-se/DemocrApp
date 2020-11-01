import React from 'react';
import calculateTimeAgo from './calculateTimeAgo.js';

class TimeAgo extends React.Component {
  state = { timeAgo: '' };

  componentDidMount() {
    const timeAgoPoll = calculateTimeAgo(this.props.createdAt);
    // console.log(timeAgoPoll);
    // console.log(timeAgoPoll);
    this.setState({ timeAgo: timeAgoPoll });
  }
  render() {
    return <div> {this.state.timeAgo}</div>;
  }
}
export default TimeAgo;
