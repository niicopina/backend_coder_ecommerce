import { Router } from "express";
import cartManager from 'file:///C:/Users/usuario/Desktop/Desarrollo/BACKEND/proyecto/src/managers/cart.js'
import app from '../../app.js'

const cart_router = Router()

//aqui van los put post delete de carrito

app.get('/api/carts', async (req,res)=> {
    const carts = await cartManager.getCarts()
    if(carts === 'Not found'){
        res.send({
            success: true,
            response: []
        })
    }else if(carts === 'getCarts: error'){
        res.send({
            success: false,
            response: []
        })
    }else{
        res.json(carts)
    }
})


export default cart_router