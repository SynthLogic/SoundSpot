/*
Set initial game state
*/
const state = {
    isPlaying: false,
    questionsAnswered: 10, //Until we know how many total questions
    score: 0,
    setIsPlaying: function setIsPlaying(isPlaying) {
        this.isPlaying = isPlaying;
    },
    incrementScore: function incrementScore() {
        this.score++;
    },
    incrementQuestions: function incrementQuestions() {
        this.questionsAnswered++;
    },
    resetGame: function resetGame() {
        this.setIsPlaying(false);
        this.score = 0;
    }
}

/*
Modal to show final score after finishing the game.
*/
const gameModal = {
    isOpen: false,
    showModal: function showmodal() {
        this.isOpen = true;
        document.getElementById('game-modal').style.display = 'block';
        const gameScore = document.getElementsByClassName('game-score');
        gameScore[0].innerHTML = score;
    },
    hideModal: function hideModal() {
        this.isOpen = false;
        document.getElementById('game-modal').style.display = 'none';
    }
}
/*
Allows players to click off modal to close.
*/
window.onclick = function(event) {
    const modal = document.getElementById('game-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};

/*
Event Listeners: on click
Start game if start button is clicked.
Reset game if reset button is clicked.
*/
window.addEventListener('click', function(event) {
    if (event.target.nodeName === 'BUTTON' && event.target.id === 'start-button') {
        startGame();
    }
    if (event.target.nodeName === 'BUTTON' && event.target.id === 'reset-button') {
        resetGame();
    }
});

/*
Start game on button press
*/
function startGame() {
    const startButton = document.getElementById('start-button');
    const playButton = document.getElementById('play-button');
    const gameGrid = document.getElementById('game-grid'); // Where game-grid shows each question and multiple choice answers
    playButton.disabled = false;
    startButton.disabled = true;
    gameGrid.style.cursor = 'pointer';
    state.setIsPlaying(true);
}

/*
Reset game on button press
*/
function resetGame() {
    const startButton = document.getElementById('start-button');
    const playButton = document.getElementById('play-button');
    const gameGrid = document.getElementById('game-grid');
    state.resetGame();
    startButton.disabled = false;
    playButton.disabled = true;
    startButton.style.cursor = 'pointer';
    gameGrid.style.cursor = 'auto';
}

/*
Play sound
*/
const playButton = document.querySelector("#play-button");
let soundsToPlay = [];

async function getSounds() {
  const apiUrl = "https://soundspotgame.herokuapp.com/api/instrument/getall/";
  const response = await fetch(apiUrl);
  const result = await response.json();
  return result;
}

getSounds().then(sounds => {
  sounds.forEach(sound => {
    soundsToPlay.push(sound);
  });
});

playButton.addEventListener("click", playSound);

function playSound() {
  let randomSound = soundsToPlay[Math.floor(Math.random() * soundsToPlay.length)];
  let audioContext = new Audio(`data:audio/mpeg;base64,${randomSound.content}`);
  audioContext.play();
}