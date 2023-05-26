const stripe = require("stripe")(process.env.STRIPE_SECRET)
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError')

const Product = require("../models/ProductModel")
const Order = require("../models/orderModel")
const factory = require('./handlersFactory')
const Cart = require('../models/cartModel')




// @desc       Create cash order 
// @route      POST   /api/v1/orders/cartId
// @access     protected/ User
exports.createCashOrder = asyncHandler(async (req, res, next) => {
    // app setting
    const taxPrice = 0
    const shippingPrice = 0
    // 1) get cart depend on cartId
    const cart = await Cart.findById(req.params.cartId)

    if (!cart) return next(
        new ApiError('There is no such cart with this id', 404)
    )

    // 2) get order price depend on cart price "check if coupon apply"
    const cartPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalCartPrice
    const totalOrderPrice = cartPrice + taxPrice + shippingPrice
    // 3) create order with default paymount method cash
    const order = await Order.create({
        user: req.user._id,
        cartItems: cart.cartItems,
        totalOrderPrice,
        shippingAddress: req.body.shippingAddress

    })
    // 4) After creating order, decrement product quantity, increment product sold
    if (order) {
        const bultOption = cart.cartItems.map((item) => ({
            updateOne: {
                filter: { _id: item.product },
                update: { $inc: { quantity: -item.quantity, sold: +item.quantity } }
            }
        }))
        await Product.bulkWrite(bultOption, {})

        // 5) clear cart depend on cartId
        await Cart.findByIdAndDelete(req.params.cartId)
    }
    res.status(201).json({ status: 'success', data: order })
})


exports.filterOrderForLoggedUser = asyncHandler(
    async (req, res, next) => {
        if (req.user.role === "user") req.filterObj = { user: req.user._id }
        next()
    }
)

// @desc       GET ALL orders 
// @route      POST   /api/v1/orders
// @access     protected/ User-Admin-Manager
exports.findAllOrders = factory.getAll(Order)



// @desc       GET ALL orders 
// @route      POST   /api/v1/orders
// @access     protected/ User-Admin-Manager
exports.findSpecificOrder = factory.getOne(Order)



// @desc    Update order paid status to paid
// @route   PUT /api/v1/orders/:id/pay
// @access  Protected/Admin-Manager
exports.updateOrderToPaid = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(
            new ApiError(
                `There is no such a order with this id:${req.params.id}`,
                404
            )
        );
    }

    // update order to paid
    order.isPaid = true;
    order.paidAt = Date.now();

    const updatedOrder = await order.save();

    res.status(200).json({ status: 'success', data: updatedOrder });
});

// @desc    Update order delivered status
// @route   PUT /api/v1/orders/:id/deliver
// @access  Protected/Admin-Manager
exports.updateOrderToDelivered = asyncHandler(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    if (!order) {
        return next(
            new ApiError(
                `There is no such a order with this id:${req.params.id}`,
                404
            )
        );
    }

    // update order to paid
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.status(200).json({ status: 'success', data: updatedOrder });
});


// @desc    GET Checkout Session from stripe and send it as a response
// @route   GET /api/v1/orders/checkout-session/cartId
// @access  Protected/user
exports.checkoutSession = asyncHandler(async (req, res, next) => {
    // app setting
    const taxPrice = 0
    const shippingPrice = 0
    // 1) get cart depend on cartId
    const cart = await Cart.findById(req.params.cartId)

    if (!cart) return next(
        new ApiError('There is no such cart with this id', 404)
    )

    // 2) get order price depend on cart price "check if coupon apply"
    const cartPrice = cart.totalPriceAfterDiscount ? cart.totalPriceAfterDiscount : cart.totalCartPrice

    const totalOrderPrice = cartPrice + taxPrice + shippingPrice


    // 3) Generate stripe checkout session
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {



                price_data: {
                    currency: 'try',
                    unit_amount: totalOrderPrice * 100,
                    product_data: {
                        name: req.user.name,
                    },
                },


                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${req.protocol}://${req.get('host')}/orders`,
        cancel_url: `${req.protocol}://${req.get('host')}/cart`,
        customer_email: req.user.email,
        client_reference_id: req.params.id,
        metadata: req.body.shippingAddress,

    });

    res.status(200).json({ status: 'success', session })
})