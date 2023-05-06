import {Router} from 'express'

const product_router = Router()
const products_router = []

product_router.get('/', (req, res, next)=> {
    try{
        return res.json({status: ok})
    }catch(error){
        next(error)
    }
})


product_router.post(
    '/',
    (req,res) => {
        const product = req.body
        products.push(product)
        res.json({
            status: 200,
            products
        })
    }
)
export default products_router