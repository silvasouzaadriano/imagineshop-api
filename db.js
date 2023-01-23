import mongoose from "mongoose";

const url = process.env.MONGODB_URL

mongoose.set('strictQuery', true);

mongoose.connect(url);

export default mongoose;
