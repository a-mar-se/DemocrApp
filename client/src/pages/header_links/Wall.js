import React from 'react';
import ShowAllPolls from '../../components/sections/ShowAllPolls.js';

const Wall = ({ name, id, email, token }) => {
  return (
    <main className="page">
      <ShowAllPolls token={token} name={name} email={email} id={id} />
    </main>
  );
};

export default Wall;
