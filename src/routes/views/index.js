import { Router } from "express";
import express from 'express'
import productsViews_router from "./products.js";

const router = Router()

router.use('/products', productsViews_router)
//router.use('/carts', cartsView_router)

export default router

//en el enrutador principal de vistas unicamente llamo a los enrutadores
//de vistas de recursos
//el endpoint de prueba de index.js de la carpeta router está mal ubicado