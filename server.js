import express from 'express'
import router from './src/routes/index_router.js'
import errorHandler from './src/middlewares/errorHandler.js'
import not_found_handler from './src/middlewares/notFoundHandler.js'
import { engine } from 'express-handlebars'

//import productManager from './src/products.js'
//import productRouter from './src/routes/api/products.router.js'

let server = express()
let PORT = 8000
let ready = () => console.log('server ready on port: '+PORT)

server.listen(PORT, ready)
server.use('/public',express.urlencoded({extended:true}))
server.use(express.json())
server.use('/', router)
server.use(errorHandler)
server.use(not_found_handler)
server.use(express.static('public'))
server.engine('handlebars', engine())
server.set('view engine', 'handlebars')


let index_route = '/'
let index_function = (req, res) => {
    let quantity = productManager.getProducts().length
    console.log(quantity)
    return res.send(`there are ${quantity} products`)
}
server.get(index_route, index_function)

let one_route = '/products/:id'
let one_function = (req, res) => {
    let parametros = req.params
    let id = Number(parametros.id)
    let one = productManager.getProductsById(id)
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
}
server.get(one_route, one_function)

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
server.get(query_route, query_function)

server.post(
    '/products',
    async (req, res) => {
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
                return res.json({
                    status: 500,
                    message: 'ERROR'
                })
            }
        
    }
)
server.put(
    '/products/:pid',
    (req, res)=>{
        if(req.params.pid){
            let id = Number(req.params.pid)
            productManager.updateProduct(id)
            return res.json({
                status: 200,
                message: 'Product updated'
            })
        }else{
            return res.json({
                status: 400,
                message: 'Check data!'
            })
        }
    }
)
server.delete(
    '/products/:id',
    async (req,res)=>{
        try{
            let id = req.body.id ?? null
            if(id){
                let deletedProduct = await productManager.deleteProduct({id})
                return res.json({
                    status: 200,
                    deletedProduct,
                    message: 'Product deleted success'
                })
            }else{
                return res.json({
                    status: 400,
                    message: 'Seems to be a problem with the Id'
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

import cartManager from './src/managers/cart.js'
import app from './src/app.js'

app.get('/api/carts', async (req,res)=> {
    const carts = await cartManager.getCarts()
    if(carts === 'Not found'){
        res.send({
            success: true,
            response: []
        })
    }else if(carts === 'getCarts: error'){
        res.send({
            success: false,
            response: []
        })
    }else{
        res.json(carts)
    }
})