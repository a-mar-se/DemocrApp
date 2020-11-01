import { React, useEffect, useState } from 'react';
import Comment from './Comment.js';

const ShowComments = ({ idComment, token, username, email }) => {
  const [comments, setNewComment] = useState([]);

  useEffect(() => {
    const start = async () => {
      console.log(idComment);
      const res = await fetch(`/comments-by-id/${idComment}`);
      console.log(res);
      const data = await res.json();
      return setNewComment(data);
    };
    start();
  }, []);

  return (
    <div className="">
      {comments.map((comment, i) => {
        return (
          <>
            <Comment
              token={token}
              email={email}
              name={comment.name}
              content={comment.content}
              nagainst={comment.nagainst}
              nfavor={comment.nfavor}
              id={comment._id}
              authorId={comment.authorId}
              parentId={comment.parentId}
              key={i}
              createdAt={comment.createdAt}
            />
          </>
        );
      })}
    </div>
  );
};

export default ShowComments;
