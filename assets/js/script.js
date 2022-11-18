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
Get images and audio
*/
const playButton = document.querySelector("#play-button");
let imageOptions = [];
let soundsToPlay = [];

async function getData() {
    const apiUrl = "https://soundspotgame.herokuapp.com/api/file/getall/";
    const response = await fetch(apiUrl);
    const result = await response.json();
    return result;
  }

  getData().then(files => {
    files.forEach(file => {
        if (file.contentType == 'audio/mpeg' ) {
            soundsToPlay.push(file);
        } else if (file.contentType == "image/png") {
            imageOptions.push(file)
        }

    });
  });

  playButton.addEventListener("click", startRound);

function playSound() {
  let randomSound = soundsToPlay[Math.floor(Math.random() * soundsToPlay.length)];
  let audioContext = new Audio(`data:${randomSound.contentType};base64,${randomSound.content}`);
  audioContext.play();
}

getData().then(images => {
    images.forEach(image => {
        imageOptions.push(image);
    });
  });


const base64img = getData();
function Base64ToImage(base64img, callback) {
    const img = new Image();
    img.onload = function() {
        callback(img);
    };
    img.src = base64img;
}
Base64ToImage(base64img, function(img) {
    forEach(option => {
        options = document.getElementsByclass('option')
        options.document.createElement('button')
        options.appendChild(img);
    })


});

function showImages () {
    let images = Array.from(document.getElementsByClassName('option'));
    images.forEach(image => {
        let randomImage = imageOptions[Math.floor(Math.random() * imageOptions.length)];
        let imageContext = new Image() 
        imageContext.src = (`data:${randomImage.contentType};base64,${randomImage.content}`);
        imageContext.width=100;
        imageContext.height=100;
        image.appendChild(imageContext)
    })
}

function startRound() {
    showImages();
    playSound();
}
