// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require('./../models/Movie.model');
require('../db');

// all your routes here
router.get('/movies/create', (req, res, next) => res.render('movies/new-movie'));


router.post('/movies/create', (req, res, next) => {
    console.log(req.body);
    const { title, genre, plot, cast } = req.body;

    Movie.create({ title, genre, plot, cast })

        .then(() => res.redirect('/movies'))
        .catch(error => res.render('movies/new-movie'));
});

router.get('/movies', (req, res, next) => {
    // List the movies
    Movie.find()
        .then(response => {
            console.log("hola", { response });
            res.render("movies/movies.hbs", { response });
        })
        .catch(error => console.log(error));
});


module.exports = router;