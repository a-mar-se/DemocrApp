import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ShowComments from '../poll/ShowComments.js';
import TimeAgo from '../poll/TimeAgo.js';
import ReactionBar from '../poll/ReactionBar.js';
import EditBar from '../poll/EditBar.js';

const Poll = ({ name, token, email, id, poll }) => {
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
        name: name,
        authorId: poll.authorId,
        parentId: poll.id,
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
            type="text"
            placeholder="Write comment"
            onClick={handleReactToPoll}
            onChange={handleComment}
          />
          <button type="submit">Comment</button>
        </form>
      </div>
      <EditBar poll={poll} />

      <ShowComments
        idComment={poll._id}
        username={name}
        token={token}
        email={email}
      />
    </div>
  );
};
export default Poll;
