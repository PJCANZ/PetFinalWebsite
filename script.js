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

// Function to display reviews from user.txt
function displayReviews() {
    // Load reviews from user.txt
    fetch('user.txt')
        .then(response => response.text())
        .then(reviewsText => {
            var reviews = [];
            // Split reviewsText into individual reviews
            var reviewLines = reviewsText.trim().split('\n');
            reviewLines.forEach(line => {
                var parts = line.split('|');
                var review = {
                    rating: parts[0],
                    comment: parts[1],
                    username: parts[2]
                };
                reviews.push(review);
            });

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
        })
        .catch(error => {
            console.error('Error fetching reviews:', error);
        });
}
