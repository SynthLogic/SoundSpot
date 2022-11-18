const playButton = document.querySelector("#playButton");
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