const popUp = document.getElementById('contact-form');
const open = document.getElementById('open');
const btn = document.getElementById('submit')

document.addEventListener('load', hideContact());

function hideContact(){
    if (popUp.style.display === "none") {
        popUp.style.display = "block";
    } else {
        popUp.style.display = "none";
    }
}

/** Email.JS code */
function initEmail() {
    emailjs.init("kKSvuHp7VpOd5maBA");
};

window.onload = function(){
    console.log('function called')
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        btn.value = 'Sending...';
        const serviceID = 'default_service';
        const templateID = 'template_93ejbdi';
        // these IDs from the previous steps
        emailjs.sendForm('contact_service', 'contact_form', this)
            .then(function() {
                console.log('SUCCESS!');
            }, function(error) {
                console.log('FAILED...', error);
            });
    });
}