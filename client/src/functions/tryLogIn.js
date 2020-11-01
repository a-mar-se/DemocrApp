import Auth from '../components/auth.js';

export const tryLogIn = async (newEmail, newPassword) => {
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

  console.log(res);
  if (res.status === 200) {
    const data = await res.json();
    const newToken = data.token;
    const newId = data._id;
    const newName = data.name;
    Auth.setToken(newToken);
    return { newToken, newId, newEmail, newName };
  } else {
    alert('Incorrect email or password');
  }
};

export default tryLogIn;
