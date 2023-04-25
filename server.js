import express from 'express'

const server = express()

let PORT = 8080
let ready = () => console.log('server ready on port: '+PORT)

server.listen(PORT, ready)
server.use(express.urlencoded({extended:true}))

let index_route = '/'
let index_function = (req, res) => {
    let quantity = manager.read_users().length
    console.log(quantity)
    return res.send(`there are ${quantity} users`)
}
server.get(index_route, index_function)

let one_route = '/users/:id'