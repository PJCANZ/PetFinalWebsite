
// review.js

function saveReviewToServer(rating, comment, username) {
    // Send review data to the server's API endpoint
    fetch('/api/save-review', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            rating: rating,
            comment: comment,
            username: username
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Failed to save review');
    })
    .then(data => {
        // Handle successful response from the server if needed
        console.log('Review saved:', data);
        // You can update the UI or display a success message here
    })
    .catch(error => {
        console.error('Error saving review:', error);
        // Handle error - show message to user
    });
}

// Function to handle review submission
function submitReview() {
    var rating = document.querySelector('input[name="rating"]:checked');
    var comment = document.getElementById('comment').value;
    var username = document.getElementById('username').value;

    if (rating && comment && username) {
        saveReviewToServer(rating.value, comment, username);
        // Reset the form after submission
        document.querySelector('input[name="rating"]:checked').checked = false;
        document.getElementById('comment').value = '';
        document.getElementById('username').value = ''; // Clear the username input field
    } else {
        alert('Please select a rating, provide a comment, and enter your username.');
    }
}
