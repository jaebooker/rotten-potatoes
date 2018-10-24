const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const Review = require('../models/review');

const sampleReview = {
    "title": "...what?",
    "movieTitle": "Titanic 2: Jack's Okay",
    "description": "Wha... what is this? I can't even."
}
chai.use(chaiHttp);

describe('Reviews', ()  => {

    after(() => {
      Review.deleteMany({title: '...what?'}).exec((err, reviews) => {
        console.log(reviews)
        reviews.remove();
      })
    });
  it('should index ALL reviews on / GET', (done) => {
    chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
  });
  it('should open reviews template', (done) => {
    chai.request(server)
        .get('/reviews/new')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
  });
  it('should post new review', (done) => {
    chai.request(server)
        .post('/reviews')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
          done();
        });
  });
  it('should get selected review', (done) => {
    var review = new Review(sampleReview);
    review.save((err, data) => {
        chai.request(server)
        .get(`/reviews/${data._id}`)
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html
            done();
        });
    });
  });
  it('shoud get edit page on selected review', (done) => {
      var review = new Review(sampleReview);
      review.save((err, data) => {
          chai.request(server)
          .get(`/reviews/$(data._id)/edit`)
          .end((err, res) => {
              res.should.have.status(200);
              res.should.be.html
              done();
          });
      });
  });
  it('should create a review', (done) => {
      chai.request(server)
      .post('/reviews')
      .send(sampleReview)
      .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html
          done();
      });
  });
  it('should update a review', (done) => {
      var review = new Review(sampleReview);
      review.save((err, data) => {
          chai.request(server)
          .put(`/reviews/${data._id}?_method=PUT`)
          .send({'title': 'This is actually amazing'})
          .end((err, res) => {
              res.should.have.status(200);
              res.should.be.html
              done();
          });
      });
  });
  it('should delete review selected', (done) => {
      var review = new Review(sampleReview);
      review.save((err, data) => {
          chai.request(server)
          .delete(`/reviews/${data._id}?_method=DELETE`)
          .end((err, res) => {
              res.should.have.status(200);
              res.should.be.html
              done();
          });
      });
  });
});
