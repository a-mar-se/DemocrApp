import React, { useState } from 'react';

import bcrypt from 'bcryptjs';

const { REACT_APP_SERVER_URL } = process.env;
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
    const BCRYPT_SALT_ROUNDS = 12;
    const hashedPass = await bcrypt.hash(newPassword, BCRYPT_SALT_ROUNDS);
    // console.log(hashedPass);
    const res = await fetch(`${REACT_APP_SERVER_URL}/new-user`, {
      method: 'POST',
      body: JSON.stringify({
        name: newName,
        password: hashedPass,
        email: newEmail,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 200) {
      setNewName('');
      setNewSurname('');
      setNewEmail('');

      const commentBox = event.target;
      const com = commentBox.querySelector('#name');
      com.value = '';
      const commm = commentBox.querySelector('#email');
      commm.value = '';
      const comm = commentBox.querySelector('#pass');
      comm.value = '';
      console.log('New person added!');
    } else {
      alert('Error Registering new person');
      console.log('Error Registering new person');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="New">
      <p className="logo">DemocrApp</p>
      <p className="intro">
        Register to join the democratic app. Post your ideas and let the people
        vote if they agree with that proposition or not .
      </p>
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
        <label htmlFor="email">Email</label>
        <input
          id="email"
          placeholder="Enter email..."
          type="text"
          required
          onChange={handleChangeEmail}
        />
      </p>
      <p>
        <label htmlFor="pass">Password</label>
        <input
          id="pass"
          placeholder="Enter password..."
          type="password"
          required
          onChange={handleChangePass}
        />
      </p>
      <p>
        <button type="submit">Add person to database</button>
      </p>
    </form>
  );
};

export default NewUser;
