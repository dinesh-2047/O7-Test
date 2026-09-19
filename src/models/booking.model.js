import {} from 'dotenv/config';
import mongoose, { Schema } from "mongoose";


const bookingSchema = new Schema({

    name: {
        type: String,
        required: true,
    }, 

    fare: {
        type: Number,
        required: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

}, { timestamps: true });

export const Booking = mongoose.model("Booking", bookingSchema);