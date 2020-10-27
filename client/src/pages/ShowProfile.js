import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ShowProfile = () => {
  const { id } = useParams();

  const [person, setPerson] = useState({});

  const fetchStudent = async (id) => {
    const response = await fetch(`/${id}`);
    const personData = await response.json();
    console.log(personData);
    // const studentData = await getStudent(id);
    setPerson(personData);
  };

  const deleteThisUser = async (id) => {
    await fetch(`/${id}`, {
      method: 'DELETE',
      // body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    window.location.href = '/index';
  };

  const sendToEditPage = async (id) => {
    window.location.href = `/edit${id}`;
  };

  useEffect(() => {
    fetchStudent(id);
  }, [id]);

  return (
    <main className="page show">
      <h2>{person.name}</h2>
      <h3> {person.surname}</h3>
      <div>Id: {person._id}</div>
      <button
        onClick={() => {
          deleteThisUser(person._id);
        }}
        href="/"
      >
        Delete user
      </button>
      <button
        onClick={() => {
          sendToEditPage(person._id);
        }}
      >
        Edit user
      </button>
    </main>
  );
};

export default ShowProfile;
