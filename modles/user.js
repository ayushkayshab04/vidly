import Joi from "joi";
import jwt from "jsonwebtoken";
import config from "config"
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 255

    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    isAdmin: Boolean
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'))
    return token;
}
const User = mongoose.model("User", userSchema)


function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).required(),
        email: Joi.string().min(5).required(),
        password: Joi.string().min(5).required()
    })
    return schema.validate(user)
}





export {
    User,
    validateUser
}