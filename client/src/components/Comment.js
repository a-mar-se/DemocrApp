import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ShowComments from './ShowComments.js';

const Comment = ({
  parentId,
  authorId,
  content,
  nagainst,
  nfavor,
  name,
  id,
}) => {
  const [newComment, setNewComment] = useState('');

  return (
    <div className="comment poll-section ">
      <Link to={`/user/${authorId}`}>{name}</Link>
      <div> {content}</div>
      {/* <div> {id}</div>
      <div> {parentId}</div> */}
    </div>
  );
};
export default Comment;
