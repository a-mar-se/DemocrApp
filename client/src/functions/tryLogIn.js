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
  if (res.status === 200) {
    const data = await res.json();
    console.log(data);
    const newToken = data.token;
    const newId = data._id;
    const newName = data.name;
    console.log(`Logged in with email: ${newEmail}`);
    console.log(`Logged in with token: ${newToken}`);
    return { newToken, newId, newEmail, newName };
    // handleLogInGood(newToken, newId, newEmail);
  } else {
    alert('Incorrect email or password');
  }
};

export default tryLogIn;
