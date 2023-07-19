import passport from "passport";
import { Strategy } from "passport-local";
import User from '../models/user.model.js'

export default function passportSession(){
    passport.serializeUser(
        (user,done) => done(null, user._id)
    )
    passport.deserializeUser(async (_id, done) => {
        try {
          const user = await User.findById(_id)
          return done(null, user)
        } catch (error) {
          return done(error)
        }
      })
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
}