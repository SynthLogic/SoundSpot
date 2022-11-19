/*
Get images and audio
*/
const playButton = document.querySelector("#play-button");
let imageOptions = [];
let soundsToPlay = [];
let tempArray = [];

/*
Add click listener to the play button
*/
playButton.addEventListener("click", startRound);

/*
IIFE for getting all necessary data from the database
*/
(async function getData() {
  const apiUrl = "https://soundspotgame.herokuapp.com/api/file/getall/";
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
  let images = Array.from(document.getElementsByClassName('img-option'));
  images.forEach(img => img.innerHTML = '');
  let chosenFile = imageOptions.find(p => p.name == chosenSound);
  let randomIndex = Math.floor(Math.random() * images.length);
  convertbase64Image(images[randomIndex], chosenFile);
  let set = new Set();
  set.add(imageOptions.indexOf(chosenFile));
  while (set.size < 4){
    set.add(Math.floor(Math.random() * imageOptions.length))
  }
  set.delete(imageOptions.indexOf(chosenFile));
  let randIdx = [...set];
  images.filter(x => images.indexOf(x) !== randomIndex).forEach(image => {
      let randomFile = imageOptions[randIdx.pop()]
      convertbase64Image(image, randomFile);
  });
}

/*
Converts base64 string to an image
*/
function convertbase64Image(element, file) {
  let imageContext = new Image() 
  imageContext.src = (`data:${file.contentType};base64,${file.content}`);
  imageContext.width = 100;
  imageContext.height = 100;
  element.appendChild(imageContext)
}

/*
Starts a game round
*/
function startRound() {
  let chosenSound = playSound();
  showImages(chosenSound);
}
