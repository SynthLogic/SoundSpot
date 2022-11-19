const form = document.querySelector('#login-form');

form.addEventListener('submit', postRequest);

async function postRequest(e) {
  e.preventDefault();
  console.log(e.target.getAttribute('id'));
  const formData = new FormData(form);
  let apiUrl = '';
  let isLogin = e.target.getAttribute('id') == 'login-form';
  let isRegister = e.target.getAttribute('id') == 'register-form';
  if (isLogin) {
    apiUrl = 'https://soundspotgame.herokuapp.com/api/user/login/';
  }
  if (isRegister) {
    apiUrl = 'https://soundspotgame.herokuapp.com/api/user/register/';
  }
  const response = await fetch(apiUrl, {
    method: "POST",
    body: formData
  });
  if (response.statusCode == 200 && isLogin) {
    const data = await response.json();
    sessionStorage.setItem('user', JSON.stringify(data));
  }
}