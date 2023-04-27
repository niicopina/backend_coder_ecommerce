import express from 'express'
import pm from './main.js'

let server = express()

let PORT = 8000
let ready = () => console.log('server ready on port: '+PORT)

server.listen(PORT, ready)
server.use(express.urlencoded({extended:true}))

let index_route = '/'
let index_function = (req, res) => {
    let quantity = pm.getProducts().length
    console.log(quantity)
    return res.send(`there are ${quantity} products`)
}
server.get(index_route, index_function)


let products_route = '/products'
let products_function = (req, res) => {
    let products = pm.getProducts()
    return res.send(products)
}
server.get(products_route, products_function)

let one_route = '/products/:id'
let one_function = (req, res) => {
    let parametros = req.params
    let id = parametros.id
    let product = pm.getProductsById(id)
    if (!product) {
        return res.send({
            success: false,
            message: `Product with id ${id} not found`
        })
    }
    return res.send({
        success: true,
        product: product
    })
    
}
server.get(one_route, one_function)