import React, { useState } from 'react';
import Auth from '../auth.js';
const NewPoll = ({ name, token, email, id }) => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const postNewPoll = async (event) => {
    event.preventDefault();
    const response = await fetch(`/new-poll`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        authorId: id,
        title: title,
        content: content,
      }),
      headers: {
        'Content-Type': 'application/json',

        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });

    // console.log(response);

    if (response.status === 200) {
      alert('Poll sucessfully created!');
      console.log('Profile sucessfully edited!');

      // window.location.href = '/users';
    } else {
      console.log('Error trying to post a poll');
    }
    console.log('New poll added!');
    const titleObject = document.getElementById('title');
    const contentObject = document.getElementById('poll-content');
    contentObject.value = '';
    titleObject.value = '';
  };

  const handleChangePollContent = (event) => {
    const { value } = event.currentTarget;
    setContent(value);
  };
  const handleChangePollTitle = (event) => {
    const { value } = event.currentTarget;
    setTitle(value);
  };

  return (
    <div>
      {token !== '' ? (
        <form className="poll" onSubmit={postNewPoll}>
          <div>
            {' '}
            <label htmlFor="name">Write a new proposition:</label>
          </div>{' '}
          <div>
            {' '}
            <input
              id="title"
              placeholder="Enter title..."
              type="text"
              required
              onChange={handleChangePollTitle}
            />{' '}
          </div>{' '}
          <div className="pollcontent">
            <input
              id="poll-content"
              placeholder="Enter poll..."
              type="text"
              required
              onChange={handleChangePollContent}
            />
          </div>
          <div>
            <button type="submit">Post new Poll</button>
          </div>{' '}
        </form>
      ) : (
        <></>
      )}
    </div>
  );
};
export default NewPoll;
