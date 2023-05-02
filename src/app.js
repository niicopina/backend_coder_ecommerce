import express from 'express'
import fs from 'fs'

const app = express()

app.get('/api/products', async (req, res)=> {
    try{
        const limit = req.query.limit ? parseInt(req.query.limit) : null
        const products = JSON.parse(await fs.promises.readFile('./productos.txt', 'utf-8'))
        if(limit){
            res.send({
                success: true,
                response: products.slice(0, limit)
            })
        }else{
            res.send({
                success: true,
                response: []
            })
        }
    }catch(error) {
        console.log(error)
        res.send({
            success: false,
            response: []
        })
    }
})
app.get('/api/products/:pid', async (req, res)=> {
    try{
        const products = JSON.parse(await fs.promises.readFile('./productos.txt', 'utf-8'))
        const product = products.find(p => p.id === req.params.pid)
        if(!product) {
            res.send({
                success: false,
                response: {}
            })
        }else{
            res.send({
                success: true,
                response: product
            })
        }
    }catch(error){
        console.log(error)
        res.send({
            success: false,
            response: {}
        })
    }
})