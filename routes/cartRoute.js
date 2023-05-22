const express = require("express")

const { addProductToCart } = require("../services/cartService")
const AuthService = require('../services/authService')

const router = express.Router()


router
    .route("/")
    .post(AuthService.protect, AuthService.allowedTo('user'), addProductToCart)


module.exports = router