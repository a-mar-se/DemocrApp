import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LogIn = () => {
  const [newPassword, setNewSurname] = useState('');
  const [newEmail, setNewEmail] = useState('');

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
    const res = await fetch(`/login`, {
      method: 'POST',
      body: JSON.stringify({
        password: newPassword,
        email: newEmail,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status == 200) {
      console.log('Logged in!');
      window.location.href = `/`;
    } else {
      alert('Incorrect email or password');
    }
  };

  return (
    <main className="page New">
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Log In</button>
      </form>
    </main>
  );
};

export default LogIn;
