import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ShowComments from './ShowComments.js';
import TimeAgo from './TimeAgo.js';
import ReactionBar from './ReactionBar.js';

const Poll = ({ user, poll, refreshPolls }) => {
  const [newComment, setNewComment] = useState('');
  const handleReactToPoll = async () => {
    if (user.token !== '') {
    } else {
      alert('You need to log in to react to polls');
    }
  };

  const postNewComment = async (event) => {
    event.preventDefault();
    const response = await fetch(`/new-comment/`, {
      method: 'POST',
      body: JSON.stringify({
        name: user.name,
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
  // const handleEdit = () => {
  //   handleReactToPoll();
  // };
  const handleDelete = async () => {
    // console.log(res);
    window.confirm('Are you sure you want to delete this poll?');
    const res = await fetch(`/poll/delete/${poll.id}`, {
      method: 'DELETE',
      body: JSON.stringify({ _id: poll.id, name: user.name }),
      headers: {
        'Content-Type': 'application/json',
        token: user.token,
        email: user.email,
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
    if (user.token !== '') {
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

      <ReactionBar
        poll={poll}
        user={user}
        token={user.token}
        // id={id}
        // nfavorPast={nfavor}
        // favorPast={favor}
        // againstPast={against}
        // nagainstPast={nagainst}
        // userId={id}
      />

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
      {user.name === poll.name ? (
        <div className="edit-bar">
          <button>
            {' '}
            <Link to={`/poll/edit/${poll.id}`}>Edit Poll</Link>
          </button>
          <button onClick={handleDelete}>Delete Poll</button>
        </div>
      ) : null}
      <ShowComments
        idComment={poll.id}
        username={user.name}
        token={user.token}
        email={user.email}
      />
    </div>
  );
};
export default Poll;
