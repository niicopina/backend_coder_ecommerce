import passport from "passport";
import { Strategy } from "passport-local";
import User from "../models/user.model.js";

export default function(){
    passport.serializeUser(
        (user, done) => done(null, user._id)
    )
    passport.deserializeUser(
        async(id, done) => {
            const user = await User.findById(id)
            return done(null, user)
        }
    )
    passport.use(
        'register',
        new Strategy(
            {passReqToCallback: true, usernameField: 'email'},
            async(req,username,password, done)=>{
                try {
                    let one = await User.findOne({email: username})
                    if(!one){
                        let user = await User.create(req.body)
                        return done(null, user)
                    }
                    return done(null, false) // redirecciona el fail-register
                } catch (error) {
                    return done(error, false)
                }
            }
        )
    )
    passport.use(
        'login',
        new Strategy(
            {usernameField: 'email'},
            async(username, password, done) => {
                try {
                    let one = await User.findOne({email:username})
                    if(one){
                        return done(null, one)
                    }
                    return done(null, false)
                } catch (error) {
                    return done(error)
                }
            }
        )
    )
}