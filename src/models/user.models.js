import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import validator from 'validator';

const mobileNumberRegex = /^\+?[1-9]\d{1,14}$/ 

const validateMobileNumber = (mobileNumber) => {
    return mobileNumberRegex.test(mobileNumber);
};

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            validate: [validator.isEmail, 'Invalid email address'],
        },
        mobileNumber: {
            type: String,
            unique: [true, "Mobile number is already in use."],
            validate: {
                validator: validateMobileNumber,
                message: "Invalid Mobile number.",
            },
            required:true,
            default: "",
        },
        password: {
            type: String,
            required: true
        },
        refreshToken : {
            type : String
        }

    },
    {
        timestamps: true
    }
)
// hashing password before saving it in a database  

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

//Password Authentication

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

//Generating Access Token

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
          _id: this._id,
          name: this.name,
          email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

//Generating Refresh Token

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
          _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)