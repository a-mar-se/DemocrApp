import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ShowPerson = () => {
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
    const res = await fetch(`/delete/${id}`, {
      method: 'DELETE',
      // body: JSON.stringify({ id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(res);
    window.location.href = '/users';
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
      <h4> {person.password}</h4>
      <h3> {person.email}</h3>
      <div>Id: {person._id}</div>
      <button
        onClick={() => {
          deleteThisUser(person._id);
        }}
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

export default ShowPerson;
