import express from 'express'

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

let one_route = '/users/:id'