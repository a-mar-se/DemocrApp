import React from 'react';
import YourPolls from '../components/YourPolls.js';
import NewUser from './NewUser.js';
import RandomPoll from '../components/RandomPoll.js';

const Home = ({ name, token, email, id }) => {
  return (
    <div className="page home">
      <RandomPoll token={token} email={email} username={name} />
      {token === '' ? (
        <NewUser />
      ) : (
        <YourPolls name={name} token={token} email={email} id={id} />
      )}
    </div>
  );
};

export default Home;
