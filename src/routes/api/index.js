import { Router } from "express";
import product_router from './products.router.js'
import cart_router from './cart.router.js'
import product_mongo from "./products.mongo.js";
import students_router from './students.mongo.js'
import carts_mongo from "./carts.mongo.js";

const router = Router()

//router.use('/products', product_router)
//router.use('/carts', cart_router)
router.use('/products', product_mongo)
router.use('/carts', carts_mongo)
router.use('/students', students_router)


export default router
//Enrutador principal para API (envia datos)
//aca solo llamo al enrutador de recursios (prod, cart, user..)