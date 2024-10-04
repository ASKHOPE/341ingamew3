const { check, header, validationResult } = require('express-validator');

exports.userValidation = [
    header('content-type', 'Content-Type must be application/json').equals('application/json'),
    check('firstName', 'First name is required').not().isEmpty().trim().isString().matches(("^[a-zA-Z]*$")),
    check('lastName', 'Last name is required').not().isEmpty().trim().isString().matches(("^[a-zA-Z]*$")),
    check('email', 'Please include a valid email').isEmail().normalizeEmail(),
    check('favoriteColor', 'Favorite color is required').not().isEmpty().trim().isString(),
    check('birthday', 'Please include a valid date of birth').isDate({ format: 'DD/MM/YY' }),
    check('nickname', 'Nickname is required').not().isEmpty().trim().isString().matches(("^[a-zA-Z]*$")),
    check('gender', 'Gender is required').not().isEmpty().trim().isString().customSanitizer(value => value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()).isIn(['Male', 'M', 'Female', 'F', 'Other']),
];

exports.userValidation2 = [
    header('content-type', 'Content-Type must be application/json').equals('application/json'),
    check('firstName', 'First name is required').not().isEmpty().trim().isString().matches(("^[a-zA-Z]*$")),
    check('lastName', 'Last name is required').not().isEmpty().trim().isString().matches(("^[a-zA-Z]*$")),
    check('email', 'Please include a valid email').isEmail().normalizeEmail(),
    check('favoriteColor', 'Favorite color is required').not().isEmpty().trim().isString(),
    check('birthday', 'Please include a valid date of birth').isDate({ format: 'DD/MM/YY' }),
];

exports.validationResult = validationResult;