import React from 'react';
import ShowAllPolls from '../../components/sections/ShowAllPolls.js';

const Wall = ({ user }) => {
  return (
    <main className="page">
      <ShowAllPolls user={user} />
    </main>
  );
};

export default Wall;
