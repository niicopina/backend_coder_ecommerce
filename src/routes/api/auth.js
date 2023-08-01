import { Router } from "express"
import {cartService} from '../../service/index.js'
import create_hash from "../../middlewares/create_hash.js"
import passport from "passport"
import createToken from "../../middlewares/createToken.js"
import passport_call from './../../middlewares/passport_call.js'
import validator from "../../middlewares/logValidator.js"
import passwordIsOk from "../../middlewares/passwordIsOk.js"

import passportSession from '../../config/passportSession.js'
import jwt from 'jsonwebtoken';
import User from "../../models/user.model.js"
import passIs8 from '../../middlewares/passIs8.js'
import isValidPassword from "../../middlewares/isValidPassword.js"

const auth_router = Router()

auth_router.get('/',async(req,res)=> {
    return res.status(200).json({ 
        success: true,
        email: req.session.email 
    })
})
/* auth_router.post('/register', 
    validator, 
    //passIs8, 
    create_hash,
    async(req,res,next)=>{
    try {
        let user = await User.create(req.body)
        if(user){
            return res.status(201).json({
                success: true,
                message: 'User created!!'
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
}) */
auth_router.post(
    '/register',
    create_hash,
    passport.authenticate('register',{failureRedirect: '/fail-register'}),
    async(req,res,next)=>{
        try {
            const newCart = await cartService.createCart()
            return res.status(200).json({
                success: true,
                message: 'user registered'
            })
        } catch (error) {
            return next(error)
        }
    }
)
auth_router.get('/fail-register',(req,res)=>res.status(403).json({
    success:false, message: 'bad auth'
}))
auth_router.post(
    '/login',
    passport.authenticate('login', { session: false }),
    createToken,
    validator,
    passwordIsOk,
    (req, res) => {
      try {
        return res
          .status(200)
          .cookie('token', req.token, { maxAge: 60 * 60 * 24 * 7 })
          .json({
            success: true,
            message: 'User logged in!'
          });
      } catch (error) {
        return next(error)
      }
    }
  );
auth_router.post(
    '/signout',
    passport_call('jwt',{session: false}),
    (req,res)=>{
        res.status(200).clearCookie('token').json({
            success: true,
            message: 'signed out'
        })
    }
)
auth_router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ user: req.user });
  });
auth_router.get(
    '/github',
    passport.authenticate('github',{scope:['user:email']}),
    (req,res)=>{
       
    })
auth_router.get('/github/callback',
    passport.authenticate('github',{ failureRedirect:'/fail-register-github' }),
        (req,res)=> {
            req.session.user = req.user
            return res.status(201).json({
                success: true,
                message: 'user created!',
                user: req.user
            })
    }
)
auth_router.get('/fail-register-github',(req,res)=>res.status(403).json({
    success:false, message: 'bad auth'
}))


export default auth_router