import fs from 'fs'

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
}
const cartManager = new CartManager('./carritos.txt')

export default cartManager