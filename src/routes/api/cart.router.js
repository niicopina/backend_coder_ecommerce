import { Router } from "express";
import cartManager from 'file:///C:/Users/usuario/Desktop/Desarrollo/BACKEND/proyecto/src/managers/cart.js'

const cart_router = Router()

//aqui van los put post delete de carrito
cart_router.get(
    '/',
    async(req,res,next)=>{
        try {
            const carts = await cartManager.getCarts()
            if(carts){
                return res.status(200).json({
                    success: true,
                    carts
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
)
cart_router.get(
    '/:cid',
    async(req,res,next)=>{
        try {
            const cid = req.params.cid
            const cart = await cartManager.getCartById(cid)
            if(cart){
                return res.status(200).json({
                    success: true,
                    cart
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
)
cart_router.post(
    '/',
    async (req, res) => {
        try{
            const cartId = await cartManager.addCart()
            return res.json({
                status: 200,
                message: 'Cart created',
                cartId
            })
        }catch(error){
            console.log(error)
            return res.json({
                status: 500,
                message: 'Error creating cart'
            })
        }
    }
)
cart_router.put(
    '/api/carts/:cid/product/:pid/:units',
    async (req, res) => {
        try{
            const cartId = parseInt(req.params.cid)
            const productId = parseInt(req.params.pid)
            const units = parseInt(req.params.units)
            const result = await cartManager.updateCart(cartId, productId, units)
            if(result === 'Cart not found'|| result === 'Product not found'|| result === 'Not enough units available'){
                return res.json({
                    status: 400,
                    message: result
                })
            }else if(result === 'Error updating cart'){
                return res.json({
                    status: 500,
                    message: result
                })
            }
            return res.json({
                status: 200,
                message: 'Cart updated successfully'
            })
        } catch(error){
            console.log(error)
            return res.json({
                status: 500,
                message: 'Error updating cart'
            })
        }
    }
)
cart_router.delete(
    '/api/carts/:cid/product/:pid/:units',
    async (req, res) => {
        try{
            const cartId = parseInt(req.params.cid)
            const productId = parseInt(req.params.pid)
            const units = parseInt(req.params.units)
            const result = await cartManager.deleteCartProduct(cartId, productId, units)
            if(result === 'Cart not found' || result === 'Product not found in cart' || result === 'Not enough units in the cart'){
                return res.json({
                    status: 400,
                    message: result
                })
            }else if(result==='Error deleting cart product'){
                return res.json({
                    status: 500,
                    message: result
                })
            }
            return res.json({
                status: 200,
                message: 'Cart product deleted successfully'
            })
        } catch(error){
            console.log(error)
            return res.json({
                status: 500,
                message: 'Error deleting cart product'
            })
        }
    }
)

export default cart_router