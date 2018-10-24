const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const reviews = require('./controllers/reviews')(app);
//const reviews = require('./controllers/reviews')(app);
// const Review = mongoose.model('Review', {
//   title: String,
//   movieTitle: String,
//   movieRating: Number,
//   description: String
// });
//const reviews = require('./controllers/reviews')(app, Review);
mongoose.connect('mongodb://localhost/rotten-potatoes');
app.use(bodyParser.urlencoded({ extended: true }));
var exphbs = require('express-handlebars');
// let reviews = [
//   { title: "Amazing film. Terrontino breaves new life in the GWTW franchise, with Cumberbatch playing a devious Rhett Butler", movieTitle: "2 Gone 2 Wind" },
//   { title: "...what?", movieTitle: "Titanic II - Jack's Okay" },
//   { title: "A stunning, even more violent sequel, in the style of a John Wick-esque vendetta film", movieTitle: "Passion II: Resurrection" },
//   { title: "Shakespeare would be proud.", movieTitle: "A Midsummer Night's Dream: Apocalypse" }
// ]
app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.use(methodOverride('_method'))
app.set('view engine', 'handlebars');
// const reviews = require('./controllers/reviews')(app, Review);
//Terrontino has released perhaps his finest work in this long-anticipated Gone With The Wind sequel, starring Jennifer Lawrence as a very captivating Scarlet, and Benedict Cumberbatch as the devious, but sexy, Rhett Butler. The film begins ten minutes after the first one ended, when Yankee deserters from the war decide to try to take Terra by force, but Scarlet is having none of it!
module.exports = app;
