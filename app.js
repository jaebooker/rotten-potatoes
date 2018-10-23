const express = require('express')
const app = express()
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rotten-potatoes');
const Review = mongoose.model('Review', {
  title: String,
  movieTitle: String
});
var exphbs = require('express-handlebars');
let reviews = [
  { title: "Amazing film. Terrontino breaves new life in the GWTW franchise, with Cumberbatch playing a devious Rhett Butler", movieTitle: "2 Gone 2 Wind" },
  { title: "...what?", movieTitle: "Titanic II - Jack's Okay" },
  { title: "A stunning, even more violent sequel, in the style of a John Wick-esque vendetta film", movieTitle: "Passion II: Resurrection" },
  { title: "Shakespeare would be proud.", movieTitle: "A Midsummer Night's Dream: Apocalypse" }
]
app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.get('/', (req, res) => {
    Review.find()
    .then(reviews => {
        res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
        console.log(err);
    })
  //res.render('reviews-index', { reviews: reviews });
})
