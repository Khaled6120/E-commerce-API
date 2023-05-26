const express = require("express")

const { createCashOrder, findAllOrders, findSpecificOrder, filterOrderForLoggedUser, updateOrderToPaid, updateOrderToDelivered, checkoutSession } = require("../services/orderService")

const AuthService = require('../services/authService')

const router = express.Router()




router.use(AuthService.protect)

router.get("/checkout-session/:cartId", AuthService.allowedTo("user"), checkoutSession)

router
    .route("/:cartId")
    .post(AuthService.allowedTo("user"), createCashOrder)
router
    .get('/', AuthService.allowedTo("user", "admin", "manager"), filterOrderForLoggedUser, findAllOrders)
router.
    get('/:id', findSpecificOrder)
router.
    put('/:id/pay', AuthService.allowedTo("admin", "manager"), updateOrderToPaid)
router.
    put('/:id/deliver', AuthService.allowedTo("admin", "manager"), updateOrderToDelivered)


module.exports = router