import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ShowComments from '../poll/ShowComments.js';
import TimeAgo from '../poll/TimeAgo.js';
import ReactionBar from '../poll/ReactionBar.js';
import EditBar from '../poll/EditBar.js';

const Poll = ({ user, name, token, email, id, poll, refreshPolls }) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);

  const start = async () => {
    const newData = await findCommentsById(poll._id);
    setComments(newData);
  };
  useEffect(() => {
    const startComments = async () => {
      const newData = await findCommentsById(poll._id);
      setComments(newData);
    };
    startComments();
  }, []);

  const handleReactToPoll = async () => {
    if (token !== '') {
    } else {
      alert('You need to log in to react to polls');
    }
  };

  const postNewComment = async (event) => {
    event.preventDefault();
    console.log('new commmen');
    console.log(token);
    const response = await fetch(`/new-comment`, {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        authorId: id,
        parentId: poll._id,
        content: newComment,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      console.log('New comment added!');
      setNewComment('');
      const commentBox = event.target;
      const com = commentBox.querySelector('#newComment');
      com.value = '';
      start(poll._id);
      refreshPolls();
    } else {
      console.log('Error trying to post comment');
    }
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

  const findCommentsById = async (idComment) => {
    const res = await fetch(`/comments-by-id/${idComment}`);
    const data = await res.json();
    return data;
    // return setNewComment(data);
  };

  return (
    <div className="poll">
      <div>"{poll.title}"</div>
      <div className="titlePoll poll-section ">
        <div>
          <Link to={`/user/${poll.authorId}`}> {poll.name}</Link>{' '}
        </div>
        <div>👎 {poll.nagainst}</div>
        <div>👍 {poll.nfavor}</div>
        <TimeAgo createdAt={poll.createdAt} />
      </div>
      <div className="pollcontent"> {poll.content}</div>

      <ReactionBar poll={poll} token={token} />

      <div>
        <form className="writeComment" onSubmit={postNewComment}>
          <input
            id="newComment"
            type="text"
            placeholder="Write comment"
            onClick={handleReactToPoll}
            onChange={handleComment}
          />
          <button type="submit">Comment</button>
        </form>
      </div>
      <EditBar
        poll={poll}
        name={name}
        token={token}
        start={start}
        refreshPolls={refreshPolls}
      />

      <ShowComments
        comments={comments}
        idComment={poll._id}
        username={name}
        token={token}
        email={email}
      />
    </div>
  );
};
export default Poll;
