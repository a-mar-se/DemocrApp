import React from 'react';
import NewPoll from './NewPoll.js';

const YourPolls = ({ name, id }) => {
  return (
    <div>
      <NewPoll name={name} id={id} />
      All your polls from most recent to lastest
    </div>
  );
};
export default YourPolls;
