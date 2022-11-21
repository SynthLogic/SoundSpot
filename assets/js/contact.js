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
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        btn.value = 'Sending...';
        const serviceID = 'default_service';
        const templateID = 'template_93ejbdi';
        const form = document.getElementById('email-form');
        // these IDs from the previous steps
        emailjs.sendForm(serviceID, templateID, form, 'kKSvuHp7VpOd5maBA')
            .then(function() {
                swal('Thank you for your email!')
            }, function(error) {
                swal('Sorry, your email could not be sent')
            });
    });
}