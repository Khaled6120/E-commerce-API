const express = require("express")

const { getReview, getReviews, updateReview, deleteReview, createReview } = require("../services/reviewService")
//const { getBrandValidator, deleteBrandValidator, updateBrandValidator, createBrandValidator } = require("../utils/validators/brandValidator")
const AuthService = require('../services/authService')

const router = express.Router()



// router.get("/", getCategories)
// router.post("/", createCategory)
// Same as below
router
    .route("/")
    .get(getReviews)
    .post(AuthService.protect, AuthService.allowedTo("user"), createReview)
router
    .route("/:id")
    .get(getReview)
    .put(AuthService.protect, AuthService.allowedTo("user"), updateReview)
    .delete(AuthService.protect, AuthService.allowedTo("admin", "manager", "user"), deleteReview)
module.exports = router