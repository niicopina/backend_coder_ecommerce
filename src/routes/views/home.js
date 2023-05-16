import { Router } from "express";
import fs from 'fs/promises'

const home_router = Router()

home_router.get(
    '/', 
    async (req,res,next)=> {
    try {
        const productsData = await fs.readFile('products.json', 'utf-8')
        const products = JSON.parse(productsData)

        return res.render(
            'home',
            {
            products: products,
            title: 'home',
            //script: '/connection.js'
            })
    } catch (error) {
        next(error)
    }
})

export default home_router
/* router.get(
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
                title: 'index',
                script: '/connection.js'
               }      
            )
        }catch(error){
            next(error)
        }
    } 
) */
