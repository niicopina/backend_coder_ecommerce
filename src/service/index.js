import ProductDaoMongo from "../dao/mongo/product.mongo.js";
import CartDaoMongo from '../dao/mongo/cart.mongo.js'


export const productService = new ProductDaoMongo()
export const cartService = new CartDaoMongo()

//export default {productService, cartService}