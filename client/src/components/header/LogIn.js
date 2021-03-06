import React, { useState } from 'react';
import tryLogIn from '../../functions/tryLogIn.js';

const LogIn = ({ handleLogIn }) => {
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
      <input
        id="email"
        placeholder="Enter email..."
        type="text"
        required
        onChange={handleChangeEmail}
      />

      <input
        id="pass"
        placeholder="Enter password..."
        type="password"
        required
        onChange={handleChangePass}
      />

      <button type="submit">Log In</button>
    </form>
  );
};
export default LogIn;
