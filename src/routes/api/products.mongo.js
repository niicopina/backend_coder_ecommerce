import {Router} from 'express'
import Product from '../../models/product.model.js'
import validator from '../../middlewares/product_validator.js'
import passport from 'passport'
import passport_call from '../../middlewares/passport_call.js'
//import authJwt from '../../middlewares/authJwt.js'

const product_mongo = Router()

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
product_mongo.get(
    '/:pid',
    async(req,res,next)=>{
        try {
            const {pid} = req.params
            let product = await Product.findOne({_id: pid})
            if(product){
                return res.status(200).json({
                    success: true,
                    data: product
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
)
product_mongo.post(
    '/',
    async (req, res) => {
        try{            
            let product = await Product.create(req.body) // usando mongo

            if(product){
            return res.status(201).json({
                success: true,
                message: 'created!',
                product
            })
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Check data!'
                    })
                }
            }catch(error){
                console.error(error)
            }   
    }
)
product_mongo.put(
    '/:pid',
    async (req, res)=>{
        try {
            let id = req.params.pid

            if(req.params.pid){
                let response1 = await Product.findByIdAndUpdate(id,{new:true})
                let response2 = await Product.updateOne({_id: id})
                if(response1 && response2){
                    return res.json({
                        status: 200,
                        message: 'Product updated',
                        response1,
                        response2
                    })
                }
                }else{
                return res.json({
                    status: 400,
                    message: 'Check data!'
                })
        }
        } catch (error) {
            next(error)
        }
    }
)
product_mongo.delete(
    '/:pid',
    async (req,res)=>{
        try{
            let id = req.params.pid

            let response1 = await Product.findByIdAndDelete(id)
            let response2 = await Product.deleteOne(id)
            if(response1 || response2){
                return res.json({
                    status: 200,
                    message: 'Product deleted success',
                    response1,
                    response2
                })
            }else{
                return res.json({
                    status: 400,
                    message: 'Seems to be a problem with the Id'
                })
            }
        }catch(error){
            next(error)
        }
    }
)

export default product_mongo


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