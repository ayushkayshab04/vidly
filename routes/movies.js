import express from "express";
import Joi from "joi";
import { Genre } from "../modles/genres.js";
import { Movie, validateMovie } from "../modles/movies.js"

const router = express.Router()


router.get("/", async (req, res) => {
    const movie = await Movie.find().sort("name");
    res.send(movie)
})

router.post("/", async (req, res) => {

    const { error } = validateMovie(req.body)
    if (error) res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.sendStatus(400).send("Invalid genre.");

    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    })
    await movie.save()
    res.send(movie)

})

router.get("/:id", async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.send(movie)
})


router.put("/:id", async (req, res) => {
    const { error } = validateMovie(req.body)
    if (error) res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId)
    if (!genre) res.send("The movie with the following genre id is not found")
    const movie = await Movie.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    }, {
        new: true
    })

    if (!movie) res.status(404).send("The genre with the given is is not found")
    res.send(movie);

})

router.delete("/:id", async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);

    if (!movie) res.status(404).send("The movie with the given is is not found")

    res.send(movie)

})


export default router;