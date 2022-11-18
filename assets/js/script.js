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
    if (event.target.classList.contains('option')) {
        answerQuestion(event.target);
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
    const chosenOption = document.getElementsByClassName('chosen');
    state.resetGame();
    startButton.disabled = false;
    playButton.disabled = true;
    startButton.style.cursor = 'pointer';
    gameGrid.style.cursor = 'auto';
    for (let i = 0; i < chosenOption.length; i++) {
        chosenOption[i].classList.remove('chosen');
      };
}

/*
Determine if player's choice is correct or not
*/
function answerQuestion(option) {
    if(!state.isPlaying) return;
    option.classList.add('chosen');
    if(option.classList.contains('chosen')) return;
  
    const playerResponse = document.getElementsByClassName('chosen')[0];
    const correctResponse = question.getElementById('correct') // Where question is provided by the array of questions provided

    option.classList.add('chosen');   
  
    if (playerResponse === correctResponse){
        const scoreboard = document.getElementById('scoreboard')
        state.incrementScore;
        state.incrementQuestions;
        scoreboard.innerHTML = score;
        if(state.questionsAnswered === 10){
            gameModal.showModal();
        }
        return;
    };
}
