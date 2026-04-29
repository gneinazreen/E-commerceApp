import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dns from "node:dns/promises"
dns.setServers(["8.8.8.8","1.1.1.1"])
import connectDb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
// Test Route
app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

// Start Server
const startServer = async () => {
    try {
        await connectDb();
        await connectCloudinary();

        app.listen(PORT, () => {
            console.log(`✓ Server started on PORT: ${PORT}`);
        });

    } catch (error) {
        console.error("✗ Server failed to start:", error.message);
    }
};

startServer();