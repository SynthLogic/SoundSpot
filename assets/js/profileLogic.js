const username = document.querySelector('#username');
const email = document.querySelector('#email');
const highestScore = document.querySelector('#high-score');
const lastScore = document.querySelector('#last-score');

if ('user' in sessionStorage) {
  const userData = JSON.parse(sessionStorage.getItem('user'));
  username.innerText = userData.username;
  email.innerText = userData.email;
  highestScore.innerText = userData.highestScore;
  lastScore.innerText = userData.latestScore;
}
