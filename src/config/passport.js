import passport from "passport";
import { Strategy } from "passport-local";
import GHStrategy from 'passport-github2'
import jwt from 'passport-jwt'
import User from '../models/user.model.js'

const {GH_CLIENT_ID, GH_CLIENT_SECRET} = process.env
const callback = "http://localhost:8000/api/auth/github/callback"

export default function(){
    passport.serializeUser(
        (user,done) => done(null, user._id)
    )
    passport.deserializeUser(
        async(id,done) => {
            const user = await User.findById(id)
            return done(null,user)
        }
    )
    passport.use(
        'register',
        new Strategy(
            {passReqToCallback: true, usernameField: 'email'},
            async(req,username,password,done)=>{
                try {
                    let one = await User.findOne({email: username})
                    if(one){
                        return done(null, false)
                    }else{
                        let user = await User.create(req.body)
                        delete user.password
                        return done(null, user)
                    }
                } catch (error) {
                    return done(error)
                }
            }
        )
    ) 
    passport.use(
        'login',
        new Strategy(
            {usernameField: 'email'},
            async(username,password,done)=>{
                try {
                    let one = await User.findOne({email: username})
                    if(one){
                        return done(null, one)
                    }else{
                        return done(null, false)
                    }
                } catch (error) {
                    return done(error)
                }
            }
        )
    )
    passport.use(   //estrategia de registro con github
        'github',
        new GHStrategy(
            {clientID: GH_CLIENT_ID, clientSecret: GH_CLIENT_SECRET, callbackURL: callback},
            async(accessToken,refreshToken,profile,done) => {
                try {
                    console.log(profile)
                    let one = await User.findOne({email:profile._json.login})
                    if(one){
                        return done(null, one)
                    }
                    let user = await User.create({
                        name: profile._json.name,
                        email: profile._json.login,
                        password: 'hola1234',
                        photo: profile._json.avatar_url
                    })
                    return done(null, user)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )
    passport.use( //esta solo sirve para autenticar usuarios
        'jwt',
        new jwt.Strategy(
            {secretOrKey: process.env.SECRET_JWT, 
            jwtFromRequest: jwt.ExtractJwt.fromExtractors([(req)=>req?.cookies['token']])},
            async(jwt_payload,done)=>{
                try {
                    let one = await User.findOne({email:jwt_payload.email})
                    if(one){
                        delete one.password
                        return done(null, one)
                    }else{
                        return done(null, false)
                    }
                } catch (error) {
                    return done(error)
                }
            }
        )
    )
}