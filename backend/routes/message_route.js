import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { getMessages, getUserForSlidebar, sendMessages } from "../controllers/messageController.js";

const router = express.Router();

router.get('/users',protectRoute,getUserForSlidebar)

router.get("/:id", protectRoute,getMessages);

router.post("/send/:id", protectRoute, sendMessages);

export default router