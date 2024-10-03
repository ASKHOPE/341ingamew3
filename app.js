
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongodb = require("./db/connect");
const { userValidation } = require("./middleware/validator.js");

const port = process.env.PORT || 8080;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", require("./routes"));

// Initialize MongoDB and start server
mongodb.initDb((err, db) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on port ${port}`);
    });
  }
});

// Setting Access-Control headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// Routes
app.get("/", (req, res) => {
  res.send("Node.js API for user validation");
});

// Validation Route
app.post("/clients", userValidation, (req, res, next) => {
  const { firstName, lastName, email, favoriteColor, birthday,nickname,gender } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.send("Data is valid and added sucesfully");
});

// Error handling
app.use((err, req, res, next) => {
  console.log(err)
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});
