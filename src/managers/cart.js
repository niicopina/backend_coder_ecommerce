import fs from 'fs'
import productManager from './products.js'

class CartManager {
    constructor(path){
        this.path = path
    }
    async addCart(){
        try{
            const carts = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
            const newCart = {
                id: carts.length + 1,
                products: []
            }
            carts.push(newCart)
            await fs.promises.writeFile(this.path, JSON.stringify(carts, null, 2))
            return newCart.id
        }catch(error){
            console.log(error)
            return 'addCart: error'
        }
    }
    async getCarts(){
        try{
            const carts = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
            if(carts.length === 0){
                return 'Not found'
            }else{
                return carts
            }
        }catch(error){
            console.log(error)
            return 'getCarts: error'
        }
    }
    async getCartById(cid){
        try{
            const carts = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
            const cart = carts.find(c => c.id === parseInt(cid))
            if(!cart){
                return 'Not found'
            }else{
                return cart
            }
        }catch(error){
            console.log(error)
            return 'getCartById: error'
        }
    }
    async updateCart(id, productId, units) {
        try{
            const carts = await this.getCartsFromFile()
            const cart = carts.find(C => C.id ===id)
            if(!carts){
                return 'Cart not found!'
            }
            const product = await productManager.getProductsById(productId)
            if(!product){
                return 'Product not Found!'
            }
            const availableUnits = product.stock
            if(units > availableUnits){
                return 'Not enough units available'
            }
            const existingProduct = cart.products.find(p => p.id === productId)
            if(existingProduct){
                if(units > existingProduct.units){
                    const unitsToAdd = units - existingProduct.units
                    if(unitsToAdd > availableUnits){
                        return 'Not enough units available'
                    }
                    existingProduct.units += unitsToAdd
                    product.stock -= unitsToAdd
                } else if(units < existingProduct.units) {
                    const unitsToRemove = existingProduct.units - units
                    existingProduct.units -= unitsToRemove
                    product.stock += unitsToRemove
                }
            }else{
                if (units > availableUnits){
                    return 'Not enough units available'
                }
                cart.products.push({ id: productId, units})
                product.stock -= units
            }
            await this.saveCartsToFile(carts)
            return 'Cart updated successfully'
        } catch(error){
            console.log(error)
            return 'Error updating cart'
        }
    }
    
}
const cartManager = new CartManager('./carritos.txt')

export default cartManager