import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";



const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;

    if(!name || !email || !password) {
        throw new ApiError(400, "Name, email and password are required");
    }


    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(400, "Email already in use");
    }

    const newUser = new User({ name, email, password, role });
    await newUser.save();

    const accessToken = newUser.generateAccessToken();
    const refreshToken = newUser.generateRefreshToken();

    return res.status(201).json(
        new ApiResponse(
            201,
            { user: newUser, accessToken, refreshToken },
            "User registered successfully"
        )
    );
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.isPasswordCorrect(password))) {
        throw new ApiError(401, "Invalid email or password");
    }
    

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();


    return res.status(200).json(
        new ApiResponse(
            200, 
            { user, accessToken, refreshToken },
            "User logged in successfully"
        )
    );
});


export { registerUser, loginUser };