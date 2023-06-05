import { Router } from "express";
import Cart from '../../models/cart.model.js'
import Product from "../../models/product.model.js";

let carts_mongo = Router()

carts_mongo.post(
    '/',
    async(req,res,next)=> {
        try {
            const {quantity, product_id} = req.body
            const product = await Product.findById(product_id)
            if(!product){
                return res.status(404).json({
                    success: false,
                    message: 'product not found'
                })
            }
            const cart = await Cart.create({product_id, quantity})
            return res.status(201).json({
                success: true,
                message: `Cart created, ID: ${cart._id}`,
                data: cart
            })
        } catch (error) {
            next(error)
        }
    }
)
carts_mongo.post(
    '/:cartId/addProduct/:productId',
    async(req,res,next)=>{
        try {
            const {cartId, productId} = req.params
            const cart = await Cart.findById(cartId)
            const product = await Product.findById(productId)
            if(!cart || !product){
                return res.status(404).json({
                    success: false,
                    message: 'cart or product not found'
                })
            }
            cart.product_id = productId
            await cart.save()
            return res.status(200).json({
                success: true,
                message: 'product added to cart',
                data: cart
            })
        } catch (error) {
            next(error)
        }
    }

)