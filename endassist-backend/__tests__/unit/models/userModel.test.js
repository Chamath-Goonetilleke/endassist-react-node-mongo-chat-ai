// __tests__/unit/models/userModel.test.js
import {
  connectDB,
  closeDatabase,
  clearDatabase,
} from "../../../setup/dbSetup.js";
import "../../../setup/testEnvironment.js";
import UserModel from "../../../model/User.js";
import jwt from "jsonwebtoken";

describe("User Model Tests", () => {
  // Connect to the in-memory database before all tests
  beforeAll(async () => await connectDB());

  // Clear the database after each test
  afterEach(async () => await clearDatabase());

  // Close the database connection after all tests
  afterAll(async () => await closeDatabase());

  it("should create a new user successfully", async () => {
    const userData = {
      name: "Test User",
      email: "test@example.com",
      dob: "1990-01-01",
      password: "password123",
      meals: "default",
      imgUrl: "http://example.com/avatar.jpg",
    };

    const user = new UserModel(userData);
    const savedUser = await user.save();

    // Check that user is created with correct information
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.dob).toBe(userData.dob);
    expect(savedUser.password).toBe(userData.password);
    expect(savedUser.meals).toBe(userData.meals);
    expect(savedUser.imgUrl).toBe(userData.imgUrl);
  });

  it("should generate an auth token correctly", async () => {
    const userData = {
      name: "Token User",
      email: "token@example.com",
      dob: "1992-05-15",
      password: "tokenpass",
      imgUrl: "http://example.com/token.jpg",
    };

    const user = new UserModel(userData);
    await user.save();

    const token = user.generateAuthToken();
    expect(token).toBeDefined();

    // Verify the token contains correct information
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    expect(decoded.email).toBe(userData.email);
    expect(decoded.name).toBe(userData.name);
    expect(decoded.dob).toBe(userData.dob);
    expect(decoded.imgUrl).toBe(userData.imgUrl);
  });
});
