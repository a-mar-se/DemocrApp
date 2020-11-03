import { React, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TimeAgo from './TimeAgo.js';
import EditBarComment from './EditBarComment.js';
import Auth from '../auth.js';

const Comment = ({ comment, name, start, refreshComments }) => {
  const [editting, setEditting] = useState(false);

  const [content, setContent] = useState(comment.content);
  const bringCommentToEdit = (va) => {
    setEditting(va);
  };

  const postEditedPoll = async (event) => {
    event.preventDefault();
    const response = await fetch(`/poll/edit/${comment._id}`, {
      method: 'PUT',
      body: JSON.stringify({
        content: content,
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });
    console.log(response);
    if (response.status === 200) {
      bringCommentToEdit(false);
      refreshComments();
      console.log('Poll sucessfully edited!');
    } else {
      console.log('Error trying to edit poll');
    }
  };

  const handleChangePollContent = (event) => {
    const { value } = event.currentTarget;
    setContent(value);
  };

  return (
    <>
      {editting ? (
        <div className="comment  ">
          <Link to={`/user/${comment.authorId}`}>{comment.name}</Link>
          <input
            className="comment-content"
            // id="poll-content"
            type="text"
            value={content}
            onChange={handleChangePollContent}
          />
          <TimeAgo createdAt={comment.createdAt} />
          <button onClick={postEditedPoll} id="edit-comment">
            Edit
          </button>
        </div>
      ) : (
        <div className="comment poll-section ">
          <Link to={`/user/${comment.authorId}`}>{comment.name}</Link>
          <div className="comment-content"> {content}</div>
          <TimeAgo createdAt={comment.createdAt} />

          <EditBarComment
            comment={comment}
            editting={editting}
            name={name}
            start={start}
            refreshComments={refreshComments}
            bringCommentToEdit={bringCommentToEdit}
          />
        </div>
      )}
    </>
  );
};
export default Comment;
