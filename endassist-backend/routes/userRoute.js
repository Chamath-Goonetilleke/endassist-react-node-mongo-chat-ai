import express from "express";
import { body } from "express-validator";
import { deleteUser, getMeals, getUserById, login, registerUser, sendOTP, updateMeals, updatePassword, updateUser, verifyOtp } from "../controller/userController.js";
const router  = express.Router();

router.post("/register", [
  body("name").notEmpty().withMessage("Full name is required"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email"),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
], registerUser);
router.post("/login", login);
router.get("/:id", getUserById);
router.delete("/deleteUser/:id", deleteUser);

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOtp);
router.put("/update-password", updatePassword);
router.put("/update-user", updateUser);
router.put("/update-meal", updateMeals);

router.get("/meals/:id", getMeals);



export default router;