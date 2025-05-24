import express from "express";
import authMiddleware from "../Middleware/authMiddleware.js";
import { getMe, getUsers } from "../Controllers/userController.js";

const router = express.Router();

//get all users
router.get("/", getUsers);
//get user
router.get("/me", authMiddleware, getMe);

export default router;
