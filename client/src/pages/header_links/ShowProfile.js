import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
const { REACT_APP_SERVER_URL } = process.env;

const ShowProfile = ({ token, email }) => {
  const { id } = useParams();

  const [person, setPerson] = useState({});

  const fetchStudent = async (id) => {
    const response = await fetch(`/user/${id}`);
    const personData = await response.json();
    console.log(personData);
    setPerson(personData);
  };

  const deleteThisUser = async (id) => {
    await fetch(`${REACT_APP_SERVER_URL}/delete/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
        token: token,
        email: email,
      },
    });
    window.confirm('Are you sure you want to delete your user?');
    console.log('Profile sucessfully deleted :(');
    window.location.href('/');
  };

  useEffect(() => {
    fetchStudent(id);
  }, [id]);

  return (
    <main className="page show">
      <h2>{person.name}</h2>
      <h3> {person.surname}</h3>
      <div>Id: {person._id}</div>
      <div>Access Token: {token}</div>
      {token !== '' ? (
        <>
          <button
            onClick={() => {
              deleteThisUser(person._id);
            }}
          >
            Delete user
          </button>

          <Link to={`/edit/${id}`}>
            <button>Edit user</button>
          </Link>
        </>
      ) : (
        <></>
      )}
    </main>
  );
};

export default ShowProfile;
