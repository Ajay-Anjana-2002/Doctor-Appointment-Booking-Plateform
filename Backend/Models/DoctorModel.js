import mongoose, { Schema, model } from "mongoose";

const doctorSchema = new Schema(
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

        speciality: {
            type: String,
            required: true,
        },

        degree: {
            type: String,
            required: true,
        },

        experience: {
            type: String,
            required: true,
        },

        about: {
            type: String,
            required: true,
        },

        fees: {
            type: Number,
            required: true,
        },

        available: {
            type: Boolean,
            default: true,
        },

        address: {
            line1: { type: String, default: "" },
            line2: { type: String, default: "" },
        },

        slots_booked: {
            type: Map,
            of: [String],
            default: {},
        },
    },
    {
        timestamps: true,
    }
);

const Doctor = mongoose.models.Doctor || model("Doctor", doctorSchema);
export default Doctor;
