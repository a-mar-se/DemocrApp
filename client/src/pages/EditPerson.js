import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Edit = () => {
  const { id } = useParams();

  const [person, setPerson] = useState({});

  const fetchStudent = async (id) => {
    const response = await fetch(`/${id}`);
    const personData = await response.json();
    setPerson(personData);
    // console.log({ person });
  };

  useEffect(async () => {
    await fetchStudent(id);
    setNewName(person.name);
    setNewSurname(person.surname);
    console.log(person.name);
  }, [id]);

  const [newName, setNewName] = useState('');
  const [newSurname, setNewSurname] = useState('');

  const handleChangeName = (event) => {
    const { value } = event.currentTarget;
    setNewName(value);
  };

  const handleChangeSurname = (event) => {
    const { value } = event.currentTarget;
    setNewSurname(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // console.log(newData);
    const res = await fetch(`/${person._id}`, {
      method: 'PUT',
      body: JSON.stringify({ name: newName, surname: newSurname }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Profile sucessfully edited!');
    window.location.href = `/index`;
  };

  return (
    <main className="page New">
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="name">Name</label>
          <input
            // value={newName}
            id="name"
            placeholder="Enter name"
            type="text"
            required
            onChange={handleChangeName}
          />
        </p>
        <p>
          <label htmlFor="surname">Surname</label>
          <input
            // value={newSurname}
            id="surname"
            placeholder="Enter surname"
            type="text"
            required
            onChange={handleChangeSurname}
          />
        </p>
        <button type="submit">Confirm changes</button>
      </form>
    </main>
  );
};

export default Edit;
