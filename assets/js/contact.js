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

/** Email.JS code */

const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");

function sendMail(contactForm) {
    modal.classList.remove("open");
    overlay.classList.remove("open");
    emailjs.send("gmail", "ms2", {
        "from_name": contactForm.name.value,
        "from_email": contactForm.email.value,
        "message": contactForm.message.value
    })
    .then(
        function() {
            alert("Thank you for getting in touch!");
        },
        function(error) {
        console.log('FAILED...', error);
        alert("There was an error with your message. Please try again.");
        }
    );
    return false;  // To block from loading a new page
}