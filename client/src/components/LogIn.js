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
    console.log(validateLog);
    if (validateLog != null) {
      const ttoken = validateLog.newToken;
      const eemail = validateLog.newEmail;
      const iid = validateLog.newId;
      const namee = validateLog.newName;
      handleLogIn(ttoken, iid, eemail, namee);
    }
  };

  return (
    <form onSubmit={tryLogInFF}>
      <p>
        <input
          id="email"
          placeholder="Enter email..."
          type="text"
          required
          onChange={handleChangeEmail}
        />
      </p>
      <p>
        <input
          id="pass"
          placeholder="Enter password..."
          type="text"
          required
          onChange={handleChangePass}
        />
      </p>
      <p>
        <button type="submit">Log In</button>
      </p>
    </form>
  );
};
export default LogIn;
