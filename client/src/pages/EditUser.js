import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditUser = ({ token, email }) => {
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
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    fetchStudent(id);
  }, [id]);

  const handleChangeName = (event) => {
    const { value } = event.currentTarget;
    setNewName(value);
  };

  const handleChangePassword = (event) => {
    const { value } = event.currentTarget;
    setNewPassword(value);
  };

  const handleChangeEmail = (event) => {
    const { value } = event.currentTarget;
    setNewEmail(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`/edit/${person._id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: newName,
        email: newEmail,
        password: newPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
        email: email,
        token: token,
      },
    });
    if (response.status === 200) {
      alert('Profile sucessfully edited! /n Log in again please');
      console.log('Profile sucessfully edited!');

      window.location.href = '/users';
    } else {
      console.log('Error trying to edit the profile.');
    }
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
        <p>
          <label htmlFor="pass">Password</label>
          <input
            // value={newemail}
            id="pass"
            placeholder="Enter password"
            type="text"
            required
            onChange={handleChangePassword}
          />
        </p>
        <button type="submit">Confirm changes</button>
      </form>
    </main>
  );
};

export default EditUser;
