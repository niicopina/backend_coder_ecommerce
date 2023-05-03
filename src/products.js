import fs from 'fs'

class ProductManager {
    constructor(path){
        this.path = path
        this.nextId = 1
        if(!fs.existsSync(path)){
            fs.writeFileSync(path, JSON.stringify([]))
        }
    }
    addProduct(product){
        const products = this.getProductsFromFile()
        if(!product.title || !product.description || !product.price || !product.thumbnail ||
            !product.code || !product.stock){
                console.error('Every camp is required')
            }
        if(products.some(p => p.code === product.code)){
            console.error('A product with the same code already exist')
            return
        }
        product.id = this.nextId++
        products.push(product)
        this.saveProductsToFile(products)
    }
    getProducts(){
        return this.getProductsFromFile()
    }
    getProductsById(id){
        const products = this.getProductsFromFile()
        const product = products.find(p => p.id === id)
        if(!product){
            console.error('Product not found')
            return null
        }
        return product
    }
    updateProduct(id, updatedProduct){
        const products = this.getProductsFromFile()
        const index = products.findIndex(p => p.id === id)
        if(index === -1){
            console.error('Product not found')
            return
        }
        products[index] = {
            ...products[index],
            ...this.updateProduct,
            id: id
        }
        this.saveProductsToFile(products)
    }
    deleteProduct(id){
        const products = this.getProductsFromFile()
        const index = products.findIndex(p => p.id === id)
        if(index === -1){
            console.error('Product not found')
            return
        }
        products.splice(index, 1)
        this.saveProductsToFile(products)
    }
    getProductsFromFile(){
        const data = fs.readFileSync(this.path, 'utf-8')
        return JSON.parse(data)
    }
    saveProductsToFile(products){
        fs.writeFileSync(this.path, JSON.stringify(products))
    }
}
const productManager = new ProductManager('./products.json')

/* productManager.addProduct({
    title: 'Cheesecake',
    description: 'Torta de queso con frutos rojos',
    price: 4000,
    thumbnail: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F21%2F2015%2F02%2F11%2Fcheesecake-facil-con-leche-condensada-2000.jpg',
    code: 'PROD1',
    stock: 4
})
productManager.addProduct({
    title: 'Torta Oreo',
    description: 'Torta chocolate y mousse a base de galletas oreo',
    price: 5000,
    thumbnail: 'https://pasteleriadc.com/wp-content/uploads/torta-dripcake-helado-768x1078.jpg',
    code: 'PROD2',
    stock: 2
});
productManager.addProduct({
    title: 'Lemon Pie',
    description: 'Pastel de mousse de limon con merengue',
    price: 4500,
    thumbnail: 'https://img2.rtve.es/i/?w=1600&i=1635859279860.jpg',
    code: 'PROD3',
    stock: 5
}) */

export default productManager