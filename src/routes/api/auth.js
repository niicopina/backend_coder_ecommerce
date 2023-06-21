import { Router } from "express"
import User from "../../models/user.model.js"
import validator from "../../middlewares/logValidator.js"
import passIs8 from '../../middlewares/passIs8.js'

const auth_router = Router()

auth_router.get('/',async(req,res)=> {
    return res.status(200).json({ 
        success: true,
        email: req.session.email 
    })
})
auth_router.post('/register', validator, passIs8, async(req,res,next)=>{
    try {
        let user = await User.create(req.body)
        if(user){
            return res.status(201).json({
                success: true,
                message: 'user created'
            })
        }else{
            return res.status(400).json({
                success: false,
                message: 'something went wrong'
            })
        }
    } catch (error) {
        next(error)
    }
})
auth_router.post('/login', async(req,res,next)=>{
    try {
        const {email} = req.body
        const user = await User.findOne({email})
        if(user){
        req.session.email = email
        return res.status(200).json({
            success: true,
            message: email + ' ha iniciado sesion'
        })
        }else{
            return res.status(404).json({
                success: false,
                message: 'User not found'
            })
        }
    } catch (error) {
        next(error)
    }
})
auth_router.post('/signout', async(req,res,next)=>{
    try {
        req.session.destroy()
        return res.status(200).json({
            success: true,
            message: ' ha cerrado sesion'
        })
    } catch (error) {
        next(error)
    }
})
export default auth_router