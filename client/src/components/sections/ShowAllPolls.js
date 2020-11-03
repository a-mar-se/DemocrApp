import React, { Component, useEffect, useState } from 'react';
import Poll from './Poll.js';
import NewPoll from '../poll/NewPoll.js';
import Auth from '../auth.js';

const { REACT_APP_SERVER_URL } = process.env;
class ShowAllPolls extends React.Component {
  //  ({ name, id, email })
  state = { polls: [] };
  // const [polls, setPolls] = useState([]);

  refreshPolls = async () => {
    const res = await fetch(`${REACT_APP_SERVER_URL}/polls`);
    const data = await res.json();
    console.log(data);
    this.setState({ polls: data });
  };

  componentDidMount() {
    this.refreshPolls();
  }

  render() {
    return (
      <div className="allpolls">
        {Auth.isAuthenticated() ? (
          <NewPoll
            id={this.props.id}
            name={this.props.name}
            refreshPolls={this.refreshPolls}
          />
        ) : null}
        {this.state.polls.map((poll, i) => {
          return (
            <Poll
              name={this.props.name}
              email={this.props.email}
              id={this.props.id}
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
