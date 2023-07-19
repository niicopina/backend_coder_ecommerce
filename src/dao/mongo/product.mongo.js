import Product from "../../models/product.model"

class ProductDaoMongo {
    constructor(){
        this.Product = Product
    }
    getProducts = async() => {
        return await this.Product.paginate({}, {limit: 10, page: 1, lean: true})
    }
    getProduct = async(pid) => {
        return await this.Product.findOne({_id: pid})
    }
    createProduct = async() => {
        return await this.Product.create()
    }
    updateProduct = async(pid) => {
        return await this.Product.findByIdAndUpdate({_id: pid})
    }
    deleteProduct = async(pid) => {
        return await this.Product.findByIdAndDelete({_id: pid})
    }
}

export default ProductDaoMongo