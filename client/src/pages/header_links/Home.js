import React from 'react';
import YourPolls from '../../components/sections/YourPolls.js';
import NewUser from '../../components/user_info/NewUser.js';
import RandomPoll from '../../components/poll/RandomPoll.js';

const Home = ({ name, token, email, id }) => {
  return (
    <main className="page home">
      <RandomPoll name={name} token={token} email={email} id={id} />
      {token === '' ? (
        <NewUser />
      ) : (
        <YourPolls name={name} token={token} email={email} id={id} />
      )}
    </main>
  );
};

export default Home;
