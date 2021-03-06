import express from "express";
import config from "config";
import winston from "winston"
import Joi from "joi";
import users from "./routes/user.js"
import JoiObjectId from "joi-objectid";
import genres from "./routes/genres.js"
import customer from "./routes/customers.js"
import mongoose from "mongoose";
import movie from "./routes/movies.js"
import rental from "./routes/rental.js"
import auth from "./routes/auth.js"
import error from "./middleware/error.js"
import "./startup/prod.js"




if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined.')
    process.exit(1);
}

winston.handleExceptions(
    new winston.transports.File({ filename: "uncaughtException.log" })
)

process.on("unhandledRejection", (ex) => {
    throw ex;
})


winston.add(winston.transports.File, { filename: "error.log" })

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

app.use(error)


app.listen(port, () => {
    console.log(`The server started on port ${port}`)
})