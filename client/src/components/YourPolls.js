import React, { useState } from 'react';
import NewPoll from './NewPoll.js';

const YourPolls = ({ name, token, email, id }) => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const postNewPoll = async (event) => {
    event.preventDefault();
    const response = await fetch(`/newPoll`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        authorId: id,
        title: title,
        content: content,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(response);

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
      <NewPoll />
      All your polls from most recent to lastest
    </div>
  );
};
export default YourPolls;
