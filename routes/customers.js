import express from "express";
import Joi from "joi";
import mongoose from "mongoose";
import Customer from "../modles/customers.js"





const router = express.Router();

router.get("/", async (req, res) => {
    const customer = await Customer.find().sort("name");
    res.send(customer)
})

router.post("/", async (req, res) => {

    const { error } = validateCustomer(req.body)
    if (error) res.status(400).send(error.details[0].message);

    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isgold
    })
    await customer.save()
    res.send(customer)

})

router.get("/:id", async (req, res) => {

    const customer = await Customer.findById(req.params.id)
    if (!customer) res.status(404).send("The customer with the given id is not found")

    res.send(customer)

})

router.put("/:id", async (req, res) => {
    const { error } = validateCustomer(req.body)
    if (error) res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id,
        {
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        },
        { new: true })

    if (!customer) res.status(404).send("The genre with the given is is not found")
    res.send(customer);

})

router.delete("/:id", async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) res.status(404).send("The customer with the given is is not found")

    res.send(customer)

})

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean().required()
    })
    return schema.validate(customer);
}


export default router;