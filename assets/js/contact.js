const popUp = document.getElementById('contact-form');
const open = document.getElementById('open');
const btn = document.getElementById('submit');


document.addEventListener('load', hideContact());

function hideContact(){
    if (popUp.style.display === "none") {
        popUp.style.display = "block";
    } else {
        popUp.style.display = "none";
    }
}

/** Email.JS code */

window.onload = function(){
    console.log('function called')
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        btn.value = 'Sending...';
        const serviceID = 'default_service';
        const templateID = 'template_93ejbdi';
        const form = document.getElementById('email-form');
        // these IDs from the previous steps
        emailjs.sendForm(serviceID, templateID, form, 'kKSvuHp7VpOd5maBA')
            .then(function() {
                console.log('SUCCESS!');
            }, function(error) {
                console.log('FAILED...', error);
            });
    });
}