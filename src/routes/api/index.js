import { Router } from "express";
import product_router from './products.router.js'
import cart_router from './cart.router.js'


const router = Router()

router.use('/products', product_router)
router.use('/cart', cart_router)


export default router
//Enrutador principal para API (envia datos)
//aca solo llamo al enrutador de recursios (prod, cart, user..)