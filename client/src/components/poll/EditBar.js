import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../auth.js';
const EditBar = ({ token, email, name, poll, start, refreshPolls }) => {
  const handleDelete = async () => {
    window.confirm('Are you sure you want to delete this poll?');
    const res = await fetch(`/poll/delete/${poll._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`,
      },
    });
    if (res.status === 200) {
      refreshPolls();
      console.log('Poll sucessfully deleted');
    } else {
      alert('Problem verifying identity.');
    }
  };
  return (
    <>
      {name === poll.name ? (
        <div className="edit-bar">
          <button>
            {' '}
            <Link to={`/poll/edit/${poll._id}`}>Edit Poll</Link>
          </button>
          <button onClick={handleDelete}>Delete Poll</button>
        </div>
      ) : null}
      <></>
    </>
  );
};
export default EditBar;
