import React from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from './TimeAgo.js';

const Comment = ({
  parentId,
  authorId,
  content,
  nagainst,
  nfavor,
  name,
  createdAt,
  id,
}) => {
  return (
    <div className="comment poll-section ">
      <Link to={`/user/${authorId}`}>{name}</Link>
      <div> {content}</div>
      <TimeAgo createdAt={createdAt} />
    </div>
  );
};
export default Comment;
