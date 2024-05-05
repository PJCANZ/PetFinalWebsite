let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('nav');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
            });
            document.querySelector('header nav a[href*="' + id + '"]').classList.add('active');
        }
    });
};

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Function to save review to localStorage
function saveReview(rating, comment, username) {
    var reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push({
        rating: rating,
        comment: comment,
        username: '-' + username // Prepend a hyphen "-" to the username
    });
    localStorage.setItem('reviews', JSON.stringify(reviews));
}

// Function to display reviews from localStorage
function displayReviews() {
    var reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    var reviewList = document.getElementById('reviewList');
    reviewList.innerHTML = '';

    // Variable to count the number of reviews
    var numReviews = reviews.length;

    // Check if the number of reviews exceeds 3
    if (numReviews > 3) {
        // Apply CSS class to enable scrollbar
        reviewList.classList.add('scrollbar');
    } else {
        // Remove CSS class to disable scrollbar
        reviewList.classList.remove('scrollbar');
    }

    reviews.forEach(function(review) {
        var stars = '';
        for (var i = 0; i < parseInt(review.rating); i++) {
            stars += '★';
        }
        var reviewHtml = '<div class="review"><div class="stars">' + stars + '</div><div class="username">' + review.username + '</div><div class="comment">' + review.comment + '</div></div>';
        reviewList.innerHTML += reviewHtml;
    });
}

// Function to handle review submission
function submitReview() {
    var rating = document.querySelector('input[name="rating"]:checked');
    var comment = document.getElementById('comment').value;
    var username = document.getElementById('username').value;

    if (rating && comment && username) {
        saveReview(rating.value, comment, username);
        displayReviews();
        // Reset the form after submission
        document.querySelector('input[name="rating"]:checked').checked = false;
        document.getElementById('comment').value = '';
        document.getElementById('username').value = ''; // Clear the username input field
    } else {
        alert('Please select a rating, provide a comment, and enter your username.');
    }
}

// Display existing reviews on page load
displayReviews();
