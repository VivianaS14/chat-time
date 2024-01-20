const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const cors = require('cors')
const jwt = require('jsonwebtoken')

const PORT = 8000

const app = express()
app.disable('x-powered-by')

app.use(cors())

// Middlewares
// handling URL-encoded in the body of incoming HTTP requests
app.use(bodyParser.urlencoded({ extended: false }))
// parse to JSON data the body request
app.use(bodyParser.json())
// authentication middleware
app.use(passport.initialize())

// Connect app to backend
mongoose.connect(
  'mongodb+srv://bumyDev:bumy@cluster0.o061ih4.mongodb.net/',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(() => {
  console.log('Connect to MongoDB')
}).catch(err => {
  console.log('Error connecting to MongoDB', err)
})

// Listen
app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
