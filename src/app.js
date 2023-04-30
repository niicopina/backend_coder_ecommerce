import express from 'express'
import ProductManager from './products.js'

const app = express()
const pm = new ProductManager('./products.json')

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

//encontrar todos los productos
app.get('products', (req, res) => {
    const products = pm.getProducts()
    res.json(products)
})
//encontrar producto por id
app.get('./products/:id', (req, res) => {
    const productId = Number(req.params.id)
    const product = pm.getProductsById(productId)
    if(product) {
        return res.send({
            success: true,
            product: product
        })
    } else {
        return res.send({
            success: false,
            product: 'product not found'
        })
    }
})
//crear nuevo producto
app.post('/products', (req, res) => {
    const newProduct = req.body
    pm.addProduct(newProduct)
    return res.send({
        success: true,
        message: 'Product created successfully'
    })
})
//actualizar producto
app.put('/products/:id', (req, res) => {
    const productId = Number(req.params.id)
    const updatedProduct = req.body
    pm.updateProduct(productId, updatedProduct)
    return res.send({
        success: true,
        message: 'Product updated successfully'
    })
})
app.delete('/products/:id', (req, res) => {
    const productId = Number(req.params.id)
    pm.deleteProduct(productId)
    return res.send({
        success: true,
        message: 'Product deleted successfully'
    })
})

//server
const PORT = 8000
app.listen(port, () => {
    console.log(`Server listening on port ${PORT}`)
})