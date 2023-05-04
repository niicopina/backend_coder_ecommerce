import {Router} from 'express'

const router = Router()
const products = []

router.get(
    '/',
    (req,res) => {
        res.json({products})
    })
router.post(
    '/',
    (req,res) => {
        const product = req.body
        products.push(product)
        res.json({
            status: 200,
            products
        })
    }
)
export default router