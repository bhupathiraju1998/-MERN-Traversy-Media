import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
dotenv.config();
const port = process.env.port || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  console.log("server is ready");
});
app.use(notFound);
app.use(errorHandler);

mongoose
  .connect("mongodb://0.0.0.0:27017/merntraversmedia")
  .then(() => {
    console.log("mongoose connected");
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch(() => {
    console.log("failed");
    process.exit(1);
  });
