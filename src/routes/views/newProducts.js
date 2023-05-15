import { Router } from "express";

const productsViews_router = Router()

productsViews_router.get(
    '/newproducts',
    async (req, res, next) => {
        try {
            return res.render(
                'newproducts',
                {
                    title: 'Title',
                    price: 'Price',
                    description: 'Description'   
                }
            )
        } catch (error) {
            next(error)
        }
    }
)

export default productsViews_router