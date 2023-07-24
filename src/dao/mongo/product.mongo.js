import Product from '../../models/product.model.js'

class ProductDaoMongo {
    constructor(){
        this.Product = Product
    }
    getProduct = async(pid) => {
        return await this.Product.findOne({_id: pid})
        }
    createProduct = async(req) => {
        return await this.Product.create(req.body)
    }
    updateProduct = async(pid) => {
        return await this.Product.findOneAndUpdate({_id:pid},{new:true})
    }
    deleteProduct = async(pid) => {
        return await this.Product.findOneAndDelete({_id: pid})
    }
}

export default ProductDaoMongo