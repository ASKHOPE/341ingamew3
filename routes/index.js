const express = require('express');
const router = express.Router();

router.use('/user', require('./user'));
router.use('/clients', require('./clients'))
// router.get('/',(req,res) => {res.send('Hello World')});
router.use("/", require("./swagger"));

router.use((req, res, next) => {
    const error = new Error('Path Not Found');
    error.status = 404;
    next(error);
});

module.exports = router;
