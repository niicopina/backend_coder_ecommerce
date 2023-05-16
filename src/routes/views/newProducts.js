import { Router } from "express";
import productManager from './../../managers/products.js'

const newProduct_router = Router()

newProduct_router.get(
    '/newproducts',
    async (req, res, next) => {
        try {
            return res.render(
                'newproducts',
                {
                    title: 'Title',
                    price: 'Price',
                    description: 'Description',
                    stock: 'Stock',
                    code: 'Code',
                    thumbnail: 'Photo Link',
                    script: '/public/newProduct.js'
                }
            )
        } catch (error) {
            next(error)
        }
    }
)

newProduct_router.post(
    '/newproduct',
    async (req, res, next) => {
        try{
            let title = req.body.title ?? null
            let description = req.body.description ?? null
            let price = req.body.price ?? null
            let thumbnail = req.body.thumbnail ?? null
            let code = req.body.code ?? null
            let stock = req.body.stock ?? null
            if(title&&description&&price&&thumbnail&&code&&stock){
            let product = await productManager.addProduct({title, description, price, thumbnail, code, stock})
                return res.json({
                    status: 201,
                    message: 'Created'
                })
            } else {
                res.json({
                    status: 400,
                    message: 'Check data!'
                    })
                }
            }catch(error){
               next(error)
            }
        
    }
)

export default newProduct_router