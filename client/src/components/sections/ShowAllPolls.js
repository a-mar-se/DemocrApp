import React, { useEffect, useState } from 'react';
import Poll from './Poll.js';
import NewPoll from '../poll/NewPoll.js';

const ShowAllPolls = ({ name, id, email, token }) => {
  const [polls, setPolls] = useState([]);

  const refreshPolls = async () => {
    const res = await fetch(`/polls`);
    const data = await res.json();
    setPolls(data);
  };
  useEffect(() => {
    refreshPolls();
  }, []);

  return (
    <div className="allpolls">
      {polls.map((poll, i) => {
        return (
          <Poll
            token={token}
            name={name}
            email={email}
            id={id}
            poll={poll}
            key={i}
            refreshPolls={refreshPolls}
          />
        );
      })}
    </div>
  );
};

export default ShowAllPolls;
