import {Router} from 'express'
import productManager from 'file:///C:/Users/usuario/Desktop/Desarrollo/BACKEND/proyecto/src/managers/products.js'
import auth from '../../middlewares/auth.js'

const product_router = Router()

product_router.get('/', async(req,res,next)=>{
    try {
        let products = await productManager.getProducts()
        if(products){
            return res.status(200).json({
                success: true,
                products
            })
        }else{
            return res.status(404).json({
                success: false,
                message: 'not found'
            })
        }
    } catch (error) {
        next(error)
    }
})
let one_route = '/products/:id'
let one_function = async (req, res) => {
    try{
        //let parametros = req.params
        let id = Number(req.params.id)
        let one = await productManager.getProductsById(id)
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
            }catch(error){
                console.log(error);
                return res.send({
                success: false,
                product: 'Error retrieving product'
            })
        }}
product_router.get(one_route, one_function)

/* let query_route = '/products'
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
product_router.get(query_route, query_function) */

product_router.post(
    '/', auth,
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
product_router.put(
    '/:pid',
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
product_router.delete(
    '/:pid',
    async (req,res)=>{
        try{
            let id = Number(req.params.pid)
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

export default product_router