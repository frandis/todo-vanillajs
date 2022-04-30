const url = '/signup';
const signupObject = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'username', password: 'password' }),
};

document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');
  const errMessage = document.createElement('span');
  errMessage.setAttribute('id', 'errMessage');
  errMessage.style.color = 'red';
  errMessage.innerHTML = '';

  const form = document.createElement('form');
  form.setAttribute('id', 'signup-form');

  const usernameLabel = document.createElement('label');
  usernameLabel.setAttribute('id', 'username-label');
  usernameLabel.innerHTML = 'Username';

  const passwordLabel = document.createElement('label');
  passwordLabel.setAttribute('id', 'password-label');
  passwordLabel.innerHTML = 'Password';

  const username = document.createElement('input');
  username.setAttribute('id', 'username');
  username.setAttribute('type', 'text');
  const password = document.createElement('input');
  password.setAttribute('id', 'password');
  password.setAttribute('type', 'password');

  const signupBtn = document.createElement('input');
  signupBtn.setAttribute('id', 'signupBtn');
  signupBtn.setAttribute('type', 'submit');

  body.appendChild(errMessage);
  body.appendChild(form);

  form.append(usernameLabel, username, passwordLabel, password, signupBtn);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const signupBody = {
      username: e.target[0].value,
      password: e.target[1].value,
    };
    const response = await fetch(url, {
      ...signupObject,
      body: JSON.stringify(signupBody),
    });
    if (response.status === 200) {
      const data = await response.json();
      localStorage.setItem('userId', data);
      window.location.href = '/dashboard';
    } else {
      const msg = await response.json();
      console.log(msg);
      errMessage.innerHTML = msg.err;
    }
  });
});
