import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
    .connect(process.env.DATABASE_URL, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    })
    .then(() => {
        console.log("CONNECTION SUCCESSFULL");
    })
    .catch(() => {
        console.log("NOT CONNECT");
    });
