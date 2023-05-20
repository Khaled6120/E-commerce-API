const express = require("express")

const { addProductToWishlist, removeProductFromWishlist, getLoggedUserWishlist } = require("../services/whishlistService")
const AuthService = require('../services/authService')

const router = express.Router()



// router.get("/", getCategories)
// router.post("/", createCategory)
// Same as below
router
    .route("/")
    .post(AuthService.protect, AuthService.allowedTo("user"), addProductToWishlist)
    .get(AuthService.protect, AuthService.allowedTo("user"), getLoggedUserWishlist)
router.delete("/:productId",
    AuthService.protect,
    AuthService.allowedTo("user"),
    removeProductFromWishlist)


module.exports = router