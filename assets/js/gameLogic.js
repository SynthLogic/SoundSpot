/*
Get images and audio
*/
const playButton = document.querySelector("#play-button");
let imageOptions = [];
let soundsToPlay = [];
let tempArray = [];

playButton.addEventListener("click", startRound);

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

function playSound() {
  let randomSound = soundsToPlay[Math.floor(Math.random() * soundsToPlay.length)];
  let audioContext = new Audio(`data:${randomSound.contentType};base64,${randomSound.content}`);
  audioContext.play();
  return randomSound.name;
}

function inArray(array, el) {
  for(var i = 0 ; i < array.length; i++) 
      if(array[i] == el) return true;
  return false;
}

function getRandom(array) {
  var rand = array[Math.floor(Math.random() * array.length)];
  if(!inArray(tempArray, rand)) {
      tempArray.push(rand); 
      return rand;
  }
  return getRandom(array);
}

function showImages(chosenSound) {
  let images = Array.from(document.getElementsByClassName('img-option'));
  images.forEach(img => img.innerHTML = '');
  let chosenFile = imageOptions.find(p => p.name == chosenSound);
  let randomIndex = Math.floor(Math.random() * images.length);
  convertbase64Image(images[randomIndex], chosenFile);
  images.filter(x => images.indexOf(x) !== randomIndex).forEach(image => {
      let randomFile = getRandom(imageOptions);
      convertbase64Image(image, randomFile);
  });
}

function convertbase64Image(element, file) {
  let imageContext = new Image() 
  imageContext.src = (`data:${file.contentType};base64,${file.content}`);
  imageContext.width=100;
  imageContext.height=100;
  element.appendChild(imageContext)
}

function startRound() {
  let chosenSound = playSound();
  showImages(chosenSound);
}
