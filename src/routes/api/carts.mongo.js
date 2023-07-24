import { Router } from "express";
import Cart from '../../models/cart.model.js'
import Product from "../../models/product.model.js";
import { Types } from "mongoose";
import CartController from '../../controllers/cart.controller.js'

let carts_mongo = Router()
const cartController = new CartController()

carts_mongo.get('/', cartController.getCarts)
carts_mongo.get('/:cid', cartController.getCart)
carts_mongo.post('/', cartController.createCart)
carts_mongo.put('/:cartId/addProduct/:productId', cartController.addProductToCart)
carts_mongo.put('/bills/:cid', cartController.getCartBill)
carts_mongo.put('/:cid', cartController.updateCart)
carts_mongo.put('/:cid', cartController.deleteCart)

/* carts_mongo.post(
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

) */
/* carts_mongo.get(
    '/',
    async(req,res,next) => {
        try {
            const carts = await Cart.find()
            if(carts){
                return res.status(200).json({
                    success: true,
                    data: carts
                })
            }else{
                return res.status(404).json({
                    success: false,
                    message: 'cart not found'
                })
            }
        } catch (error) {
            next(error)
        }
    }
) */
/* carts_mongo.get(
    '/:id',
    async(req,res,next) => {
        try {
            const cartId = req.params.id
            const cart = await Cart.findById(cartId)
            if(cart){
                return res.status(200).json({
                    success: true,
                    data: cart
                })
            }else{
                return res.status(404).json({
                    success: false,
                    message: 'cart not found'
                })
            }
        } catch (error) {
            next(error)
        }
    }
)
carts_mongo.get(
    '/carts',
    async(req,res,next)=>{
        try {
            const carts = await Cart.find().populate(
                            {path: 'products_id', options:{sort: {title: i}}})
            if(carts){
                return res.status(200).json({
                    success: true,
                    carts: carts
                })
            }else{
                return res.status(404).json({
                    success: false,
                    message: 'not found'
                })
            }
        } catch (error) {
            next(error)
        }}
) */
/* The `carts_mongo.get('/bills/:cid', async(req,res,next)=>{...})` function is creating a new route
for handling HTTP GET requests to retrieve the total bill for a specific cart. */
/* carts_mongo.get('/bills/:cid', async(req,res,next)=>{
    try {
        let data = await Cart.aggregate([
            {$match: {product_id: new Types.ObjectId(req.params.cid)}},
            {$lookup: {
                foreignField: '_id', from: 'products',
                localField: 'products.product_id', as: 'product_id'
            }},
            {$replaceRoot: {newRoot:{
                $mergeObjects: [{$arrayElemAt: ['$product_id', 0]}, '$$ROOT']
            }}},
            {$set: {total: {$multiply: ['$quantity', '$price']}}},
            {$project: {product_id: 0, quantity: 0, price: 0, capacity: 0, __v: 0, active: 0}},
            {$group: {_id: 'product_id', sum: {sum: '$total'}}},
            {$project: {_id: 0, sum: '$sum'}}
        ])
        if(data){
            return res.status(200).json({
                success: true,
                response: data
        })}else{
            return res.status(404).json({
                success: false,
                message: 'not found'
            })}
    } catch (error) {
        next(error)
    }
}) */

/* carts_mongo.get(
    '/api/carts/bills/:cid',
    async(req,res,next)=>{
        try {
            const cid = req.params.cid
            const cart = await Cart.findById(cid).populate('products_id')
            let total = 0
            for(const product of cart.products){
                total += product.price
            }
            if(cart){
                return res.status(200).json({
                    success: true,
                    total
                })
            }else{
                return res.status(404).json({
                    success: false,
                    message: 'not found'
                })
            }
        } catch (error) {
            next(error)
        }
    }
) */
/* carts_mongo.get(
    '/carts',
    async(req,res,next)=>{
        try {
            const carts = await Cart.find().populate('products_id')
            const cartsWithTotal = carts.map(cart => {
                let total = 0
                for(const product of cart.products){total += product.price}
                return {...cart.toObject(), total}
            })
            res.render('carts', {cartsWithTotal: cartsWithTotal})
        } catch (error) {
            next(error)
        }
    }
)
carts_mongo.put(
    '/:id',
    async(req,res,next)=>{
        try {
            const cartId = req.params.id
            const newProductId = req.body.id
            const cart = await Cart.findByIdAndUpdate(cartId)
            if(!cart){
                return res.status(404).json({
                    success: false,
                    message: 'not found'
                })
            }
            cart.product_id = newProductId
            await cart.save()
            return res.status(200).json({
                success: true,
                data: cart
            })
        } catch (error) {
            next(error)
        }
    }
) */
/* carts_mongo.delete(
    '/:id',
    async(req,res,next)=> {
        try {
            const cart = await Cart.findByIdAndDelete(req.params.id)
            if(cart){
                return res.status(200).json({
                    succes: true,
                    message: 'cart deleted'
                })
            }else{
                return res.status(404).json({
                    success: false,
                    message: 'cart not found'
                })
            }
        } catch (error) {
            next(error)
        }
    }
) */
export default carts_mongo