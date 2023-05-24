const express = require("express")

const { createCashOrder, findAllOrders, findSpecificOrder, filterOrderForLoggedUser } = require("../services/orderService")

const AuthService = require('../services/authService')

const router = express.Router()



// router.get("/", getCategories)
// router.post("/", createCategory)
// Same as below
router.use(AuthService.protect)

router
    .route("/:cartId")
    .post(AuthService.allowedTo("user"), createCashOrder)
router.get('/', AuthService.allowedTo("user", "admin", "manager"), filterOrderForLoggedUser, findAllOrders)
router.get('/:id', findSpecificOrder)

module.exports = router