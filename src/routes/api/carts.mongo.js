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