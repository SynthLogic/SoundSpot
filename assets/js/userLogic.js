const loginForm = document.querySelector('#login-form');
const registerForm = document.querySelector('#register-form');

if (loginForm != null) {
  loginForm.addEventListener('submit', postRequest);
}

if (registerForm != null) {
  registerForm.addEventListener('submit', postRequest);
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
  if (response.statusCode == 200 && isLogin) {
    alert('You have successfully logged in');
    const data = await response.json();
    sessionStorage.setItem('user', JSON.stringify(data));
  }
  if (response.statusCode == 200 && isRegister) {
    alert('You have successfully registered');
  }
}