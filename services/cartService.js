const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/apiError')


const Cart = require('../models/cartModel')
const ProductModel = require('../models/ProductModel')


const calculateTotalPrice = cart => {
    let totalPrice = 0
    cart.cartItems.forEach(item => {
        totalPrice += item.price * item.quantity
    })

    return totalPrice
}


// @desc       Add Product To Cart
// @route      Post   /api/v1/cart
// @access     private/User
exports.addProductToCart = asyncHandler(async (req, res, next) => {
    const { productId, color } = req.body
    const product = await ProductModel.findById(productId)
    // 1) get cart for logged user
    let cart = await Cart.findOne({ user: req.user._id })
    if (!cart) {
        // create cart for logged user with product
        cart = await Cart.create({
            user: req.user._id,
            cartItems: [{
                product: productId,
                color: color,
                price: product.price,

            }]
        })
    } else {

        // product exists in cart, update product quantity
        const productIndex = cart.cartItems.findIndex(item => item.product.toString() === productId && item.color === color)

        if (productIndex > -1) {
            // product already in cart
            const cartItem = cart.cartItems[productIndex]
            cartItem.quantity += 1
            cart.cartItems[productIndex] = cartItem
        } else {
            // product not exist in cart, push product to cartItems array
            cart.cartItems.push({
                product: productId,
                color: color,
                price: product.price,

            })
        }

    }

    // calcualate total cart price 
    const totalPrice = calculateTotalPrice(cart)
    cart.totalCartPrice = totalPrice

    await cart.save()
    res.status(200).json({ status: "Success", message: "product added to the cart successfully", data: cart })
})