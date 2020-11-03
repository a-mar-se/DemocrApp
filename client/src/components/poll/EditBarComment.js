import React from 'react';
import Auth from '../auth.js';

const EditBarComment = ({
  editting,
  name,
  comment,
  start,
  refreshComments,
  bringCommentToEdit,
  getCommentsFromDb,
}) => {
  const handleDelete = async () => {
    window.confirm('Are you sure you want to delete this poll?');
    const res = await fetch(`/poll/delete/${comment._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });
    if (res.status === 200) {
      refreshComments();
      console.log('Comment sucessfully deleted');
    } else {
      alert('Problem verifying identity.');
    }
  };

  const handleEdit = async () => {
    if (editting) {
      bringCommentToEdit(false);
      // post new comment
    } else {
      bringCommentToEdit(true);
    }
  };

  return (
    <>
      {comment.name === name ? (
        <button onClick={handleEdit}>
          Edit Comment
          {/* <Link to={`/poll/edit/${comment._id}`}>Edit Comment</Link> */}
        </button>
      ) : (
        <></>
      )}
      {comment.name === name ? (
        <button onClick={handleDelete}>Delete Comment</button>
      ) : (
        <></>
      )}
    </>
  );
};
export default EditBarComment;
