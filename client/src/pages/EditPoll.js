import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditPoll = ({ token }) => {
  const { id } = useParams();
  // state = { pollData: {}}

  const [content, setContent] = useState('');
  const [pollData, setPollData] = useState('');
  const [title, setTitle] = useState('');

  const catchPoll = async () => {
    const res = await fetch(`/poll/${id}`);
    const data = await res.json();
    return data;
  };

  const handleComment = (event) => {
    event.currentTarget.value = '';
    setContent('');
  };

  const postEditedPoll = async (event) => {
    event.preventDefault();
    const response = await fetch(`/poll/edit/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        // name: name,
        // authorId: id,
        // title: title,
        // content: content,
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
  };

  const handleChangePollContent = (event) => {
    const { value } = event.currentTarget;
    setContent(value);
  };
  const handleChangePollTitle = (event) => {
    const { value } = event.currentTarget;
    setTitle(value);
  };

  useEffect(() => {
    async function init() {
      try {
        const data = await catchPoll();
        const ccc = document.getElementById('poll-content');
        ccc.value = data.content;
        const ttt = document.getElementById('title');
        ttt.value = data.title;
      } catch (error) {
        console.log(error);
      }
    }
    init();
  }, []);

  return (
    <div>
      {token !== '' ? (
        <form className="poll" onSubmit={postEditedPoll}>
          <div>
            <label htmlFor="name">Edit your proposition:</label>
          </div>
          <div className="poll-title">
            <label>Title: </label>
            <input
              id="title"
              placeholder="Enter title..."
              type="text"
              required
              onChange={handleChangePollTitle}
            />
          </div>
          <div className="pollcontent">
            <label>Poll content: </label>
            <input
              id="poll-content"
              placeholder="Enter poll..."
              type="text"
              required
              onChange={handleChangePollContent}
              // id="editContent"
            />
          </div>
          <button type="submit">Edit Poll</button>
        </form>
      ) : (
        <></>
      )}
    </div>
  );
};
export default EditPoll;
