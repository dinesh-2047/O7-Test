// ● GET /reports/class/:travelClass → Total bookings and total fare for a specific class (e.g., 
// Luxury) 
// ● GET /reports/fare-over/:amount → List bookings where finalFare > amount 
// ● GET /reports/daily-summary → For each day: 
// ○ Total bookings 
// ○ Total revenue 
// ○ Average fare per booking


import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Booking } from "../models/booking.model.js";

 
