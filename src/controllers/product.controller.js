import Product from '../models/product.model.js'
import ProductDaoMongo from '../dao/mongo/product.mongo.js'

class ProductController{
    constructor(){
        this.productDao = new ProductDaoMongo()
    }
    getProduct = async(req,res,next)=>{
        try {
            const {pid} = req.params
            let product = await this.productDao.getProduct({_id: pid})
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
    createProduct = async (req, res, next) => {
        try{            
            let product = await this.productDao.createProduct(req) // usando mongo

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
                next(error)
            }   
    }
    updateProduct = async (req, res, next)=>{
        try {
            const {pid} = req.params

            if(req.params){
                //let response1 = await Product.findByIdAndUpdate(pid,{new:true})
                let response2 = await this.productDao.updateProduct({_id:pid})
                if(response2){
                    return res.json({
                        status: 200,
                        message: 'Product updated',
                        //response1,
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
    deleteProduct = async (req,res, next)=>{
        try{
            let {pid} = req.params

            let response1 = await this.productDao.deleteProduct({_id: pid})
            if(response1){
                return res.json({
                    status: 200,
                    message: 'Product deleted success',
                    response1
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
}

export default ProductController
//module.export = new ProductController()