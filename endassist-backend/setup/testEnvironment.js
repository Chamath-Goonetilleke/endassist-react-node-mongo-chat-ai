import dotenv from "dotenv";
// testEnvironment.js
export {}; // Ensures Jest doesn't treat this file as a test suite

// Load test environment variables
dotenv.config({ path: ".env.test" });

// Mock JWT environment variable
process.env.JWT_PRIVATE_KEY = "test_jwt_key";
