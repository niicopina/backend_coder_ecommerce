import { Router } from "express";
import api_router from './api/index.js'
import views_router from '../views/index.js'

const router = Router()

router.use('/api', api_router)
//todas las rutas de la APi rest van a tener el endpint /api
router.use('/', views_router)
//todas las rutas delas vistas tendran el endpoint /
export default router
//aqiu solo llamo al enrutador de la API y al de las vistas