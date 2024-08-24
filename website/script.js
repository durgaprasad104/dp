// script.js

function toggleMenu() {
    var menu = document.getElementById("menu");
    menu.classList.toggle("active");
}

// mobile menu hamburger

document.getElementById("menu-icon").addEventListener("click", function() {
    var menu = document.getElementById("menu");
    var icon = document.getElementById("menu-icon");

    // Toggle the menu's active class
    menu.classList.toggle("active");

    // Toggle the icon's active class
    if (menu.classList.contains("active")) {
        icon.innerHTML = "&times;"; // Change to 'X'
    } else {
        icon.innerHTML = "&#9776;"; // Change back to hamburger
    }
});


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


function searchSites() {
    var input = document.getElementById('searchInput').value.toLowerCase();
    var titles = document.getElementById('siteTitles').getElementsByTagName('li');
    var found = false;

    for (var i = 0; i < titles.length; i++) {
        var title = titles[i].innerText.toLowerCase();
        if (title.includes(input)) {
            var url = titles[i].getAttribute('data-url');
            found = true;
            window.location.href = url; // Redirect to the matched page
            break;
        }
    }

    if (!found) {
        alert("No matches found."); // Display popup message
    }
     // Clear the search input box after searching
     document.getElementById('searchInput').value = '';
}


// Function to check if the element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}


document.getElementById('adjustQualityButton').addEventListener('click', function() {
    const fileInput = document.getElementById('fileInput');
    const sizeInput = parseFloat(document.getElementById('qualitySizeInput').value);
    const sizeUnit = document.getElementById('qualitySizeUnit').value;

    if (fileInput.files.length === 0 || isNaN(sizeInput) || sizeInput <= 0) {
        alert('Please upload a file and enter a valid size.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();
    const targetSize = sizeUnit === 'MB' ? sizeInput * 1024 : sizeInput; // Convert MB to KB

    reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;

            let quality = 1.0;
            const maxQuality = 0.1; // Minimum quality to avoid excessively poor image quality

            function adjustQuality() {
                canvas.toBlob(function(blob) {
                    if (blob.size / 1024 > targetSize && quality > maxQuality) {
                        quality -= 0.05; // Reduce quality
                        adjustQuality(); // Recompress
                    } else {
                        const url = URL.createObjectURL(blob);
                        document.getElementById('resultImage').src = url;
                        document.getElementById('downloadLink').href = url;
                    }
                }, 'image/jpeg', quality);
            }

            ctx.drawImage(img, 0, 0);
            adjustQuality();
        };

        img.src = event.target.result;
    };

    reader.readAsDataURL(file);
});
/* project2*/

