import _ from "lodash";
import bcrypt from "bcrypt";
import config from "config";
import Joi from "joi";
import jwt from "jsonwebtoken";
import express from "express";
import mongoose from "mongoose";
import { User } from "../modles/user.js"

const router = express.Router();

router.post("/", async (req, res) => {
    const { error } = validateUser(req.body)
    if (error) res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email })
    if (!user) res.status(400).send("Invalid email or password ")

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) res.status(400).send("Invalid email or password ")

    const token = user.generateAuthToken();
    res.send(token)

});


function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string().min(5).required(),
        password: Joi.string().min(5).required()
    })
    return schema.validate(user)
}




export default router;















