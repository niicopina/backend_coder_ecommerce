import { Router } from "express";

const router = Router()

router.get(
    '/vista_de_prueba',
    (req, res, next) => {
        try{
            return res.render(
                'index',    //nombre de la vista
                null       //datos dinamicos que pueden llegar a necesitar la vista
            )
        }catch(error){
            next(error)
        }
    } 
)
export default router
//aqui no se definen endpoints, se definen todas las rutas de vistas como por ej de users