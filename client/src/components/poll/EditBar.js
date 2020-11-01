import React from 'react';
import { Link } from 'react-router-dom';

const EditBar = ({ token, email, name, poll }) => {
  const handleDelete = async () => {
    window.confirm('Are you sure you want to delete this poll?');
    const res = await fetch(`/poll/delete/${poll.id}`, {
      method: 'DELETE',
      body: JSON.stringify({ _id: poll.id, name: name }),
      headers: {
        'Content-Type': 'application/json',
        token: token,
        email: email,
      },
    });
    if (res.status === 200) {
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
            <Link to={`/poll/edit/${poll.id}`}>Edit Poll</Link>
          </button>
          <button onClick={handleDelete}>Delete Poll</button>
        </div>
      ) : null}{' '}
    </>
  );
};
export default EditBar;
