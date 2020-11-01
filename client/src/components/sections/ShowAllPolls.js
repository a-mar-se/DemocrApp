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
              poll={poll}
              key={i}
              refreshPolls={this.refreshPolls}
            />
          );
        })}
      </div>
    );
  }
}

export default ShowAllPolls;
