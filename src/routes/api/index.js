import { Router } from "express";
import product_mongo from "./products.mongo.js";
import carts_mongo from "./carts.mongo.js";
import auth_router from "./auth.js";
import UserRouter from "./newUserClass.js";
import RouterClass from './router.js'
//import pruebas_router from './pruebas.js'

import product_router from './products.router.js'
import cookies_router from "./cookies.js";
import cart_router from './cart.router.js'

const router = Router()

//router.use('/carts', cart_router)
//router.use('/products', product_router)
//router.use('/cookies', cookies_router)

router.use('/products', product_mongo)
router.use('/carts', carts_mongo)
router.use('/auth', auth_router)
router.use('/users', UserRouter)
router.use('/router', RouterClass)

//router.use('/pruebas', pruebas_router)

export default router