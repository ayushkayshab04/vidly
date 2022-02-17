import express from "express";
import config from "config";
import winston from "winston"
import Joi from "joi";
import JoiObjectId from "joi-objectid";
import mongoose from "mongoose";
import app from "./startup/routes.js"


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



app.listen(port, () => {
    console.log(`The server started on port ${port}`)
})