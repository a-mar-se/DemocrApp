import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ShowComments from './ShowComments.js';

const Poll = ({
  content,
  name,
  authorId,
  nagainst,
  nfavor,
  token,
  username,
  pollId,
  id,
  email,
  comments,
  title,
  refreshPolls,
}) => {
  const [newComment, setNewComment] = useState('');
  const handleReactToPoll = async () => {
    if (token !== '') {
    } else {
      alert('You need to log in to react to polls');
    }
  };

  const postNewComment = async (event) => {
    event.preventDefault();
    const response = await fetch(`/new-comment/`, {
      method: 'POST',
      body: JSON.stringify({
        name: username,
        authorId: authorId,
        parentId: id,
        content: newComment,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // console.log(response);

    if (response.status === 200) {
      alert('Poll sucessfully created!');
      console.log('New comment added!');
      // REFRESH COMMENTS
    } else {
      console.log('Error trying to post comment');
    }
    // const contentObject = document.getElementById('comment-content');
    // contentObject.value = '';
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
      handleChangeComment(event);
    } else {
      event.currentTarget.value = '';
      setNewComment('');
    }
  };
  return (
    <div className="poll">
      <div className="titlePoll poll-section ">
        <div>"{title}"</div>
        <div>
          {' '}
          <Link to={`/user/${authorId}`}>{name}</Link>{' '}
        </div>
        <div>
          <div>👎 {nagainst}</div>
          <div>👍 {nfavor}</div>
        </div>
        <div>"Date"</div>
      </div>
      <div className="pollcontent"> {content}</div>

      <div className="reaction-bar">
        <button onClick={handleAgainst}>Against Poll</button>
        <input type="range" />
        <button onClick={handleFavor}>Agree with Poll</button>
      </div>
      <div>
        <form className="writeComment" onSubmit={postNewComment}>
          <input
            type="text"
            placeholder="Write comment"
            onClick={handleReactToPoll}
            onChange={handleComment}
          />
          <button type="submit">Comment</button>
        </form>
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
      <ShowComments
        idComment={id}
        username={username}
        token={token}
        email={email}
      />
    </div>
  );
};
export default Poll;
