const express = require("express")

const { addProductToCart, getLoggedUserCart, removeSpecificCartItem, clearCart } = require("../services/cartService")
const AuthService = require('../services/authService')

const router = express.Router()


router
    .route("/")
    .post(AuthService.protect, AuthService.allowedTo('user'), addProductToCart)
    .get(AuthService.protect, AuthService.allowedTo('user'), getLoggedUserCart)
    .delete(AuthService.protect, AuthService.allowedTo('user'), clearCart)
router
    .route("/:itemId")
    .delete(AuthService.protect, AuthService.allowedTo('user'), removeSpecificCartItem)



module.exports = router