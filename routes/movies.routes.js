// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require('./../models/Movie.model');
const Celebrity = require('./../models/Celebrity.model');
require('../db');

// all your routes here
router.get("/movies/create", (req, res, next) =>
    Celebrity.find()
        .then((response) => {
            console.log(response);
            res.render("movies/new-movie", { response });
        })
        .catch((err) => {
            next(err);
        })
);

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

router.get('/movies/:id', (req, res, next) => {
    const { id } = req.params;
    console.log(id)

    Movie.findById(id)
        .then(movieToEdit => {

            console.log("hola", movieToEdit);
            res.render('movies/movie-details.hbs', movieToEdit);
        })
        .catch(error => next(error));
});

// router.post('/drones/:id/edit', (req, res, next) => {
//     console.log(req.body);
//     const { name, propellers, maxSpeed } = req.body;
//     const { Id } = req.params;

//     Drone.findByIdAndUpdate(Id, { name, propellers, maxSpeed }, { new: true })
//         .then(updatedDrones => res.redirect(`/drones/${updatedDrones.id}`))
//         .catch(error => next(error));
// });


module.exports = router;