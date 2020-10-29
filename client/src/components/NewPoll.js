import React, { useState } from 'react';

const NewPoll = ({ name, token }) => {
  const [content, setContent] = useState('');

  const postNewPoll = async (contents) => {
    await fetch(`/polls`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        content: contents,
      }),
      headers: {
        'Content-Type': 'application/json',
        token: token,
      },
    });

    console.log('New poll added!');
  };

  const handleChangePollContent = (event) => {
    const { value } = event.currentTarget;
    setContent(value);
  };

  return (
    // <div>dfisk</div>
    <div>
      {token === '' ? (
        <form className="new-poll" onSubmit={() => postNewPoll(content)}>
          <label htmlFor="name">Write a new proposition:</label>
          <input
            id="name"
            placeholder="Enter poll..."
            type="text"
            required
            onChange={handleChangePollContent}
          />

          <button type="submit">Log In</button>
        </form>
      ) : (
        <></>
      )}
    </div>
  );
};
export default NewPoll;
