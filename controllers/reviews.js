//const Review = require('../models/review');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
module.exports = function(app, Review) {
    app.use(methodOverride('_method'))
    app.use(bodyParser.urlencoded({ extended: true }));
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
        res.redirect(`/reviews/${review._id}`);
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
app.delete('/reviews/:id', function (req, res) {
  console.log("It is over for you, review!")
  Review.findByIdAndRemove(req.params.id).then((review) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})
}
