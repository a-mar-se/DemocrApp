import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const New = () => {
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
    const res = await fetch(`/`, {
      method: 'POST',
      body: JSON.stringify({ name: newName, surname: newSurname }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('New person added!');
    window.location.href = `/index`;
  };

  return (
    <main className="page New">
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            placeholder="Enter name..."
            type="text"
            required
            onChange={handleChangeName}
          />
        </p>
        <p>
          <label htmlFor="surname">Surname</label>
          <input
            id="surname"
            placeholder="Enter surname..."
            type="text"
            required
            onChange={handleChangeSurname}
          />
        </p>
        <button type="submit">Add person to database</button>
      </form>
    </main>
  );
};

export default New;
