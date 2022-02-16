import mongoose from "mongoose";
import Joi from "joi";


const Customer = mongoose.model("Customer", new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50

    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    isGold: {
        type: Boolean,
        dafault: false
    }
}));




export default Customer;
