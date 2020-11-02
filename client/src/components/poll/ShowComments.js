import { React } from 'react';
import Comment from './Comment.js';

const ShowComments = ({
  idComment,
  token,
  username,
  email,
  findCommentsById,
  comments,
}) => {
  return (
    <div className="">
      {comments.map((comment, i) => {
        return <Comment comment={comment} key={i} />;
      })}
    </div>
  );
};

export default ShowComments;
