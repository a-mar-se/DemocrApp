import React from 'react';
import NewPoll from '../components/NewPoll.js';
import NewUser from './NewUser.js';

const Home = ({ name, token, email }) => {
  return (
    <main className="page home">
      <NewPoll name={name} token={token} email={email} />
      <NewUser />
    </main>
  );
};

export default Home;
