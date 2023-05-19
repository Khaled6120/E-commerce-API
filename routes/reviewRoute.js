const express = require("express")

const { getReview, getReviews, updateReview, deleteReview, createReview, createFilterObj, setProductIdAndUserToBody } = require("../services/reviewService")
//const { getBrandValidator, deleteBrandValidator, updateBrandValidator, createBrandValidator } = require("../utils/validators/brandValidator")
const AuthService = require('../services/authService')
const { createReviewValidator, updateReviewValidator, getReviewValidator, deleteReviewValidator } = require('../utils/validators/reviewValidator')
const router = express.Router({ mergeParams: true }) // it will allow us to access the params from the original route




// router.get("/", getCategories)
// router.post("/", createCategory)
// Same as below
router
    .route("/")
    .get(createFilterObj, getReviews)
    .post(AuthService.protect, AuthService.allowedTo("user"), setProductIdAndUserToBody, createReviewValidator, createReview)
router
    .route("/:id")
    .get(getReview)
    .put(AuthService.protect, AuthService.allowedTo("user"), updateReviewValidator, updateReview)
    .delete(AuthService.protect, AuthService.allowedTo("admin", "manager", "user"), deleteReviewValidator, deleteReview)
module.exports = router