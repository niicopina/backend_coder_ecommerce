import cartService from '../service/index.js'
import productService from '../service/index.js'
import { Types } from "mongoose";

class CartController {
    constructor(){
        this.cartService = cartService
    }
    getCarts = async(req,res,next) => {
        try {
            const carts = await this.cartService.getCarts()
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
    /* async (req, res, next) => {
        try {
          const carts = await cartService.getCarts()
          const cartsWithTotal = carts.map(cart => {
            let total = 0;
            for (const product of cart.products) {
              total += product.price;
            }
            return { ...cart.toObject(), total };
          });
          return res.status(200).json({
            success: true,
            carts: cartsWithTotal
          });
        } catch (error) {
          next(error);
        }} */
    getCart = async(req,res,next) => {
        try {
            const {cid} = req.params
            const cart = await this.cartService.getCart({_id: cid})
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
    getCartBill = async(req,res,next)=>{
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
    }
    createCart = async(req,res,next)=> {
        try {
            const {quantity, product_id} = req.body
            const product = await this.productService.getProduct(product_id)
            if(!product){
                return res.status(404).json({
                    success: false,
                    message: 'product not found'
                })
            }
            const cart = await this.cartService.createCart({product_id, quantity})
            return res.status(201).json({
                success: true,
                message: `Cart created, ID: ${cart._id}`,
                data: cart
            })
        } catch (error) {
            next(error)
        }
    }
    addProductToCart = async (req, res, next) => {
        try {
          const { cartId, productId } = req.params;
          const cart = await cartService.getCart(cartId);
          const product = await productService.getProduct(productId);
          if (!cart || !product) {
            return res.status(404).json({
              success: false,
              message: 'Cart or product not found'
            });
          }
          cart.product_id = productId;
          await cart.save();
          return res.status(200).json({
            success: true,
            message: 'Product added to cart',
            data: cart
          });
        } catch (error) {
          next(error);
        }
      }
    updateCart = async(req,res,next)=>{
        try {
            const cid = req.params.id
            const newProductId = req.body.productId
            const cart = await cartService.updateCart(cid, { product_id: newProductId }, { new: true })
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
    deleteCart = async(req,res,next)=> {
        try {
            const cid = req.params.id
            const cart = await cartService.deleteCart(cid)
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
}

export default CartController