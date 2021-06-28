import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import userRoutes from "./routes/userRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";

// express init
const app = express();

// config
dotenv.config({ path: "./config/config.env" });

// connect DB
connectDB();

// body-parser
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb", extended: true }));

// morgan
app.use(morgan("dev"));

// cors
app.use(cors());

// routes
app.get("/", (req, res) => {
  res.send("hello");
});
app.use("/user", userRoutes);
app.use("/blog", blogRoutes);

// post
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log("Server started at PORT", PORT));
