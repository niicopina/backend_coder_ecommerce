import express from 'express'
import router from './routes/index_router.js'
import errorHandler from './middlewares/errorHandler.js'
import not_found_handler from './middlewares/notFoundHandler.js'
import { __dirname } from './utils.js'
import 'dotenv/config.js'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import inicializePassport from './config/passport.js'

const server = express()

server.use(expressSession({
    secret: process.env.SECRET_SESSION,
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.LINK_MONGO,
        ttl: 10000
    })
}))
server.use(cookieParser(process.env.SECRET_COOKIE))
server.use('', express.static('public'))
server.use(express.urlencoded({extended:true}))
server.use(express.json())
server.use(logger('dev'))

server.use('/', router)
server.use(errorHandler)
server.use(not_found_handler)

inicializePassport()
server.use(passport.initialize())
server.use(passport.session())

export default server


//template engine
/* server.engine('handlebars', engine())
server.set('view engine', 'handlebars')
server.set('views', __dirname + '/views') */
//middlewares

/* server.get('/products', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public','html', 'pages', 'products.html'))
}) */
//database
/* connect('mongodb+srv://pinanicolasagustin:ellipsis@dbnicopina.wuf76cz.mongodb.net/commerce') //requiere min un parametro: link (URI) conexion
    .then(()=>console.log('database connected'))
    .catch(err=>console.log(err)) */

/* connect('mongodb+srv://igna:hola1234@cluster0.dbl4oxi.mongodb.net/comercio')
    .then(()=>console.log('database connected'))
    .catch(err=>console.log(err)) */