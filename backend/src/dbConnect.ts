import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
const DB_URL : string = String ( process.env.DB_URL );

const dbConnect = async () => {
  try {
    await mongoose.connect(DB_URL);
  } catch (e) {
    console.error(e);
  }
};

export default dbConnect;
