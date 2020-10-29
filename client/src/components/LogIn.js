import React, { useState } from 'react';
import ClickablePerson from './ClickablePerson';
import tryLogIn from '../functions/tryLogIn.js';

const LogIn = ({ handleLogIn }) => {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const handleChangePass = (event) => {
    const { value } = event.currentTarget;
    setNewPassword(value);
  };
  const handleChangeEmail = (event) => {
    const { value } = event.currentTarget;
    setNewEmail(value);
  };

  const tryLogInFF = async (event) => {
    event.preventDefault();
    const validateLog = await tryLogIn(newEmail, newPassword);
    if (validateLog != null) {
      const ttoken = validateLog.newToken;
      const eemail = validateLog.newEmail;
      const iid = validateLog.newId;
      handleLogIn(ttoken, iid, eemail);
    }
  };

  // const tryLogIn = async (event) => {
  //   event.preventDefault();
  //   const res = await fetch(`/login`, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       password: newPassword,
  //       email: newEmail,
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   if (res.status === 200) {
  //     const data = await res.json();
  //     console.log(data);
  //     const newToken = data.token;
  //     const newId = data._id;
  //     console.log(`Logged in with email: ${newEmail}`);
  //     console.log(`Logged in with token: ${token}`);

  //     handleLogInGood(newToken, newId, newEmail);
  //   } else {
  //     alert('Incorrect email or password');
  //   }
  // };

  return (
    <form onSubmit={tryLogInFF}>
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
  );
};
export default LogIn;
