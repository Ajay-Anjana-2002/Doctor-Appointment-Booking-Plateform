import mongoose, { Schema, model } from "mongoose";

const appointmentSchema = new Schema(
    {
        userID: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        docID: {
            type: Schema.Types.ObjectId,
            ref: "Doctor",
            required: true,
        },

        slotDate: {
            type: String,
            required: true,
        },

        slotTime: {
            type: String,
            required: true,
        },

        amount: {
            type: Number,
            required: true,
        },

        payment: {
            type: Boolean,
            default: false,
        },

        cancelled: {
            type: Boolean,
            default: false,
        },

        isCompleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Appointment =
    mongoose.models.Appointment ||
    model("Appointment", appointmentSchema);

export default Appointment;
