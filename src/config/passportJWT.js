import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import User from '../models/user.model.js'
//import jwt from 'jsonwebtoken'

export default function passportJwt(){
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
        'jwt',
        new JwtStrategy(
          {
            secretOrKey: process.env.SECRET_JWT,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
          },
          async (jwt_payload, done) => {
            try {
              let one = await User.findOne({ email: jwt_payload.email })
              if (one) {
                delete one.password
                return done(null, one)
              } else {
                return done(null, false)
              }
            } catch (error) {
              return done(error)
            }
          }
        )
      )
    /* passport.use( 
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
    ) */
}