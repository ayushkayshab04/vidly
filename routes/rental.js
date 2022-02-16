import express from "express";
import Customer from "../modles/customers.js";
import mongoose from "mongoose";
import { Movie } from "../modles/movies.js"
import { Rental, validateRental } from "../modles/rental.js"

const router = express.Router();


router.get("/", async (req, res) => {
    const rental = await Rental.find().sort("-dateOut");
    res.send(rental)
})

router.post("/", async (req, res) => {

    const { error } = validateRental(req.body)
    if (error) res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.sendStatus(400).send("Invalid customer.");

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.sendStatus(400).send("Invalid movie.");

    if (movie.numberInStock === 0) return res.status(400).send("movie not available for rental")

    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    })

    const session = await Rental.startSession();
    session.startTransaction();

    try {
        rental = await rental.save();
        movie.numberInStock--;
        movie.save()

        await session.commitTransaction();
        session.endSession();

        return res.send(rental)
    } catch (err) {
        await session.abortTransaction();
        session.endSession();

        console.log(err);
        return res.status(500).send(err.message);
    }


})


router.get("/:id", async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    res.send(rental)
})


router.delete("/:id", async (req, res) => {
    const rental = await Rental.findByIdAndRemove(req.params.id);
    if (!rental) res.status(404).send("Item not found")
    res.send(rental)
})






export default router;