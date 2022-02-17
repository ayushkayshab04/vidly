import express from "express";
import movie from "../routes/movies.js"
import rental from "../routes/rental.js"
import auth from "../routes/auth.js"
import users from "../routes/user.js"
import genres from "../routes/genres.js"
import customer from "../routes/customers.js"
import error from "../middleware/error.js"


export default function (app) {
    app.use(express.json({ extended: true }));
    app.use("/api/genres", genres)
    app.use("/api/customers", customer)
    app.use("/api/movies", movie)
    app.use("/api/rentals", rental)
    app.use("/api/users", users)
    app.use("/api/auth", auth)

    app.use(error)
}