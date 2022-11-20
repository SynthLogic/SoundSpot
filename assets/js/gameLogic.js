/*
Get HTML elements
*/
const playButton = document.querySelector('#play-button');
const resetButton = document.querySelector('#reset-button');
const submitButton = document.querySelector('#submit-button');
const scoreBoard = document.querySelector('#scoreboard');
const gameBoard = document.querySelector('#gameboard');
const toolTip = document.querySelector('#tooltip');
const imageButtons = Array.from(document.getElementsByClassName('img-option'));
const closeButton = document.getElementById('close-modal')
const modal = document.getElementById('modal');
const root = document.documentElement;

/*
Global variables
*/
let audioContext = new Audio();
let imageOptions = [];
let soundsToPlay = [];
let score = 0;
let isCorrect = '';

scoreBoard.innerText = score;
calculateProgressWidth();

/*
Add click listener to all the buttons
*/
playButton.addEventListener('click', startRound, false);

resetButton.addEventListener('click', resetGame, false)

imageButtons.forEach(b => {
  b.addEventListener('click', registerAnswer, false);
  b.addEventListener('mouseenter', showTooltip, false);
  b.addEventListener('mouseleave', hideTooltip, false);
});

/*
IIFE for getting all necessary data from the database
*/
(async function getData() {
  const apiUrl = 'https://soundspotgame.herokuapp.com/api/file/getall/';
  const response = await fetch(apiUrl);
  const result = await response.json();
  return result;
})().then(files => {
  files.forEach(file => {
      if (file.contentType == 'audio/mpeg' ) {
        soundsToPlay.push(file);
      }
      if (file.contentType == 'image/png') {
        imageOptions.push(file);
      }
  });
}).then(() => { 
  playButton.disabled = false
  document.getElementById('loader').classList.add('hide')
  sessionStorage.setItem('sounds', JSON.stringify(soundsToPlay));
});

/*
Plays a random audio file from the list
*/
function playSound() {
  if (soundsToPlay.length == 0) {
    alert('Sounds are not available. Try again.');
    return;
  };
  let randomSound = soundsToPlay[Math.floor(Math.random() * soundsToPlay.length)];
  audioContext.src = `data:${randomSound.contentType};base64,${randomSound.content}`;
  audioContext.play();
  soundsToPlay = soundsToPlay.filter(x => x.name !== randomSound.name);
  return randomSound.name;
}

/*
Renders correct and 3 random images
*/
function showImages(chosenSound) {
  let images = [...imageButtons];
  images.forEach(img => img.innerHTML = '');
  let chosenFile = imageOptions.find(p => p.name == chosenSound);
  let randomIndex = Math.floor(Math.random() * images.length);
  convertbase64Image(images[randomIndex], chosenFile, true);
  let set = new Set();
  set.add(imageOptions.indexOf(chosenFile));
  while (set.size < 4){
    set.add(Math.floor(Math.random() * imageOptions.length))
  }
  set.delete(imageOptions.indexOf(chosenFile));
  let randIdx = [...set];
  images.filter(x => images.indexOf(x) !== randomIndex).forEach(image => {
    let randomFile = imageOptions[randIdx.pop()];
    convertbase64Image(image, randomFile, false);
  });
}

/*
Converts base64 string to an image
*/
function convertbase64Image(element, file, correct) {
  let imageContext = new Image();
  imageContext.src = (`data:${file.contentType};base64,${file.content}`);
  imageContext.dataset.name = file.name;
  imageContext.dataset.correct = correct;
  imageContext.width = 128;
  imageContext.height = 128;
  element.appendChild(imageContext);
}

/*
Starts a game round
*/
function startRound() {
  let chosenSound = playSound();
  showImages(chosenSound);
  playButton.disabled = true
}

/*
Resets a game round
*/
function resetGame() {
  audioContext.pause();
  audioContext.currentTime = 0;
  let images = [...imageButtons];
  images.forEach(img => img.innerHTML = '');
  resetScore();
  if ('sounds' in sessionStorage) {
    soundsToPlay = [...JSON.parse(sessionStorage.getItem('sounds'))];
    calculateProgressWidth();
  } else {
    location.reload();
  }
}

/*
Check if answer is correct
*/
function registerAnswer(e) {
  isCorrect = e.target.getAttribute('data-correct');
  audioContext.pause();
  audioContext.currentTime = 0;
  let images = [...imageButtons];
  images.forEach(img => img.innerHTML = '');
  if (isCorrect == 'true') {
    increaseScore();
    gameBoard.style.backgroundColor = '#A5BA8C';
  } else {
    gameBoard.style.backgroundColor = '#CD3C57';
  }
  playButton.disabled = false
  hideTooltip()
  setTimeout(resetColor, 1000);
  calculateProgressWidth();
}

/*
Reset background colour of game board
*/
const resetColor = () => {
  gameBoard.style.backgroundColor = '#EEB66D';
  if (soundsToPlay.length == 0) {
    showModal();
  };
}

/*
Shows Model with final score
*/
const showModal = () => {
  modal.classList.remove('hide');
  gameBoard.classList.add('hide');
    document.getElementById('final-score').innerHTML=scoreBoard.innerHTML;
    if ('user' in sessionStorage) { 
      const user = JSON.parse(sessionStorage.getItem('user')); 
      document.getElementById('username').innerText=user.username
    }

    closeButton.addEventListener('click', closeModal);
}
/*
Close modeland instead show the game and reset the score
*/
const closeModal = () => {
  score = 0;
  scoreBoard.innerText = score;
  modal.classList.add('hide');
  gameBoard.classList.remove('hide');
  resetGame()
}

/*
Increment score by 1
*/
function increaseScore() {
  score += 10;
  scoreBoard.innerText = score;
}

function resetScore() {
  score = 0;
  scoreBoard.innerText = 0;
}

/*
Calculate progress bar
*/
function calculateProgressWidth() {
  let progressBarWidth;
  if (soundsToPlay.length == 0) {
    progressBarWidth = (soundsToPlay.length / 10) * 100;
  } else {
    progressBarWidth = 100 - (soundsToPlay.length / 10) * 100;
  }
  root.style.setProperty('--width', progressBarWidth + "%");
}

function showTooltip(e) {
  const image = e.target.firstElementChild;
  const name = image.getAttribute('data-name');
  toolTip.innerText = name;
  toolTip.style.display = 'grid';
}

function hideTooltip() {
  toolTip.style.display = 'none';
}

/* if logged in the navbar change */

const nav = document.querySelector('#nav');

if ('user' in sessionStorage) {
    nav.innerHTML = `
    <li>
        <a href="index.html">Home Page</a>
    </li>
    <li>
        <a href="contact.html">Contact Us</a>
    </li>
    <li>
        <a href="profile.html">Profile</a>
    </li>
    <li>
        <a href="index.html" id="logout">Logout</a>
    </li>
    `;
    const logout = document.querySelector('#logout');

    logout.addEventListener('click', function() {
        sessionStorage.removeItem('user');
        nav.innerHTML = `
        <li>
            <a href="index.html">Home Page</a>
        </li>
        <li>
            <a href="contact.html">Contact Us</a>
        </li>
        <li>
            <a href="register.html">Register</a>
        </li>
        <li>
            <a href="login.html">Login</a>
        </li>
        `
    });
}