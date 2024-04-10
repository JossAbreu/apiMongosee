import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/users.js";

// Secret key for JWT token generation
const SECRET_KEY = "your_secret_key";

export function auth_routes(router) {
  // Register endpoint
  router.post("/register/user", async (req, res) => {
    try {
      const { username, password,roll,state } = req.body;

      // Check if username already exists
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
        username,
        password: hashedPassword,
        roll,
        state,
      });

      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // Login endpoint
  router.post("/login", async (req, res) => {
    // res.header("Access-Control-Allow-Origin", "*");

    try {
      const { username, password } = req.body;

      // Find the user in the database
      const user = await User.findOne({ username });

      console.log('1', {user, username})
      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      // Compare the provided password with the stored hash
      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log('2', {user, username})
      if (!passwordMatch) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, SECRET_KEY);

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
}
