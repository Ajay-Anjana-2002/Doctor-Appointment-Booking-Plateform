import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
        },

        image: {
            type: String,
            default: "",
        },

        phone: {
            type: String,
            default: "",
        },

        gender: {
            type: String,
            enum: ["Male", "Female", "Other", "Not Selected"],
            default: "Not Selected",
        },

        dob: {
            type: String,
            default: "",
        },

        address: {
            line1: { type: String, default: "" },
            line2: { type: String, default: "" },
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || model("User", userSchema);
export default User;
