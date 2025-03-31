import supertest from "supertest";
import {
  connectDB,
  closeDatabase,
  clearDatabase,
} from "../../../setup/dbSetup.js";
import "../../../setup/testEnvironment.js";
import app from "../../../index.js";
import UserModel from "../../../model/User.js";

const request = supertest(app);

describe("User Routes Integration Tests", () => {
  // Connect to the in-memory database before all tests
  // beforeAll(async () => await connectDB());

  // // Clear the database after each test
  // afterEach(async () => await clearDatabase());

  // // Close the database connection after all tests
  // afterAll(async () => await closeDatabase());

  describe("POST /api/v1/user/register", () => {
    it("should register a new user successfully", async () => {
      const userData = {
        name: "Register User",
        email: "register@example.com",
        password: "register123",
        dob:"2020-60-12",
      };

      const response = await request
        .post("/api/v1/user/register")
        .send(userData);

      expect(response.status).toBe(200);
    });

    // it("should return validation errors when data is missing", async () => {
    //   const response = await request
    //     .post("/api/v1/user/register")
    //     .send({ name: "Missing Data" });

    //   expect(response.status).toBe(400);
    //   expect(response.body).toHaveProperty("errors");
    // });
  });

  describe("POST /api/v1/user/login", () => {
    it("should login a user successfully", async () => {
      // Create a user first
      // const user = new UserModel({
      //   name: "Login User",
      //   email: "login@example.com",
      //   password: "login123",
      // });
      // await user.save();

      const response = await request.post("/api/v1/user/login").send({
        email: "register@example.com",
        password: "register123",
      });

      expect(response.status).toBe(200);
    });

    it("should return error for invalid credentials", async () => {
      const response = await request.post("/api/v1/user/login").send({
        email: "nonexistent@example.com",
        password: "wrongpassword",
      });

      expect(response.status).toBe(400);
    });
  });

  describe("GET /api/v1/user/:id", () => {
    it("should get user by id", async () => {
      const user = new UserModel({
        name: "Get User",
        email: "get@example.com",
        password: "get123",
      });
      const savedUser = await user.save();

      const response = await request.get(`/api/v1/user/${savedUser._id}`);

      expect(response.status).toBe(200);
    });

    it("should return 404 for non-existent user", async () => {
      const nonExistentId = "6409c5f83ab71e8b613741ac"; // Valid MongoDB id that doesn't exist
      const response = await request.get(`/api/v1/user/${nonExistentId}`);

      expect(response.status).toBe(400);
    });
  });

  describe("PUT /api/v1/user/update-meal", () => {
    it("should update user meals", async () => {
      const user = new UserModel({
        name: "Meal User",
        email: "meal@example.com",
        password: "meal123",
        meals: "old meal plan",
      });
      const savedUser = await user.save();

      const response = await request.put("/api/v1/user/update-meal").send({
        id: savedUser._id,
        meals: "new meal plan",
      });

      expect(response.status).toBe(200);

      // // Check the user was updated in the database
      const updatedUser = await UserModel.findById(savedUser._id);
      expect(updatedUser.meals).toBe("new meal plan");
    });
  });

  // You can add more tests for other routes as needed
});
