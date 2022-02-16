import express from "express";
import config from "config";
import Joi from "joi";
import users from "./routes/user.js"
import JoiObjectId from "joi-objectid";
import genres from "./routes/genres.js"
import customer from "./routes/customers.js"
import mongoose from "mongoose";
import movie from "./routes/movies.js"
import rental from "./routes/rental.js"
import auth from "./routes/auth.js"

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.')
    process.exit(1);
}

mongoose.connect("mongodb://localhost/vidly")
    .then(() => console.log("connected to database"))
    .catch(err => console.log(err.message));

const port = process.env.PORT || 5000
const app = express();
app.use(express.json({ extended: true }));
app.use("/api/genres", genres)
app.use("/api/customers", customer)
app.use("/api/movies", movie)
app.use("/api/rentals", rental)
app.use("/api/users", users)
app.use("/api/auth", auth)

app.use(function (err, req, res, next) {
    res.status(500).send("Something failed.");
})


app.listen(port, () => {
    console.log(`The server started on port ${port}`)
})