const popUp = document.getElementById('contact-form')
const open = document.getElementById('open')

document.addEventListener('load', hideContact());

function hideContact(){
    if (popUp.style.display === "none") {
        popUp.style.display = "block";
      } else {
        popUp.style.display = "none";
      }
}