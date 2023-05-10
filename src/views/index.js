import { Router } from "express";

const router = Router()

router.get(
    '/',
    async (req, res, next) => {
        try{
            return res.render(
                'index',    //nombre de la vista
               {
                name: 'Nico',
                last_name: 'Piña',
                alumnos: [{
                        name: 'Nicolas',
                        photo: 'https://www.shutterstock.com/image-photo/image-happy-beautiful-student-girl-260nw-1824708863.jpg'
                        },
                        {
                        name: 'Alejandro',
                        photo: 'https://www.shutterstock.com/image-photo/image-happy-beautiful-student-girl-260nw-1824708863.jpg'
                        },
                        {
                        name: 'Florencia',
                        photo: 'https://www.shutterstock.com/image-photo/image-happy-beautiful-student-girl-260nw-1824708863.jpg'
                        }
                        ],
                title: 'index'
               }      
            )
        }catch(error){
            next(error)
        }
    } 
)
export default router
//aqui no se definen endpoints, se definen todas las rutas de vistas como por ej de users