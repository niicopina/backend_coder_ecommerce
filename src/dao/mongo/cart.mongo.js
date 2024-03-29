import Cart from '../../models/cart.model.js'

class CartDaoMongo {
    constructor(){
        this.Cart = Cart
    }
    getCarts = async() => {
        return await this.Cart.find()
    }
    getCart = async(cid) => {
        return await this.Cart.findOne({_id: cid})
        }
    createCart = async(product_id, quantity) => {
        return await this.Cart.create(product_id, quantity)
    }
    updateCart = async (cartId, productId, quantity) => {
        const cart = await this.Cart.findOneAndUpdate(
          { _id: cartId },
          { $push: { products: { product_id: productId, quantity: quantity } } },
          { new: true }
        );
    
        return cart;
      };
    deleteCart = async(cid) => {
        return await this.Cart.findOneAndDelete({_id: cid})
    }
}

export default CartDaoMongo