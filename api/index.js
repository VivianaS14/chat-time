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

//Endpoint to register an user
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

// Listen
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
