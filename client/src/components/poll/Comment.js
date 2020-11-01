import React from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from './TimeAgo.js';

const Comment = ({ comment }) => {
  return (
    <div className="comment poll-section ">
      <Link to={`/user/${comment.authorId}`}>{comment.name}</Link>
      <div> {comment.content}</div>
      <TimeAgo createdAt={comment.createdAt} />
    </div>
  );
};
export default Comment;
