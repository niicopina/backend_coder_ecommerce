import {Router} from 'express'
import Product from '../../models/product.model.js'
import ProductController from '../../controllers/product.controller.js'

const product_mongo = Router()
const productController = new ProductController()

product_mongo.get('/', async (req, res, next) => {
    try {      
        const { page, title } = req.query;
        const options = { limit: 10, page: parseInt(page), lean: true };
        const result = await Product.paginate({}, options);
    
        res.status(200).json({
          success: true,
          payload: result.docs,
          pagination: {
            currentPage: result.page,
            totalPages: result.totalPages,
            title: title
          }
        });
    } catch (error) {
      next(error);
    }
});

product_mongo.get('/:pid',      productController.getProduct)
product_mongo.post('/',         productController.createProduct)
product_mongo.put('/:pid',      productController.updateProduct)
product_mongo.delete('/:pid',   productController.deleteProduct)

export default product_mongo



/* import validator from '../../middlewares/product_validator.js'
import passport from 'passport'
import passport_call from '../../middlewares/passport_call.js'
import authJwt from '../../middlewares/authJwt.js' */
/* product_mongo.get('/',async(req,res,next)=>{
    try {
        const {
            docs, 
            hasNextPage, 
            prevPage, 
            nextPage, 
            totalDocs
        } = await Product.paginate({}, {limit: 10, page: 1, lean: true})
        res.status(200).send({
            success: true,
            payload: docs
        })
    } catch (error) {
        next(error)
    }
}) */
/* product_mongo.get(
    '/',
    passport_call('jwt'),
    async(req,res,next)=> {
        try {
            let products = await Product.find()
            if(products){
                return res.status(200).json({
                    success: true,
                    data: products
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
    }
) */

/* product_mongo.get('/', async(req,res,next)=>{
    let page = parseInt(req.query.page) || 1
    let limit = parseInt(req.query.limit) || 6
    let title = req.query.title ? new RegExp(req.query.title, 'i') : ''
    try {
        const totalCount = await Product.countDocuments({title})
        const totalPages = Math.ceil(totalCount / limit)
        let products = await Product.paginate({title}, {limit, page, pagination: true})
        if(products){
            const response = {
                success: true,
                data: products.docs,
                pagination: {
                    totalProducts: totalCount,
                    totalPages: totalPages,
                    currentPage: page,
                    nextPage: page < totalPages ? page -1 : null
                }
            }
            return res.status(200).json(response)
        }else{
            return res.status(404).json({
                success: false,
                message: 'not found'
            })
        }
    } catch (error) {
        next(error)
    }
}) */
/* product_mongo.get('/', async(req,res,next) => {
    let page = 1
    if(req.query.page){page = req.query.page}
    let limit = 6
    if(req.query.limit){limit = req.query.limit}
    let title = req.query.title ? new RegExp(req.query.title, 'i') : ''
    try {
        let products = await Product.paginate({title},{limit,page})
        if(products){
            return res.status(200).json({
                success: true,
                data: products
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
}) */