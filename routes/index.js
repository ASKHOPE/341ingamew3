const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/clients', require('./clients'))
// router.get('/',(req,res) => {res.send('Hello World')});
router.use("/", require("./swagger"));



// // Routes
router.get("/", (req, res) => {
  res.send("Node.js API for user validation");
});


// Validation Route
router.post("/clients", userValidation, (req, res, next) => {
    const { firstName, lastName, email, favoriteColor, birthday,nickname,gender } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("Data is valid and added sucesfully");
  });


router.use((req, res, next) => {
    const error = new Error('Path Not Found');
    error.status = 404;
    next(error);
});

module.exports = router;
