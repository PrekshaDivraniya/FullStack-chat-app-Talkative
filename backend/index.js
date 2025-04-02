import express from "express";
import authRoutes from "./routes/auth_route.js";
import messageRoutes from "./routes/message_route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./lib/socket.js";

import path from 'path'

dotenv.config();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve()

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);


if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req,res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  })
}

server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
  connectDB();
});
