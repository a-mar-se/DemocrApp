import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Poll from './Poll.js';

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
    <Poll
      username={username}
      name={data.name}
      content={data.content}
      nagainst={data.nagainst}
      nfavor={data.nfavor}
      id={data._id}
      token={token}
      email={email}
      title={data.title}
      comments={data.comments}
      authorId={data.authorId}
      // pollId={data._id}
    />
  );
};
export default RandomPoll;
