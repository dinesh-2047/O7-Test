
import { Booking } from "../models/booking.model.js";
import { User } from "../models/user.model.js";
import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";

import {createBooking, getBookings, getBookingById, updateBooking, deleteBooking, } from "../controllers/booking.controllers.js";


const router = Router();



//  POST /bookings → Create booking and calculate fare using rules: 
// ❖ GET /bookings?page=&limit → List bookings with pagination 
// ❖ GET /bookings/:id → Get booking details 
// ❖ PUT /bookings/:id → Update booking (recalculate fare if inputs change) 
// ❖ DELETE /bookings/:id → Delete booking

router.route('/bookings/create').post(verifyJWT, createBooking);
router.route('/bookings').get(verifyJWT, getBookings);
router.route('/bookings/:id').get(verifyJWT, getBookingById);
router.route('/bookings/:id').put(verifyJWT, updateBooking);
router.route('/bookings/:id').delete(verifyJWT, deleteBooking);


export default router ; 
