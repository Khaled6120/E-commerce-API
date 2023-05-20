const express = require("express")

const { addProductToWishlist, removeProductFromWishlist } = require("../services/whishlistService")
const AuthService = require('../services/authService')

const router = express.Router()



// router.get("/", getCategories)
// router.post("/", createCategory)
// Same as below
router
    .route("/")
    .post(AuthService.protect, AuthService.allowedTo("user"), addProductToWishlist)

router.delete("/:productId",
    AuthService.protect,
    AuthService.allowedTo("user"),
    removeProductFromWishlist)


module.exports = router