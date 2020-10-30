import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Poll = ({
  content,
  name,
  authorId,
  nagainst,
  nfavor,
  token,
  username,
  id,
  email,
  comments,
  title,
  refreshPolls,
}) => {
  const [newComment, setNewComment] = useState('');
  console.log(newComment);
  const handleReactToPoll = async () => {
    if (token !== '') {
    } else {
      alert('You need to log in to react to polls');
    }
  };

  const handleAgainst = () => {
    handleReactToPoll();
  };
  const handleFavor = () => {
    handleReactToPoll();
  };
  // const handleEdit = () => {
  //   handleReactToPoll();
  // };
  const handleDelete = async () => {
    // console.log(res);
    window.confirm('Are you sure you want to delete this poll?');
    const res = await fetch(`/poll/delete/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({ id, name: username }),
      headers: {
        'Content-Type': 'application/json',
        token: token,
        email: email,
      },
    });
    if (res.status === 200) {
      console.log('Poll sucessfully deleted');
      refreshPolls();
    } else {
      alert('Problem verifying identity.');
    }

    // window.location.href('/');
  };

  const handleChangeComment = (event) => {
    const { value } = event.currentTarget;
    setNewComment(value);
  };

  const handleComment = (event) => {
    if (token !== '') {
      console.log('post');
      handleChangeComment(event);
    } else {
      event.currentTarget.value = '';
      setNewComment('');
    }
  };
  return (
    <div className="poll">
      <div className="titlePoll">
        "{title}" by <Link to={`/user/${authorId}`}>{name}</Link>
      </div>
      <div className="pollcontent"> {content}</div>
      <div className="poll-results">
        <div>Against: {nagainst}</div>
        <div>Favor: {nfavor}</div>
      </div>

      <div className="reaction-bar">
        <button onClick={handleAgainst}>Against Poll</button>
        <button onClick={handleFavor}>Agree with Poll</button>
        <input
          type="textarea"
          placeholder="Write comment"
          onClick={handleReactToPoll}
          onChange={handleComment}
        ></input>
      </div>
      {username === name ? (
        <div className="edit-bar">
          <button>
            {' '}
            <Link to={`/poll/edit/${id}`}>Edit Poll</Link>
          </button>
          <button onClick={handleDelete}>Delete Poll</button>
        </div>
      ) : null}
      <div>Comments {comments}</div>
    </div>
  );
};
export default Poll;
