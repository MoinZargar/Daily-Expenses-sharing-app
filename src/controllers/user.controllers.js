import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.models.js";
import { apiError } from "../utils/apiError.js";

const registerUser = asyncHandler(async (req, res) => {
   //take data from frontend
   const { name, email, mobileNumber, password } = req.body;

   if (
      [name, email, mobileNumber, password].some((feild) => (
         feild?.trim === ""
      ))

   ) {
      throw new apiError(400, "All feilds are required")
   }
   //check if user already exits in database 
   const existedUser = User.findOne({
      $or: [
         { name },
         { email },
      ]
   })
   if (existedUser) {
      throw new apiError(409, "User with email or name already exists")
   }

   //store user in database

   const user = await User.create({
      name,
      email,
      mobileNumber,
      password
   })
   // check if user is stored successfully in db and remove password and refresh Token
   const createdUser = User.findById(user._id).select(
      "-password -refreshToken"
   )

   if (!createdUser) {
      throw new apiError(500, "Something went wrong while registering a user")
   }

   //return response to frontend

   return res.status(201).json(
      new apiResponse(200,createdUser,"User registered successfully")
   )
}
)

export { registerUser }