import React from 'react';
import NewPoll from '../components/NewPoll.js';
import NewUser from './NewUser.js';
import RandomPoll from '../components/RandomPoll.js';

const Home = ({ name, token, email, id }) => {
  return (
    <main className="page home">
      <RandomPoll token={token} email={email} username={name} />
      <NewPoll name={name} token={token} email={email} id={id} />
      {token === '' ? <NewUser /> : null}
    </main>
  );
};

export default Home;
