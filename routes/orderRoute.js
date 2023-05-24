const express = require("express")

const { createCashOrder, findAllOrders, findSpecificOrder, filterOrderForLoggedUser, updateOrderToPaid, updateOrderToDelivered } = require("../services/orderService")

const AuthService = require('../services/authService')

const router = express.Router()



// router.get("/", getCategories)
// router.post("/", createCategory)
// Same as below
router.use(AuthService.protect)

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