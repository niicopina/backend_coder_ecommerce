/* import { Router } from "express";
import newProduct_router from "./newProducts.js";
import home_router from './home.js'
import chat_router from "./chat.js";
import products_router from "./products.js";
import carts_router from "./carts.js";

const router = Router()

router.use('/', home_router)
router.use('/newproduct', newProduct_router)
router.use('/carts', carts_router)
router.use('/chat', chat_router)
router.use('/products', products_router)

export default router */

//en el enrutador principal de vistas unicamente llamo a los enrutadores
//de vistas de recursos
//el endpoint de prueba de index.js de la carpeta router está mal ubicado