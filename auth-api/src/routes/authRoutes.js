import express from "express"
import { registerUser, loginUser, getProfile, changePassword } from "../controllers/authController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/profile", authenticate, getProfile)

router.put("/change-password", authenticate, changePassword)

export default router;