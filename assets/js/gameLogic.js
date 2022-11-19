/*
Get HTML elements
*/
const playButton = document.querySelector('#play-button');
const submitButton = document.querySelector('#submit-button');
const scoreBoard = document.querySelector('#scoreboard');
const imageButtons = Array.from(document.getElementsByClassName('img-option'));

/*
Global variables
*/
let imageOptions = [];
let soundsToPlay = [];
let score = 0;
let isCorrect = '';

scoreBoard.innerText = score;

/*
Add click listener to all the buttons
*/
playButton.addEventListener('click', startRound);

submitButton.addEventListener('click', submitAnswer);

imageButtons.forEach(b => b.addEventListener('click', registerAnswer));

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
});

/*
Plays a random audio file from the list
*/
function playSound() {
  let randomSound = soundsToPlay[Math.floor(Math.random() * soundsToPlay.length)];
  let audioContext = new Audio(`data:${randomSound.contentType};base64,${randomSound.content}`);
  audioContext.play();
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
  imageContext.dataset.correct = correct
  imageContext.width = 100;
  imageContext.height = 100;
  element.appendChild(imageContext);
}

/*
Starts a game round
*/
function startRound() {
  let chosenSound = playSound();
  showImages(chosenSound);

}

/*
Registers answer to isCorrect variable
*/
function registerAnswer(e) {
  isCorrect = e.target.getAttribute('data-correct');
  submitAnswer()
}

/*
Check if answer is correct and update score
*/
function submitAnswer() {

  if (isCorrect == 'true') {
    increaseScore();
    document.getElementById('gameboard').style.backgroundColor='green'
  } else {
    document.getElementById('gameboard').style.backgroundColor='red'
  }
  const normalColor = () => {
    document.getElementById('gameboard').style.backgroundColor='#EEB66D'
}
  const myTimeout = setTimeout(normalColor, 1000);
  startRound()
}

/*
Increment score by 1
*/
function increaseScore() {
  ++score;
  scoreBoard.innerText = score;
}

