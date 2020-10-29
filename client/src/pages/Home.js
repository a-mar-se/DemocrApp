import React from 'react';
import NewPoll from '../components/NewPoll.js';

const Home = ({ name, token }) => {
  return (
    <main className="page home">
      <NewPoll name={name} token={token} />
    </main>
  );
};

export default Home;
