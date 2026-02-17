import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/Prescripto`);
        console.log("Database Connected");
    } catch (error) {
        console.log("MongoDB Error", error.message);
        process.exit(1);
    };
};

export default connectDB;