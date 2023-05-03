import express from 'express'
import productManager from './src/products.js'

let server = express()

let PORT = 8000
let ready = () => console.log('server ready on port: '+PORT)

server.listen(PORT, ready)
server.use(express.urlencoded({extended:true}))

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
    (req, res) => {
        let title = req.body.title ?? null
        let description = req.body.description ?? null
        let price = req.body.price ?? null
        let thumbnail = req.body.thumbnail ?? null
        let code = req.body.code ?? null
        let stock = req.body.stock ?? null
        if(title&&description&&price&&thumbnail&&code&&stock){
            productManager.addProduct({title, description, price, thumbnail, code, stock})
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
    }
)


import cartManager from './src/cart.js'
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