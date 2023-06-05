import {Router} from 'express'
import productManager from 'file:///C:/Users/usuario/Desktop/Desarrollo/BACKEND/proyecto/src/managers/products.js'
import Product from '../../models/product.model.js'

const product_router = Router()

product_router.get(
    '/',
    async(req,res,next)=> {
        try {
            let products = await Product.find()
            if(products){
                return res.status(200).json({
                    success: true,
                    data: products
                })
            }else{
                return res.status(404).json({
                    success: false,
                    message: 'not found'
                })
            }
        } catch (error) {
            next(error)
        }
    }
)
product_router.get(
    '/:id',
    async(req,res,next)=>{
        try {
            let product = await Product.findById(req.params.id)
            if(product){
                return res.status(200).json({
                    success: true,
                    data: product
                })
            }else{
                return res.status(404).json({
                    success: false,
                    message: 'not found'
                })
            }
        } catch (error) {
            next(error)
        }
    }
)
product_router.post(
    '/',
    async (req, res) => {
        try{            
            let response = await Product.create(req.body) // usando mongo

            if(response){
            return res.json({
                status: 200,
                message: 'created!',
                response
            })
            } else {
                res.json({
                    status: 400,
                    message: 'Check data!'
                    })
                }
            }catch(error){
                return res.json({
                    status: 500,
                    message: 'ERROR'
                })
            }
        
    }
)
product_router.put(
    '/:pid',
    async (req, res)=>{
        try {
            let id = req.params.pid

            if(req.params.pid){
                let response1 = await Product.findByIdAndUpdate(id,{new:true})
                let response2 = await Product.updateOne({_id: id})
                if(response1 && response2){
                    return res.json({
                        status: 200,
                        message: 'Product updated',
                        response1,
                        response2
                    })
                }
                }else{
                return res.json({
                    status: 400,
                    message: 'Check data!'
                })
        }
        } catch (error) {
            next(error)
        }
    }
)
product_router.delete(
    '/:pid',
    async (req,res)=>{
        try{
            let id = req.params.pid

            let response1 = await Product.findByIdAndDelete(id)
            let response2 = await Product.deleteOne(id)
            if(response1 || response2){
                return res.json({
                    status: 200,
                    message: 'Product deleted success',
                    response1,
                    response2
                })
            }else{
                return res.json({
                    status: 400,
                    message: 'Seems to be a problem with the Id'
                })
            }
        }catch(error){
            next(error)
        }
    }
)

export default product_router