const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const cors = require("cors");
const jwt = require("jsonwebtoken");

// Models
const { User } = require("./models/user");
const Message = require("./models/message");

const PORT = 8000;

const app = express();
app.disable("x-powered-by");

app.use(cors());

// Middlewares
// handling URL-encoded in the body of incoming HTTP requests
app.use(bodyParser.urlencoded({ extended: false }));
// parse to JSON data the body request
app.use(bodyParser.json());
// authentication middleware
app.use(passport.initialize());

// Connect app to backend
mongoose
  .connect("mongodb+srv://bumyDev:bumy@cluster0.o061ih4.mongodb.net/")
  .then(() => {
    console.log("Connect to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello world!" });
});

// Function to create token based on user id
const createToken = (userId) => {
  const payload = { userId };

  // Generate token with a secret key and expiration time
  const token = jwt.sign(payload, "Q$r2K6W8n!jCW%Zk", { expiresIn: "1h" });
  return token;
};

//Endpoint for register an user
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  // Create a new user object
  const newUser = new User({
    name,
    email,
    password,
  });

  // Save user into db/user collection
  newUser
    .save()
    .then(() => {
      res.status(201).json({ message: "User registered successfully" });
    })
    .catch((err) => {
      console.log("Error registering user", err);
      res.status(500).json({ message: "Error registering user" });
    });
});

// Endpoint for login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check if email & password are provided
  if (!email || !password) {
    return res.status(404).json({ message: "Email and password are required" });
  }

  // Check for that user in the database
  User.findOne({ email })
    .then((user) => {
      if (!user) return res.status(404).json({ message: "User not found" });

      // Compare provided password with the password in the db
      if (user.password !== password) {
        return res.status(404).json({ message: "Invalid password" });
      }

      const token = createToken(user._id);
      res.status(200).json({ token, ...user });
    })
    .catch((err) => {
      console.log("Error finding user", err);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

// Endpoint to access all users except current logged in
app.get("/users/:userId", (req, res) => {
  const loggedInUserId = req.params.userId;

  User.find({ _id: { $ne: loggedInUserId } })
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log("Error retrieving users", err);
      res.status(500).json({ message: "Error retrieving users" });
    });
});

// Endpoint to send a request to a user
app.post("/friend-request", async (req, res) => {
  const { currentUserId, selectedUserId } = req.body;

  try {
    // Update the recipient's friend request array
    await User.findByIdAndUpdate(selectedUserId, {
      $push: { friendRequest: currentUserId },
    });

    // Update the sender's sent friend request
    await User.findByIdAndUpdate(currentUserId, {
      $push: { sentFriendRequest: selectedUserId },
    });

    res.status(201).json({ message: "Friend request sent" });
  } catch (error) {
    res.status(500).json({ message: "Error sending request" });
  }
});

// Endpoint ro show all friend requests
app.get("/friend-request/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).populate(
      "friendRequest",
      "name email"
    );

    const friendRequest = user.friendRequest;
    res.status(200).json(friendRequest);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving friend request" });
  }
});

// Listen
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
