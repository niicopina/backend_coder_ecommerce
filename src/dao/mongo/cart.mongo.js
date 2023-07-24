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
    updateCart = async(cid) => {
        return await this.Cart.findOneAndUpdate({_id:cid},{new:true})
    }
    deleteCart = async(cid) => {
        return await this.Cart.findOneAndDelete({_id: cid})
    }
}

export default CartDaoMongo