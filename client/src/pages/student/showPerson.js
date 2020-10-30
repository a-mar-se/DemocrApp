import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ShowPerson = () => {
  const { id } = useParams();
  const [person, setPerson] = useState({});

  const fetchStudent = async (id) => {
    const response = await fetch(`/user/${id}`);
    const personData = await response.json();
    console.log(personData);
    setPerson(personData);
  };

  useEffect(() => {
    fetchStudent(id);
  }, [id]);

  return (
    <main className="page show">
      <h2>Username: {person.name}</h2>
      <h4>Password {person.password}</h4>
      <h3>Email: {person.email}</h3>
      <div>Id: {person._id}</div>
    </main>
  );
};

export default ShowPerson;
