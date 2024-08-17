// script.js



function checkPassword() {
    var password = document.getElementById("passwordInput").value;
    var errorContainer = document.getElementById("errorContainer");

    // Clear previous error message
    errorContainer.textContent = '';


    if (password === "12345") {
        document.querySelector(".password-container").style.display = "none";
        document.getElementById("projects-content").style.display = "block"; // Show the content
    } else {
        // Display error message
            errorContainer.textContent = "Incorrect password. Please try again.";
            document.getElementById("passwordInput").value = ''; // Clear the input field
    }
}
// Hide content initially
window.onload = function() {
    document.getElementById("projects-content").style.display = "none";
};

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
