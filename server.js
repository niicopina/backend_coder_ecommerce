import express from 'express'
import pm from './products.js'

const server = express()

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

let one_route = '/products/:id'
let one_function = (req, res) => {
    let parametros = req.params
    let id = Number(parametros.id)
    //console.log(id)
    //console.log(typeof id)
    let one = pm.getProductsById(id)
    console.log(one)
    return res.send({
        success: true,
        product: one
    })
}
server.get(one_route, one_function)