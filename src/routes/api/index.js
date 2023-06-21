import { Router } from "express";
import product_router from './products.router.js'
import cart_router from './cart.router.js'
import product_mongo from "./products.mongo.js";
import carts_mongo from "./carts.mongo.js";
import cookies_router from "./cookies.js";
import auth_router from "./auth.js";

const router = Router()

router.use('/products', product_router)
//router.use('/carts', cart_router)
//router.use('/products', product_mongo)
router.use('/carts', carts_mongo)
//router.use('/cookies', cookies_router)
router.use('/auth', auth_router)

export default router