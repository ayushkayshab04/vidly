import express from "express";
import auth from "../middleware/auth.js"
import admin from "../middleware/admin.js"
import Joi from "joi";
import { Genre } from "../modles/genres.js"
import "express-async-errors";





const router = express.Router();



router.get("/", async (req, res) => {
    const genre = await Genre.find().sort("name");
    res.send(genre)



});

router.post("/", auth, async (req, res) => {



    const { error } = validateGenres(req.body)
    if (error) res.status(400).send(error.details[0].message);

    const genre = new Genre({ name: req.body.name })
    await genre.save()
    res.send(genre)

})

router.get("/:id", async (req, res) => {

    const genre = await Genre.findById(req.params.id)
    if (!genre) res.status(404).send("The genre with the given is is not found")

    res.send(genre)

})

router.put("/:id", async (req, res) => {
    const { error } = validateGenres(req.body)
    if (error) res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    })

    if (!genre) res.status(404).send("The genre with the given is is not found")
    res.send(genre);

})

router.delete("/:id", [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if (!genre) res.status(404).send("The genre with the given is is not found")

    res.send(genre)

})



function validateGenres(genre) {
    const schema = Joi.object({
        name: Joi.string().min(5).required()
    })
    return schema.validate(genre);
}

export default router;