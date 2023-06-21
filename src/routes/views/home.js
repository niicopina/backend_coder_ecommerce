/* import { Router } from "express";
import fs from 'fs/promises'

const home_router = Router()

home_router.get(
    '/', 
    async (req,res,next)=> {
    try {
        const productsData = await fs.readFile('products.json', 'utf-8')
        const products = JSON.parse(productsData)

        return res.render(
            'home',
            {
            products: products,
            title: 'home',
            //script: '/connection.js'
            })
    } catch (error) {
        next(error)
    }
})

export default home_router */