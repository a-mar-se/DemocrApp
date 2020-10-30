import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const RandomPoll = ({ token, email, username }) => {
  const [data, setData] = useState('');
  const [newComment, setNewComment] = useState('');
  console.log(newComment);
  const getRandomPoll = async () => {
    const res = await fetch(`/randompoll`);
    const datan = await res.json();
    setData(datan);
  };
  useEffect(() => {
    getRandomPoll();
  }, []);

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
    const res = await fetch(`/poll/delete/${data._id}`, {
      method: 'DELETE',
      body: JSON.stringify({ id: data._id, name: username }),
      headers: {
        'Content-Type': 'application/json',
        token: token,
        email: email,
      },
    });
    if (res.status === 200) {
      console.log('Poll sucessfully deleted');
      getRandomPoll();
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
      <div>
        "{data.title}" by <Link to={`/user/${data.authorId}`}>{data.name}</Link>
      </div>
      <div className="pollcontent"> {data.content}</div>
      <div className="poll-results">
        <div>Against: {data.nagainst}</div>
        <div>Favor: {data.nfavor}</div>
      </div>

      <div className="reaction-bar">
        <button onClick={handleAgainst}>Against Poll</button>
        <button onClick={handleFavor}>Agree with Poll</button>
        <form>
          <input
            type="textarea"
            placeholder="Write comment"
            onClick={handleReactToPoll}
            onChange={handleComment}
          ></input>
          <button type="submit">Comment</button>
        </form>
      </div>
      {username === data.name ? (
        <div className="edit-bar">
          <button>
            {' '}
            <Link to={`/poll/edit/${data._id}`}>Edit Poll</Link>
          </button>
          <button onClick={handleDelete}>Delete Poll</button>
        </div>
      ) : null}
      <div>Comments {data.comments}</div>
    </div>
  );
};
export default RandomPoll;
