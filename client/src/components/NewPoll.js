import React, { useState } from 'react';

const NewPoll = ({ name, token, email }) => {
  const [content, setContent] = useState('');

  const postNewPoll = async (event) => {
    event.preventDefault();
    const response = await fetch(`/newPoll`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        content: content,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response);

    if (response.status === 200) {
      alert('Poll sucessfully created! /n');
      console.log('Profile sucessfully edited!');

      // window.location.href = '/users';
    } else {
      console.log('Error trying to post a poll');
    }
    console.log('New poll added!');
  };

  const handleChangePollContent = (event) => {
    const { value } = event.currentTarget;
    setContent(value);
  };

  return (
    <div>
      {token !== '' ? (
        <form className="new-poll" onSubmit={postNewPoll}>
          <label htmlFor="name">Write a new proposition:</label>
          <input
            id="name"
            placeholder="Enter poll..."
            type="text"
            required
            onChange={handleChangePollContent}
          />

          <button type="submit">Post new Poll</button>
        </form>
      ) : (
        <></>
      )}
    </div>
  );
};
export default NewPoll;
