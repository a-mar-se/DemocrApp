import { React, useState, useEffect } from 'react';
import Comment from './Comment.js';

const ShowComments = ({ start, refreshComments, comments, name }) => {
  return (
    <div className="coment">
      {comments.map((comment, i) => {
        return (
          <Comment
            comment={comment}
            name={name}
            refreshComments={refreshComments}
            key={i}
          />
        );
      })}
    </div>
  );
};

export default ShowComments;
