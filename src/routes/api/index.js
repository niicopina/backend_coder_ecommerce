import { Router } from "express";
import product_router from './products.router.js'
import cart_router from './cart.router.js'
import product_mongo from "./products.mongo.js";

const router = Router()

router.use('/products', product_router)
router.use('/carts', cart_router)
router.use('/products', product_mongo)



export default router
//Enrutador principal para API (envia datos)
//aca solo llamo al enrutador de recursios (prod, cart, user..)