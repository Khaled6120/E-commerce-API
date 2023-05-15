const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const slugify = require('slugify');
const User = require('../../models/UserModel');
const bcrypt = require('bcryptjs');

exports.getUserValidator = [
    check('id').isMongoId().withMessage("Invalid brand id"),
    validatorMiddleware,

]

exports.createUserValidator = [
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

    check('phone')
        .optional()
        .isMobilePhone(["ar-Sa", "tr-TR"])
        .withMessage("Invalid phone number only accept Tr and SA phone numbers"),

    check('profileImg').optional(),
    check('role').optional(),

    validatorMiddleware,
]

exports.updateUserValidator = [
    check('id')
        .isMongoId()
        .withMessage("Invalid brand id format"),
    body("name")
        .optional()
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
    check('phone')
        .optional()
        .isMobilePhone(["ar-Sa", "tr-TR"])
        .withMessage("Invalid phone number only accept Tr and SA phone numbers"),
    check('profileImg').optional(),
    check('role').optional(),


    validatorMiddleware,

]

exports.changeUserPasswordValidator = [
    check('id')
        .isMongoId()
        .withMessage("Invalid brand id format"),
    check("currentPassword")
        .notEmpty()
        .withMessage("you must enter a current passsword"),
    body("passwordConfirm")
        .notEmpty()
        .withMessage("you must enter the password confirtm"),
    body('password')
        .notEmpty()
        .withMessage("you must enter a new password")
        .custom(async (val, { req }) => {
            // 1) verify current password
            const user = await User.findById(req.params.id)
            if (!user) throw new Error("there is no user for this id")

            const isCorrectPassword = await bcrypt.compare(req.body.currentPassword, user.password)
            if (!isCorrectPassword) throw new Error("Incorrect current password")

            // 2) verify passwrod confirm
            if (val !== req.body.passwordConfirm) throw new Error("Passwords do not match")
            return true
        }),

    validatorMiddleware,

]

exports.deleteUserValidator = [
    check('id').isMongoId().withMessage("Invalid brand id format"),
    validatorMiddleware,
]