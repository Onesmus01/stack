import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();



const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log("DB Connected successfully");
        });

        mongoose.connection.on('error', (error) => {
            console.error("DB Connection error:", error);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn("DB Disconnected. Attempting reconnection...");
        });

        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: 'stackApp',
            serverSelectionTimeoutMS: 15000,
            socketTimeoutMS: 45000
        });
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
};
export default connectDB;
