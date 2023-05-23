import {Router} from 'express'
import productManager from 'file:///C:/Users/usuario/Desktop/Desarrollo/BACKEND/proyecto/src/managers/products.js'
import Product from '../../model/product.model.js'

const product_router = Router()

let index_route = '/'
let index_function = (req, res) => {
    //let products = Product.find()
    let quantity = productManager.getProducts().length
    console.log(quantity)
    return res.send(`there are ${quantity} products`)
}
product_router.get(index_route, index_function)

let one_route = '/products/:id'
let one_function = async (req, res) => {
    try{
        //let parametros = req.params
        let id = Number(req.params.id)
        let one = await productManager.getProductsById(id)
        console.log(one)
        if(one){
            return res.send({
                success: true,
                product: one
            })
        } else {
            return res.send({
                success: false,
                product: 'No product found with this ID'
            })
        }
            }catch(error){
                console.log(error);
                return res.send({
                success: false,
                product: 'Error retrieving product'
            })
        }}
product_router.get(one_route, one_function)

let query_route = '/products'
let query_function = (req, res) => {
    let quantity = req.query.quantity ?? 3
    let products = productManager.getProducts().slice(0, quantity)
    if(products.length > 0){
        return res.send({
            success: true,
            products: products
        })
    } else {
        return res.send({
            success: false,
            products: 'Products not Found!'
        })
    }
}
product_router.get(query_route, query_function)

product_router.post(
    '/',
    async (req, res) => {
        try{
            let response = await Product.create(req.body) // usando mongo

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
            /* productManager.updateProduct(id)
            return res.json({
                status: 200,
                message: 'Product updated'
            }) */
        }else{
            return res.json({
                status: 400,
                message: 'Check data!'
            })
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