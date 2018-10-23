const mongoose = require('mongoose');
const Review = mongoose.model('Review', {
    title: String,
    movieTitle: String,
    movieRating: Number,
    description: String
});
module.exports = Review;
