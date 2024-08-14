// script.js

function toggleMenu() {
    const menu = document.querySelector('.menu');
    const menuIcon = document.querySelector('.menu-icon');
    menu.classList.toggle('active');
    menuIcon.classList.toggle('active');
}

function searchFunction() {
    // Add search functionality here


    var query = document.getElementById("search-bar").value;
    alert("Search functionality is not implemented. You searched for: " + query);
}
// Smooth Scrolling Function
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.dropdown-content a');

    for (const link of links) {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            // Scroll to the target element smoothly
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    }
});
