import Auth from "../models/auth.model.js";

// Register a new user
export const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if a user with the same email OR username already exists
    const existingUser = await Auth.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or username already in use" });
    }

    // Create new user
    const newUser = new Auth({
      username,
      password, // In production, hash this before saving!
      email,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists by email or username
    const user = await Auth.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare password (use bcrypt.compare() in production)
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

//Logout user
export const logoutUser = async (req, res) => {
  try {
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
