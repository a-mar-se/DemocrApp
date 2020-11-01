import React, { useState, useEffect } from 'react';
import Poll from '../sections/Poll.js';

const RandomPoll = ({ name, token, email, id }) => {
  const [poll, setPoll] = useState([]);

  // componentDidMount() {
  //   this.refreshPolls();
  // }

  // refreshPolls = async () => {
  //   const data = await res.json();
  //   console.log(data);
  //   this.setState({ poll: data });
  // };

  useEffect(() => {
    const start = async () => {
      const res = await fetch(`/randompoll`);
      const data = await res.json();
      return setPoll(data);
    };
    start();
  }, []);

  return <Poll name={name} token={token} email={email} id={id} poll={poll} />;
};

export default RandomPoll;
