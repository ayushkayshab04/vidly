import mongoose from "mongoose";
import { genreSchema } from "../modles/genres.js"
import Joi from "joi";

const Movie = mongoose.model("Movie", new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: { type: Number, require: true },
    dailyRentalRate: { type: Number, require: true }

}))

function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        genreId: ObjectId().required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    })
    return schema.validate(movie)
}

export {
    Movie,
    validateMovie,
}