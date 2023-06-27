import { Router } from "express"
import User from "../../models/user.model.js"
import validator from "../../middlewares/logValidator.js"
import passIs8 from '../../middlewares/passIs8.js'
import create_hash from "../../middlewares/create_hash.js"
import isValidPassword from "../../middlewares/isValidPassword.js"
import passport from "passport"

const auth_router = Router()

auth_router.get('/',async(req,res)=> {
    return res.status(200).json({ 
        success: true,
        email: req.session.email 
    })
})
auth_router.post('/register', 
    validator, //valida datos obligatorios
    //passIs8, 
    create_hash, //hashea la password
    passport.authenticate(
        'register',
        {failureRedirect: '/api/auth/fail-register'}
    ),
    (req,res)=>{
        res.status(201).json({
            success: true,
            message: 'User created!!'
        })       
})
auth_router.get('/fail-register', (req,res)=>{
    res.status(401).json({
        success: false,
        message: 'error auth'
    })
})
auth_router.post('/login',
    validator,
    //passIs8,
    passport.authenticate('login',{failureRedirect: '/api/auth/fail-login'}),
    isValidPassword,
    (req,res,next)=>{
        try {
            const {email} = req.body
            req.session.email = email
            req.session.role = role
            return res.status(200).json({
                success: true,
                message: email + ' ha iniciado sesion'
            })
        } catch (error) {
            next(error)
        }
})
auth_router.get('/fail-login', (req,res)=>{
    res.status(401).json({
        success: false,
        message: 'error auth'
    })
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