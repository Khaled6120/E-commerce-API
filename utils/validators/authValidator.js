const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const slugify = require('slugify');
const User = require('../../models/UserModel');


exports.signupValidator = [
    check("name")
        .notEmpty()
        .withMessage("brand required")
        .isLength({ min: 3 })
        .withMessage("Too short brand name")
        .custom((val, { req }) => {
            req.body.slug = slugify(val);
            return true
        }),
    check("email")
        .notEmpty()
        .withMessage("email required")
        .isEmail()
        .withMessage("Invalid email address")
        .custom((val) => User.findOne({ email: val })
            .then((user) => {
                if (user) {
                    return Promise.reject(new Error("E-mail already in user"))
                }
            })),
    check("password")
        .notEmpty()
        .withMessage("Please enter a password")
        .isLength({ min: 6 })
        .withMessage("password must be at least 6 characters")
        .custom((password, { req }) => {
            if (password !== req.body.passwordConfirm) {
                throw new Error("Password confirmation incorrect")
            }
            return true
        }),

    check('passwordConfirm')
        .notEmpty()
        .withMessage("password confirmation is required"),


    validatorMiddleware,
]

exports.loginValidator = [

    check("email")
        .notEmpty()
        .withMessage("email required")
        .isEmail()
        .withMessage("Invalid email address"),

    check("password")
        .notEmpty()
        .withMessage("Please enter a password")
        .isLength({ min: 6 })
        .withMessage("password must be at least 6 characters"),

    validatorMiddleware,
]