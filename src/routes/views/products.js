import { Router } from "express";
import Product from "../../models/product.model.js";

const products_router = Router()

products_router.get('/products', async (req, res, next) => {
    try {
        const products = await Product.find();
        res.locals.products = products; // Almacena los productos en la variable local "products"
        next();
    } catch (error) {
        next(error);
    }
});

/* products_router.get(
    '/products',
    async(req,res,next)=> {
        try {
            const products = await Product.find()
            if(products){
                return res.render(
                    'products',
                    { products }
                )
            }else{
                return res.status(404).json({
                    success: false,
                    message: 'not found'
                })
            }
        } catch (error) {
            next(error)
        }
    }
) */
export default products_router