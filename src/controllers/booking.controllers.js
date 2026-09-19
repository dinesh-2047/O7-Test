import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Booking } from "../models/booking.model.js";
import { User } from "../models/user.model.js";


const createBooking = asyncHandler(async (req, res) => {
    const { name, fare } = req.body;

    if (!name || !fare) {
        throw new ApiError(400, "Name and fare are required");
    }

    const user = await User.findById(req?.user?._id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const booking = await Booking.create({
        name,
        fare,
        user: user?._id
    });

    return res.status(201).json(new ApiResponse(201, booking, "Booking created successfully"));
});


const getBookings = asyncHandler(async (req, res) => {

    const bookings = await Booking.find({ user: req?.user?._id }).populate("user", "-password -refreshToken");

    return res.status(200).json(new ApiResponse(200, bookings, "Bookings retrieved successfully"));
});


const getBookingById = asyncHandler(async (req, res) => {      
    const {id} = req.params; 

    const booking = await Booking.findById(id).populate("user", "-password -refreshToken");

    if (!booking) {
        throw new ApiError(404, "Booking not found ");
    } 
    
    if (booking?.user?._id.toString() !== req?.user?._id.toString()) {
        throw new ApiError(403, "You are not authorized to view this booking");
    }

    return res.status(200).json(new ApiResponse(200, booking, "Booking retrieved successfully"));
});


const updateBooking = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, fare } = req.body;    

    const booking = await Booking.findById(id).populate("user", "-password -refreshToken");

    if (!booking) {
        throw new ApiError(404, "Booking not found ");
    } 
    
    if (booking?.user?._id.toString() !== req?.user?._id.toString()) {
        throw new ApiError(403, "You are not authorized to update this booking");
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
        id,
        { name, fare },
        { new: true }
    ).populate("user", "-password -refreshToken");

    return res.status(200).json(new ApiResponse(200, updatedBooking, "Booking updated successfully"));
});


const deleteBooking = asyncHandler(async (req, res) => {
    const {id} = req.params; 

    const booking = await Booking.findById(id).populate("user", "-password -refreshToken");

    if (!booking) {
        throw new ApiError(404, "Booking not found ");
    }

    if (booking?.user?._id.toString() !== req?.user?._id.toString()) {
        throw new ApiError(403, "You are not authorized to delete this booking");
    }

    await Booking.findByIdAndDelete(id);

    return res.status(200).json(new ApiResponse(200, null, "Booking deleted successfully"));
});



const getBookingHistory = asyncHandler(async (req, res) => {
    const bookings = await Booking.find({ user: req?.user?._id }).sort({ createdAt: -1 }).populate("user", "-password -refreshToken");

    return res.status(200).json(new ApiResponse(200, bookings, "Booking history retrieved successfully"));
});

export  { createBooking, getBookings, getBookingById, updateBooking, deleteBooking };