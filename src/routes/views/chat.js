import { Router } from "express";

const chat_router = Router()

chat_router.get('/', async (req, res, next) => {
    try{
        return res.render(
            'chat',
            {
                title: 'Coder chat',
                script: '/public/chat.js'
            }
        )
    }catch(error){
        next(error)
    }
})

export default chat_router