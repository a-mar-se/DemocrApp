import React from 'react';
import ShowAllPolls from '../../components/poll/ShowAllPolls.js';

const Wall = ({ token, name, email }) => {
  return (
    <main className="page">
      <ShowAllPolls token={token} name={name} email={email} />
    </main>
  );
};

export default Wall;
