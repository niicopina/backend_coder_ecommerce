import express from 'express'
import router from './src/routes/index_router.js'
import errorHandler from './src/middlewares/errorHandler.js'
import not_found_handler from './src/middlewares/notFoundHandler.js'
import { engine } from 'express-handlebars'
import { __dirname } from './src/utils.js'


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
server.set('views', __dirname + '/views')


/* import cartManager from './src/managers/cart.js'
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
}) */