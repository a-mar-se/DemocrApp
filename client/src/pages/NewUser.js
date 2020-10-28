import React, { useState } from 'react';

const NewUser = () => {
  const [newName, setNewName] = useState('');
  const [newPassword, setNewSurname] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const handleChangeName = (event) => {
    const { value } = event.currentTarget;
    setNewName(value);
  };
  const handleChangePass = (event) => {
    const { value } = event.currentTarget;
    setNewSurname(value);
  };
  const handleChangeEmail = (event) => {
    const { value } = event.currentTarget;
    setNewEmail(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(`/newUser`, {
      method: 'POST',
      body: JSON.stringify({
        name: newName,
        password: newPassword,
        email: newEmail,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('New person added!');
    window.location.href = `/users`;
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
          <label htmlFor="pass">Password</label>
          <input
            id="pass"
            placeholder="Enter password..."
            type="text"
            required
            onChange={handleChangePass}
          />
        </p>
        <p>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            placeholder="Enter email..."
            type="text"
            required
            onChange={handleChangeEmail}
          />
        </p>
        <button type="submit">Add person to database</button>
      </form>
    </main>
  );
};

export default NewUser;
