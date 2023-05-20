const express = require("express")

const { addProductToWishlist } = require("../services/whishlistService")
const AuthService = require('../services/authService')

const router = express.Router()



// router.get("/", getCategories)
// router.post("/", createCategory)
// Same as below
router
    .route("/")
    .post(AuthService.protect, AuthService.allowedTo("user"), addProductToWishlist)


module.exports = router