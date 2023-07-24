import ProductDaoMongo from "../dao/mongo/product.mongo.js";
import CartDaoMongo from '../dao/mongo/cart.mongo.js'


const productService = new ProductDaoMongo()
const cartService = new CartDaoMongo()

export default {productService, cartService}