import express from "express";
import { initMongoDB } from "./config/db-connection.js";
import userRouter from "./routes/user-router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRouter);

initMongoDB()
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

app.listen(8080, () => console.log("server ok on port 8080"));
