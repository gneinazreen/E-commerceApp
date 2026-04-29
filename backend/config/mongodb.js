import mongoose from "mongoose";

const connectDb = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("✓ MongoDB connected");
        });

        mongoose.connection.on("error", (err) => {
            console.log("✗ MongoDB error:", err);
        });

        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "e-commerce",
        });

    } catch (error) {
        console.error("✗ DB connection failed:", error.message);
        process.exit(1);
    }
};

export default connectDb;