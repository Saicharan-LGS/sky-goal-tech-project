import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { userRouter } from "./routes/userRoutes.js";
import connectDatabase from "./db.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3009;

app.use(cors());
app.use(express.json());
app.use(express.static("uploads"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDatabase();
});
