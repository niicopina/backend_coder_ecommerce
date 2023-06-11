import { Router } from "express";
import Cart from '../../models/cart.model.js'

const carts_router = Router()

carts_router.get(
    '/carts',
    async(req,res,next)=>{
        try {
            const carts = await Cart.find().populate('product_id')
            if(carts){
                return res.render(
                    'carts',
                    { carts }
                )
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
export default carts_router