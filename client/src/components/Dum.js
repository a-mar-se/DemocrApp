import React from 'react';

const Dum = ({ dum, ac }) => {
  return (
    <div>
      <button onClick={ac('new')}></button>
      <p>{dum}</p>
    </div>
  );
};
export default Dum;
