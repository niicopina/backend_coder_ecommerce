import { Router } from "express";
import product_router from './products.router.js'
import cart_router from './cart.router.js'
import product_mongo from "./products.mongo.js";
import students_router from './students.mongo.js'
import carts_mongo from "./carts.mongo.js";
import cookies_router from "./cookies.js";
import sessions_router from "./sessions.js";

const router = Router()

router.use('/products', product_router)
//router.use('/carts', cart_router)
//router.use('/products', product_mongo)
router.use('/carts', carts_mongo)
router.use('/students', students_router)
router.use('/cookies', cookies_router)
router.use('/sessions', sessions_router)

export default router