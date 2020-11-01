import { React, useEffect, useState } from 'react';
import Comment from './Comment.js';

const ShowComments = ({ idComment, token, username, email }) => {
  const [comments, setNewComment] = useState([]);

  useEffect(() => {
    const start = async () => {
      const res = await fetch(`/comments-by-id/${idComment}`);
      const data = await res.json();
      return setNewComment(data);
    };
    start();
  }, []);

  return (
    <div className="">
      {comments.map((comment, i) => {
        return <Comment comment={comment} key={i} />;
      })}
    </div>
  );
};

export default ShowComments;
