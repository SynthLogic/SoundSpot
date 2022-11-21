const loginForm = document.querySelector('#login-form');
const registerForm = document.querySelector('#register-form');
const resetPassword = document.querySelector('#reset-password');

if (loginForm != null) {
  loginForm.addEventListener('submit', postRequest);
}

if (registerForm != null) {
  registerForm.addEventListener('submit', postRequest);
}

if (resetPassword != null) {
  resetPassword.addEventListener('submit', patchRequest);
}

async function postRequest(e) {
  e.preventDefault();
  let formData;
  let apiUrl = '';
  let isLogin = e.target.getAttribute('id') == 'login-form';
  let isRegister = e.target.getAttribute('id') == 'register-form';
  if (isLogin) {
    apiUrl = 'https://soundspotgame.herokuapp.com/api/user/login/';
    formData = new FormData(loginForm);
  }
  if (isRegister) {
    apiUrl = 'https://soundspotgame.herokuapp.com/api/user/register/';
    formData = new FormData(registerForm);
  }
  const response = await fetch(apiUrl, {
    method: 'POST',
    body: formData
  });
  if (response.status == 200 && isLogin) {
    alert('You have successfully logged in.');
    window.location.href = '../../index.html';
    const data = await response.json();
    sessionStorage.setItem('user', JSON.stringify(data));
  }
  if (response.status == 200 && isRegister) {
    alert('You have successfully registered. Please login.');
    window.location.href = '../../login.html';
  }
  if (response.status != 200 && isRegister) {
    swal('Oops! Something went wrong. Please try again.');
  }
  if (response.status != 200 && isLogin) {
    swal('Your email or password are incorrect.');
  }
}

async function patchRequest(e) {
  e.preventDefault();
  let formData = new FormData(resetPassword);
  const email = formData.get('email');
  const username = formData.get('username');
  const password = formData.get('password');
  const repeatPassword = formData.get('password-repeat');
  if (password !== repeatPassword) {
    swal('Passwords do not match');
    return;
  }
  let apiUrl =`https://soundspotgame.herokuapp.com/api/user/update/${email}/${username}/`;
  const response = await fetch(apiUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password: password })
  });
  if (response.status == 200) {
    swal('You have successfully updated your password');
  } else {
    swal('Oops! Something went wrong. Please try again.');
  }
}