import express from 'express'
import ProductManager from './products.js'

const app = express()
const pm = new ProductManager('./products.json')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//ruta para tener los productos
app.get('/products', (req, res)=> {
    const products = pm.getProducts()
    res.json(products)
})
//ruta para tener un producto por id
app.get('/products/:id', (req, res)=> {
    const productId = Number(req.params.id)
    const product = pm.getProductsById(productId)
    if(product){
        res.json(product)
    }else{
        res.status(404).json({ error: 'Product not Found!'})
    }
})
//ruta para crear uno nuevo
