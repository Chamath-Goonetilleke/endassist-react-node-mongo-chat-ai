import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import User from "../model/User.js";
import * as crypto from "crypto";
import { sendOTPEmail, verifyOTP } from "../util/emailService.js";

export async function registerUser(req, res) {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array()[0].msg);
    }

    const { name, email, dob, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }
    const user = new User({
      name,
      email,
      dob,
      password: hashedPassword,
      meals: null,
    });

    await user.save();
    res.status(200).send("User successfully registered");
  } catch (error) {
    res.status(500).send(error + "");
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) return res.status(400).send("Invalid email or password");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).send("Invalid email or password");

    const token = user.generateAuthToken();

    res.header("x-auth-token", token);
    res.status(200).send(token);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(400).send("No user found");
    delete user.password;

    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function deleteUser(req, res) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).send("Deleted Successfully");
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function sendOTP(req, res) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) return res.status(400).send("Invalid email");

    const result = await sendOTPEmail(email, user.name);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}
export async function verifyOtp(req, res) {
  try {
    const { email, otp } = req.body;
    const isValid = verifyOTP(email, otp);

    res.status(200).send({ success: isValid });
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function updatePassword(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).send("Invalid email");

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();
    res.status(200).send("Password updated successfully");
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function updateUser(req, res) {
  try {
    console.log("first")
    const { id, name, dateOfBirth } = req.body;
    const user = await User.findById(id);

    user.name = name;
    user.dob = dateOfBirth;

    await user.save();

    console.log(user)

    const token = user.generateAuthToken();
    console.log(token)
    res.header("x-auth-token", token);
    res.status(200).send({ token: token, message: "Updated successfully" });

  } catch (error) {
    res.status(500).send(error);
  }
}

export async function getMeals(req, res) {
  try {
    const user = await User.findById(req.params.id);

    if (user && user.meals === null) {
      res.status(200).send({
        success: false,
        meals: null,
      });
    }else{
      res.status(200).send({
        success: true,
        meals: user.meals,
      });
    }
    
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function updateMeals(req, res) {
  try {
    const { id, meals } = req.body;
    const user = await User.findById(id);

    user.meals = meals;

    await user.save();
    res.status(200).send("Meals updated successfully");
  } catch (error) {
    res.status(500).send(error);
  }
}
