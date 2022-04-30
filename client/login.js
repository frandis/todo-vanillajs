const submitObject = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    username: 'username',
    password: 'password',
  }),
};
const url = '/login';
document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body');

  const errMessage = document.createElement('span');
  errMessage.setAttribute('id', 'errMessage');
  errMessage.style.color = 'red';
  errMessage.innerHTML = '';
  const form = document.createElement('form');
  form.setAttribute('id', 'login-form');
  body.appendChild(errMessage);
  body.appendChild(form);
  //   form.setAttribute('action', 'POST');
  const usernameLabel = document.createElement('label');
  usernameLabel.innerHTML = 'Username';

  const passwordLabel = document.createElement('label');
  passwordLabel.innerHTML = 'Password';

  const username = document.createElement('input');
  username.setAttribute('type', 'text');
  username.setAttribute('id', 'username');

  const password = document.createElement('input');
  password.setAttribute('type', 'password');
  password.setAttribute('id', 'password');

  const submitButton = document.createElement('input');
  submitButton.setAttribute('type', 'submit');
  submitButton.setAttribute('form', 'login-form');
  submitButton.innerHTML = 'Submit';
  form.append(usernameLabel, username, passwordLabel, password, submitButton);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const loginBody = {
      username: e.target[0].value,
      password: e.target[1].value,
    };
    const res = await fetch(url, {
      ...submitObject,
      body: JSON.stringify(loginBody),
    });
    if (res.status === 200) {
      const data = await res.json();
      localStorage.setItem('userId', data);
      window.location.href = '/dashboard';
    } else {
      const data = await res.json();
      errMessage.innerHTML = data.err;
    }
    // const data = await res.json();
  });
});
