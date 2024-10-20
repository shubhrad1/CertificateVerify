const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();

const DB_URL = process.env.DB_URL;
const connectDB = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log("[DATABASE] Database connected successfully");
    } catch (err) {
        console.log("[DATABASE] Error:", err);
    }
};

module.exports = connectDB;
