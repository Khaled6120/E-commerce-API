const { check, body } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');
const Review = require('../../models/reviewModel');




exports.createReviewValidator = [
    check("title").optional(),
    check("ratings").notEmpty().withMessage('ratings value required').isFloat({ min: 1, max: 5 }).withMessage("ratings value must be between 1 to 5"),
    check("user").isMongoId().withMessage("Invalid user id format"),
    check("product").isMongoId().withMessage("Invalid product id format").custom((val, { req }) =>
        // check if logged user created a review before
        Review.findOne({ product: req.body.product, user: req.user._id }).then(review => {
            if (review) {
                return Promise.reject(new Error("You already created a review before"))
            }
        })
    ),

    validatorMiddleware,
]


exports.getReviewValidator = [
    check('id').isMongoId().withMessage("Invalid Review id"),
    validatorMiddleware,

]


exports.updateReviewValidator = [
    check('id')
        .isMongoId()
        .withMessage("Invalid Review id format").custom((val, { req }) => {
            // check reviw ownership before update
            Review.findById(val).then((review) => {
                if (!review) {
                    return Promise.reject(new Error(`There is no review with id ${val}`))
                }
                if (review.user.toString() !== req.user._id.toString()) {
                    return Error("You are not allwoed to perform this action")
                }
            })
        }),

    validatorMiddleware,

]

exports.deleteReviewValidator = [
    check('id').isMongoId().withMessage("Invalid Review id format")
        .custom((val, { req }) => {
            if (req.user.role === 'user') {
                return Review.findById(val).then((review) => {
                    if (!review) {
                        return Promise.reject(new Error(`There is no review with id ${val}`))
                    }
                    if (review.user.toString() !== req.user._id.toString()) {
                        return Promise.reject(new Error("You are not allwoed to perform this action"))
                    }
                })
            }
            return true
        }),
    validatorMiddleware,
]