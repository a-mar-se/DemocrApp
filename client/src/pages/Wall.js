import React from 'react';
import ShowAllPolls from '../components/ShowAllPolls.js';

const Wall = ({ token, name, email }) => {
  return (
    <main className="page">
      <ShowAllPolls token={token} name={name} email={email} />
    </main>
  );
};

export default Wall;
