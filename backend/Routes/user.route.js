import express from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../Controlles/user.controller.js";

import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all users (Admin only)
router.get("/", verifyToken, isAdmin, getAllUsers);

// Other CRUD
router.post("/", createUser);
router.get("/:id", verifyToken, isAdmin, getUserById);
router.put("/:id", verifyToken, isAdmin, updateUser);
router.delete("/:id", verifyToken, isAdmin, deleteUser);

export default router;
