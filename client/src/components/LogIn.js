import React, { useState } from 'react';
import tryLogIn from '../functions/tryLogIn.js';

const LogIn = ({ handleLogIn }) => {
  // const [token, setToken] = useState('');
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

  return (
    <form onSubmit={tryLogInFF}>
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
          type="text"
          required
          onChange={handleChangePass}
        />
      </p>
      <button type="submit">Log In</button>
    </form>
  );
};
export default LogIn;
