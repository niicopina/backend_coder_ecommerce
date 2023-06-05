import { Router } from "express";
import Cart from '../../models/cart.model.js'
import Product from "../../models/product.model.js";

let carts_mongo = Router()

carts_mongo.post(
    '/',
    async(req,res,next)=> {
        try {
            const {quantity, product_id} = req.body
        } catch (error) {
            next(error)
        }
    }
)