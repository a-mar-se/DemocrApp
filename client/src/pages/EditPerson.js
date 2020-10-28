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

  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    fetchStudent(id);
  }, [id]);

  const handleChangeName = (event) => {
    const { value } = event.currentTarget;
    setNewName(value);
  };

  const handleChangeEmail = (event) => {
    const { value } = event.currentTarget;
    setNewEmail(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // console.log(newData);
    await fetch(`/${person._id}`, {
      method: 'PUT',
      body: JSON.stringify({ name: newName, email: newEmail }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Profile sucessfully edited!');
    window.location.href = `/users`;
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
          <label htmlFor="email">Email</label>
          <input
            // value={newemail}
            id="email"
            placeholder="Enter email"
            type="text"
            required
            onChange={handleChangeEmail}
          />
        </p>
        <button type="submit">Confirm changes</button>
      </form>
    </main>
  );
};

export default Edit;
