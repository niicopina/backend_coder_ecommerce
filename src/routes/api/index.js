import { Router } from "express";
import product_router from './products.router.js'
import cart_router from './cart.router.js'


const api_router = Router()

api_router.get('/products', product_router)
api_router.get('/cart', cart_router)


export default api_router
//Enrutador principal para API (envia datos)
//aca solo llamo al enrutador de recursios (prod, cart, user..)