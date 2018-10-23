const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost/rotten-potatoes');
const Review = mongoose.model('Review', {
  title: String,
  movieTitle: String,
  movieRating: Number,
  description: String
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
app.use(methodOverride('_method'))
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
app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});
})
app.post('/reviews', (req, res) => {
    Review.create(req.body).then((review) => {
        console.log("creating a new review in 5...")
        res.redirect('/reviews/${review._id}');
    }).catch((err) => {
        console.log(err.message);
    })
})
app.get('/reviews/:id', (req, res) => {
    Review.findById(req.params.id).then((review) => {
        res.render('reviews-show', { review: review })
    }).catch((err) => {
        console.log(err.message);
    })
});
app.get('/reviews/:id/edit', (req, res) => {
    Review.findById(req.params.id, function(err, review) {
        res.render('reviews-edit', { review: review });
    })
})
app.put('/reviews/:id/', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
        res.redirect(`/reviews/${review._id}`)
    })
    .catch(err => {
        console.log(err.message)
    })
})
//Terrontino has released perhaps his finest work in this long-anticipated Gone With The Wind sequel, starring Jennifer Lawrence as a very captivating Scarlet, and Benedict Cumberbatch as the devious, but sexy, Rhett Butler. The film begins ten minutes after the first one ended, when Yankee deserters from the war decide to try to take Terra by force, but Scarlet is having none of it!
