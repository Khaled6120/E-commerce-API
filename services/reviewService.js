const asyncHandler = require('express-async-handler')


const Review = require("../models/reviewModel")
const factory = require('./handlersFactory')



// @desc       Get list of Reviews
// @route      GET   /api/v1/reviews
// @access     Public
exports.getReviews = factory.getAll(Review)


// @desc       Get specific Review by id
// @route      GET   /api/v1/reviews/:id
// @access     Public
exports.getReview = factory.getOne(Review)




// @desc       Create Review
// @route      POST   /api/v1/reviews
// @access     private/protect/User
exports.createReview = factory.createOne(Review)




// @desc       Update specific Review
// @route      PUT   /api/v1/review/:id
// @access     private/protect/user
exports.updateReview = factory.updateOne(Review)


// @desc       Delete specific Review
// @route      DELETE   /api/v1/reviews/:id
// @access     privat/protect/user-admin-manager
exports.deleteReview = factory.deleteOne(Review)