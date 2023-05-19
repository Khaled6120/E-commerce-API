const express = require("express")

const { getReview, getReviews, updateReview, deleteReview, createReview } = require("../services/reviewService")
//const { getBrandValidator, deleteBrandValidator, updateBrandValidator, createBrandValidator } = require("../utils/validators/brandValidator")
const AuthService = require('../services/authService')
const { createReviewValidator, updateReviewValidator, getReviewValidator, deleteReviewValidator } = require('../utils/validators/reviewValidator')
const router = express.Router()



// router.get("/", getCategories)
// router.post("/", createCategory)
// Same as below
router
    .route("/")
    .get(getReviews)
    .post(AuthService.protect, AuthService.allowedTo("user"), createReviewValidator, createReview)
router
    .route("/:id")
    .get(getReview)
    .put(AuthService.protect, AuthService.allowedTo("user"), updateReviewValidator, updateReview)
    .delete(AuthService.protect, AuthService.allowedTo("admin", "manager", "user"), deleteReviewValidator, deleteReview)
module.exports = router